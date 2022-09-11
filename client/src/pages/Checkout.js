import React from "react";
const Checkout = () => {
  const saveAddressToDb = () => {
    //
  };
  return (
    <div className="row">
      <div className=" col-md-6">
        <h4>Delivery address</h4>
        <br />
        <textarea rows="" cols=""></textarea>
        <hr />
        <button
          className="btn btn-primary mt-2"
          onClick={saveAddressToDb}
        ></button>
        <h4>Got coupon?</h4>
        <br />
        cup
      </div>
      <div className=" col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Product</p>
        <hr />
        <p>list pro</p>
        <hr />
        <p>Order Summary</p>
        <hr />

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary"> Đặt hàng</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary"> Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
