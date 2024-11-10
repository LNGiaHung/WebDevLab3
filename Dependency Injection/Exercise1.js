const logDiv = document.getElementById('log');

// Override console.log to display logs in the div
const originalLog = console.log;
console.log = function (...args) {
  originalLog.apply(console, args); // Call the original console.log
  logDiv.innerHTML += args.join(' ') + '<br>'; // Append logs to the div
};


class DatabaseService {
  connect() {
    throw new Error("Method 'connect()' must be implemented.");
  }

  getUserData() {
    throw new Error("Method 'getUserData()' must be implemented.");
  }
}

class MySQLDatabaseService extends DatabaseService {
  connect() {
    return "Connected to MySQL Database";
  }

  getUserData(userID) {
    return `Fetched user ${userID} data from MySQL Database`;
  }
}

class SQLServerDatabaseService extends DatabaseService {
  connect() {
    return "Connected to SQL Server Database";
  }

  getUserData(userID) {
    return `Fetched user ${userID} data from SQL Server Database`;
  }

  closeSQLServerConnection() {
    console.log(`close SQL Server connection`);
  }
}

class PostgreSQLDatabaseService extends DatabaseService {
  connect() {
    return "Connected to Postgre SQL Database";
  }

  getUserData(userID) {
    return `Fetched user ${userID} data from Postgre SQL Database`;
  }

  rollbackTransaction() {
    console.log(`Roll back PostgreSQL transaction`);
  }
}

class UserService {
  constructor(databaseService) {
    this.databaseService = databaseService;
  }

  getUser(userID) {
    this.databaseService.connect();
    const user = this.databaseService.getUserData(userID);
    console.log(`User Details:`, user);
    return user;
  }
}

const mysqlDatabaseService = new MySQLDatabaseService();
const userServiceMySQL = new UserService(mysqlDatabaseService);

console.log(userServiceMySQL.getUser(1));

const sqlServerDatabaseService = new SQLServerDatabaseService();
const userServiceSQL = new UserService(sqlServerDatabaseService);

console.log(userServiceSQL.getUser(2));
console.log(sqlServerDatabaseService.closeSQLServerConnection());

const postgresqlDatabaseService = new PostgreSQLDatabaseService();
const userServicePostgre = new UserService(postgresqlDatabaseService);

console.log(userServicePostgre.getUser(3));
console.log(postgresqlDatabaseService.rollbackTransaction());