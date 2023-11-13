const dev = {
  app: {
    port: process.env.DEV_APP_PORT ?? 8888
  },
  mongodb: {
    uri: process.env.DEV_DB_URI ?? 'mongodb://localhost:27017/megacine'
  }
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT ?? 8888
  },
  mongodb: {
    uri: process.env.PROD_DB_URI ?? 'mongodb://localhost:27017/megacine'
  }
};

const configs = { dev, prod };
const _env = process.env.NODE_ENV ?? 'dev';

export const { app, mongodb } = configs[_env];
