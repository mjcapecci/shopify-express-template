import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_USER}`
);

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostreSQL connection has been established');
  } catch (err) {
    console.error('Unable to connect to database', err);
  }
};
