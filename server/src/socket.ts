import { type Socket, Server } from 'socket.io';
import { type Server as HttpServer } from 'http';

import logger from './utils';
import { redis } from './config/redis';

export class SocketServer {
  static instance: SocketServer;
  io: Server;

  constructor(server: HttpServer) {
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: '*'
      }
    });

    this.io.on('connect', this.onConnection);
  }

  static getInstance(server: HttpServer) {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer(server);
    }

    return SocketServer.instance;
  }

  /**
   * io.to(room).emit('event', ...) ==> Gửi sự kiện 'event' tới tất cả client có trong phòng
   * socket.broadcast.to(room).emit('event', ...) ==> Gửi sự kiện 'event' tới tất cả client có trong phòng trừ người gửi thông điệp ban đầu
   * socket.to(room).emit('event', ...) ==> Là cách viết ngắn gọn của socket.broadcast.to(room).emit('event', ...)
   *
   * socket.emit('event', ...) ==> Gửi sự kiện 'event'  tới client mà gửi thông điệp
   * io.emit('event', ...) ==> Gửi sự kiện 'event' tới tất cả client
   */

  onConnection = (socket: Socket) => {
    logger.info(`User '${socket.id}' connected!`);

    // Kết thúc (Done or out)
    socket.on('disconnect', () => {
      logger.info(`User '${socket.id}' disconnected!`);
    });

    // Khi người dùng bắt đầu vào giao diện chọn ghế
    socket.on(
      'startBooking',
      async ({ userId, showtimeId, endTime }: { userId: string; showtimeId: string; endTime: string }) => {
        // Tạo redis json và set hạn nếu chưa tồn tại
        // -2 (Không tồn tại), -1 (tồn tại nhưng chưa set hạn), second (số giây còn lại)
        if ((await redis.ttl(showtimeId)) === -2) {
          await redis.call('JSON.MSET', showtimeId, '$', '{}');
          await redis.expireat(showtimeId, endTime);
        }

        // Join room, nếu đã có thì bỏ qua
        await socket.join(showtimeId);

        // Trả về danh sách ghế đang được chọn
        // Gồm: "của mình" và "không phải của mình" và "ds đã đặt"
        socket.emit('reservedSeats', await this.getListReservedSeats(userId, showtimeId));
      }
    );

    // Khi hết hạn đặt hoặc người dùng rời khỏi trang đặt
    socket.on('cancelBooking', async ({ seatIds, showtimeId }: { seatIds: string[]; showtimeId: string }) => {
      // Xóa data redis
      for (const seat of seatIds) {
        await redis.call('JSON.DEL', showtimeId, `$.${seat}`);
      }

      // Gửi tới những người khác trong room
      socket.broadcast.to(showtimeId).emit('cancelSeat', seatIds);

      // Rời room
      await socket.leave(showtimeId);
    });

    // Hoàn thành đặt
    socket.on('completeBooking', async ({ seatIds, showtimeId }: { seatIds: string[]; showtimeId: string }) => {
      // Xóa data redis
      for (const seat of seatIds) {
        await redis.call('JSON.DEL', showtimeId, `$.${seat}`);
      }

      // Gửi tới những người khác
      socket.broadcast.to(showtimeId).emit('completeSeat', seatIds);

      // Rời room
      await socket.leave(showtimeId);
    });

    // Khi chọn 1 ghế
    socket.on(
      'select',
      async ({ userId, showtimeId, seatId }: { userId: string; showtimeId: string; seatId: string }) => {
        try {
          // update redis
          await redis.call('JSON.MSET', showtimeId, `$.${seatId}`, userId);

          // send seat to others
          socket.broadcast.to(showtimeId).emit('addSeat', seatId);
          // send seat to current user
          socket.emit('addSeat', seatId);
        } catch (_) {
          socket.emit('error', 'Ghế không còn tồn tại nữa, vui lòng chọn ghế khác!');
        }
      }
    );

    // Khi hủy chọn ghế
    socket.on('deselect', async ({ showtimeId, seatId }: { showtimeId: string; seatId: string }) => {
      // update redis
      const numsDel = await redis.call('JSON.DEL', showtimeId, `$.${seatId}`);

      if (numsDel === 0) {
        socket.emit('error', 'Có lỗi xảy ra, vui lòng thử lại');
      } else {
        // send seat to others
        socket.broadcast.to(showtimeId).emit('removeSeat', seatId);
        // send seat to current user
        socket.emit('removeSeat', seatId);
      }
    });
  };

  getListReservedSeats = async (userId: string, showtimeId: string) => {
    const seats = JSON.parse((await redis.call('JSON.GET', showtimeId, '$')) as string);
    if (!seats) return '';

    const obj = seats[0];

    // Danh sách ghế tôi đặt
    const my = (Object.keys(obj) as Array<keyof typeof obj>).find((key) => {
      return obj[key] === userId;
    });

    // Danh sách ghế không phải tôi đặt
    const other = (Object.keys(obj) as Array<keyof typeof obj>).find((key) => {
      return obj[key] !== userId;
    });

    return { my, other };
  };
}
