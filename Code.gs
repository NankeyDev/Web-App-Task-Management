// Web App: Task Management
// Author: NankeyDev

// Variables
const spreadsheetURL = 'https://docs.google.com/spreadsheets/d/17f5J9igaxKphWA__2SI7VWaZpYJmJJHX3b81DPzCAoU/edit#gid=0';
const spreadSheetId = '17f5J9igaxKphWA__2SI7VWaZpYJmJJHX3b81DPzCAoU';
const dataRange = "Sheet1!A2:E";
const spreadSheet = SpreadsheetApp.openByUrl(spreadsheetURL);
const sheet = spreadSheet.getSheetByName("Sheet1");

//IDs are the unique identifiers of your Apps Script project.
const scriptId = '1wBCaSl60B6JvQxAlDbTWE13riImwGti4lDpAHharSP6TJCn1sUQ8p-a-';

let filename = '';

// Field Variables
let taskNameField = "";
let taskDescriptionField = "";
let taskTypeField = "";
let taskDueDateField = "";
let taskLabelField = "";

function jdbc() {
  const connectionName = 'modern-rex-399023:us-west1:task-management';
  const username = 'root';
  const password = 'wkPq!e3i!3J9#8eZ^^@F';
  const dbName = 'task_management';
  const url = 'jdbc:google:mysql://' + connectionName + '/' + dbName;
  
  const sql1 = 'CREATE TABLE Labels(label_id INT, label_name VARCHAR(255), PRIMARY KEY (label_name))' 
  const sql2 = 'CREATE TABLE Tasks(task_id INT, task_name VARCHAR(255),	task_description TEXT(500),	task_type VARCHAR(255),	task_due_date VARCHAR(255),	task_label VARCHAR(255), PRIMARY KEY (task_id), FOREIGN KEY (task_label) REFERENCES Labels(label_id))';
  const sql3 = 'SHOW TABLES';

  // Logger.log(connection);
  const connection = Jdbc.getCloudSqlConnection(url, username, password);
  Logger.log(connection);

  // Testing connection to DB
  let statement = connection.createStatement();
  Logger.log(statement);

  // Two ways to execute query statement
  // Method 1
  let result = statement.execute(sql3);
  Logger.log(result);
  // Returns true or false

  // Method 2: Query Statement (cannot be data manipulation statements)
  let query = statement.executeQuery(sql3);
  Logger.log(query);

  // Update statement (I currently have no tables to update)
  // let update = statement.executeUpdate()
  // Logger.log(update);

  statement.close();
  connection.close();

}

// Function that imports file content into HTML page
function include (filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Creates a template from Index.html
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

// Adds new record to google sheet (Task Information)
function addRecord(taskName, taskdescription, tasktype, taskduedate, tasklabel) {
  console.log("Record added: " + taskName + taskdescription + tasktype + taskduedate + tasklabel);
  sheet.appendRow([taskName, taskdescription, tasktype, taskduedate, tasklabel]);
}

// Gets data from google sheet and returns as array
// Currently loads once at runtime
function getData() {
  var range = Sheets.Spreadsheets.Values.get(spreadSheetId,dataRange);
  var values = range.values;
  return values;
}

// Task Class
class Task {
  constructor(name, description, type, dueDate, label) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.dueDate = dueDate;
    this.label = label;
  }

}



