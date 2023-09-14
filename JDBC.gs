// JDBC information
console.log('JDBC.gs');

// JDBC
function jdbc() {
  
  const connectionName = 'modern-rex-399023:us-west1:task-management';
  const username = 'root';
  const password = 'wkPq!e3i!3J9#8eZ^^@F';
  const dbName = 'task_management';
  const url = 'jdbc:google:mysql://' + connectionName + '/' + dbName;
  let connection = Jdbc.getCloudSqlConnection(url, username, password);
  let statement = connection.createStatement();

  // Creates all base database tables (Task, Label)
  function createTables() {
    const createTable1 = 'CREATE TABLE Labels(label_id INT NOT NULL AUTO_INCREMENT, label_name VARCHAR(255), PRIMARY KEY (label_id))';
    const createTable2 = 'CREATE TABLE Tasks(task_id INT NOT NULL AUTO_INCREMENT, task_name VARCHAR(255),	task_description TEXT(500),	task_type VARCHAR(255),	task_due_date VARCHAR(255),	label_id INT, PRIMARY KEY (task_id), FOREIGN KEY (label_id) REFERENCES Labels(label_id))';
    statement.execute(createTable1);
    statement.execute(createTable2);
    console.log('Tables created');
  }

  // Add record to Label table
  function createLabel(name) {
    const sql = 'INSERT INTO Labels (label_name) VALUES (\'' + name + '\');';
    statement.execute(sql);
  }

  // Add record to Task table
  // function createTask(task_name, task_description, task_type, task_due_date, label_id) {
  window.createTask = function(task_name, task_description, task_type, task_due_date, label_id) {
    const name = task_name;
    const description = task_description;
    const type = task_type;
    const dueDate = task_due_date;
    const labelId = label_id;
    const values = "'" + name + "', '" + description + "', '" + type + "', '" + dueDate + "', '" + labelId + "'";
    const sql = 'INSERT INTO Tasks (task_name, task_description, task_type, task_due_date, label_id) VALUES (' + values + ');';
    statement.execute(sql);
  // }
  };

  // Get all tasks from Task table
  function testSQL(id) {
    // const sql = 'SELECT task_id FROM Tasks WHERE label_id = 1 ';
    const sql = 'SELECT * FROM Tasks';
    let query = statement.executeQuery(sql);
    let array = [];
    while(query.next()){
      array.push([
        query.getString(1),
        query.getString(2),
        query.getString(3),
        query.getString(4),
        query.getString(5),
        query.getString(6)
      ]);
    }
    Logger.log(array);
  }

  // Delete all database tables
  function deleteTables() {
    const table1 = 'DROP TABLE Tasks';
    const table2 = 'DROP TABLE Labels'; 
    statement.execute(table1);
    statement.execute(table2);
    console.log('Tables deleted.');
  }

  // Show Tables
  function printTables(){
    console.log('Tables: ');
    const sql = 'SHOW TABLES';
    let query = statement.executeQuery(sql);
    // Logger.log(query);
    let array = [];
    while(query.next()){
      array.push([
        query.getString(1)
      ]);
    }
    Logger.log(array);
  }

  // createTask('a','b','c','d','1');
  testSQL();

  // Create SQL Tables & Labels
  // createTables();
  // createLabel('URGENT');
  // createLabel('POSTPONABLE');
  // createLabel('UNIMPORTANT');

  // Print SQL Tables
  // printTables();

  // Delete SQL tables
  // deleteTables();

  statement.close();
  connection.close();
}


  

