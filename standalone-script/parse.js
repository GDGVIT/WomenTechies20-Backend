//jshint esversion:6
const uuid4 = require("uuid4");
const csv = require("csv-parser");
const write = require("csv-writer");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "details1.csv",
  header: [
    {
      id: "name",
      title: "name"
    },
    {
      id: "email",
      title: "email"
    },
    {
      id: "regNo",
      title: "regNo"
    },
    {
      id: "gender",
      title: "gender"
    },
    {
      id: "password",
      title: "password"
    }
  ]
});

// returns a promise
var q = [];
const fs = require("fs");
fs.createReadStream("details.csv")
  .pipe(csv())
  .on("data", row => {
    row.password = uuid4();
    q = q.concat(row);
    csvWriter.writeRecords(q);
  })
  .on("end", () => {
    const { uploadData } = require("./upload");
    uploadData();
    console.log("CSV file successfully processed");
  });
