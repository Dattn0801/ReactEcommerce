const bodyParser = require("body-parser");
const express = require("express");
const PORT = 3000;
const app = express();

app.use("/", (req, res) => {
  res.send("Hello from server side");
});
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
