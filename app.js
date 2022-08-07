const express = require("express");
const router = require("./router");
const dates = require("./middleware/dates");
const app = express();
const port = 3000;

//middleware fechas
app.use(dates);

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


