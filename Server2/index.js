const bodyParser = require("body-parser");
const express = require("express");
const PORT = 3000;
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
// const cors = require("cors");

//connect to mongoose
dbConnect();
// use cookie trên api tránh lỗi
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
