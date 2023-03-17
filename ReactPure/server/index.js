const bodyParser = require("body-parser");
const express = require("express");
const PORT = 8000;
const app = express();
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/categoryRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const colorRouter = require("./routes/colorRoute");
const blogCatRouter = require("./routes/blogCateRoute");
const enqRouter = require("./routes/enqRoute");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

//connect to mongoose
dbConnect();
// use cookie trên api tránh lỗi
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/color", colorRouter);
app.use("/api/blogcategory", blogCatRouter);
app.use("/api/enq", enqRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
