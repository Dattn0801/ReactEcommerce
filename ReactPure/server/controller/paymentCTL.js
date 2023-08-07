const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_QVXlSyXuwTP4up",
  key_secret: "KBhQ8OlgqCIV1PsaeAtStDbW",
});

const checkout = async (req, res) => {
  try {
    const option = {
      amount: 50000,
      currency: "INR",
    };
    const order = await instance.orders.create(option);
    res.json({
      sucess: true,
      order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId } = req.body;
    res.json({
      msg: "success",
      razorpayOrderId,
      razorpayPaymentId,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { checkout, paymentVerification };
