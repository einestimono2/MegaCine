import { Table } from "antd";
import React from "react";

export default function RoomPage() {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
