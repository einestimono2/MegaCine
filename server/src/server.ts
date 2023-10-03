import app from './app';
import { connectDB } from './config';
import logger from './utils';

// Server
const server = app.listen(process.env.PORT, () => {
  logger.info(`Server is running at http://localhost:${process.env.PORT}  [env: ${app.get('env')}]`);

  connectDB();
});

export default server;
