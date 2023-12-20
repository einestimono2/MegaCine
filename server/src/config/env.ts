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

const configs = process.env.NODE_ENV === 'prod' ? prod : dev;

export const { app, mongodb } = configs;
