let conn = null;
// Connecting to DB
const getConnection = async () => {
  if (!conn) {
    const Sequelize = require("sequelize");
    const cls = require('cls-hooked');
    const namespace = cls.createNamespace('njs2');
    Sequelize.useCLS(namespace);
    const {
      SQL_DB_HOST,
      SQL_DB_NAME,
      SQL_DB_USER,
      SQL_DB_PORT,
      SQL_DB_PASSWORD,
      DATABASE_TYPE,
      POOL_MAX,
      POOL_MIN,
      POOL_IDLE_TIME,
      POOL_ACQUIRE,
      LOGGING,
      REPLICATION
    } = JSON.parse(process.env.SQL);
    if(REPLICATION) {
      conn = new Sequelize({
        port: SQL_DB_PORT,
        dialect: DATABASE_TYPE,
        replication: {...REPLICATION},
        dialectOptions: {
          multipleStatements: true,
        },
        pool: {
          max: POOL_MAX,
          min: POOL_MIN,
          idle: POOL_IDLE_TIME,
          acquire: POOL_ACQUIRE,
        },
        logging: LOGGING, // To avoid sql query logs
      });
    }
    else {
      conn = new Sequelize({
        database: SQL_DB_NAME,
        host: SQL_DB_HOST,
        username: SQL_DB_USER,
        port: SQL_DB_PORT,
        password: SQL_DB_PASSWORD,
        dialect: DATABASE_TYPE,
        dialectOptions: {
          multipleStatements: true,
        },
        pool: {
          max: POOL_MAX,
          min: POOL_MIN,
          idle: POOL_IDLE_TIME,
          acquire: POOL_ACQUIRE,
        },
        logging: LOGGING, // To avoid sql query logs
      });
    }
    
  }

  return conn;
};

module.exports.getConnection = getConnection;
