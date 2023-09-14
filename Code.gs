// Web App: Task Management
// Author: NankeyDev

// Spreadsheet Variables
const spreadsheetURL = 'https://docs.google.com/spreadsheets/d/17f5J9igaxKphWA__2SI7VWaZpYJmJJHX3b81DPzCAoU/edit#gid=0';
const spreadSheetId = '17f5J9igaxKphWA__2SI7VWaZpYJmJJHX3b81DPzCAoU';
const dataRange = "Sheet1!A2:E";
const spreadSheet = SpreadsheetApp.openByUrl(spreadsheetURL);
const sheet = spreadSheet.getSheetByName("Sheet1");

// Unique identifier of Apps Script project
const scriptId = '1wBCaSl60B6JvQxAlDbTWE13riImwGti4lDpAHharSP6TJCn1sUQ8p-a-';

// Field Variables
let taskNameField = "";
let taskDescriptionField = "";
let taskTypeField = "";
let taskDueDateField = "";
let taskLabelField = "";

let filename = '';

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
  console.log("Record added to google sheet: " + taskName + taskdescription + tasktype + taskduedate + tasklabel);
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
