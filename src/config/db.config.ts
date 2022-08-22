import { Sequelize } from "sequelize-typescript";
import { Videos } from "../model/youtube-video-api.model";

export const connect = () => {
  const hostName = process.env.HOST!;
  const userName = process.env.USER!;
  const password = process.env.PASSWORD!;
  const database: string = process.env.DB!;
  const dialect: any = process.env.DIALECT!;

  console.log("dialect  ", dialect);

  const operatorsAliases: any = false;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    dialect,
    operatorsAliases,
    repositoryMode: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });

  sequelize.addModels([Videos]);

  const db: any = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  return db;
};
