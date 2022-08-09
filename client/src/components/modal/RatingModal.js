import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let navigate = useNavigate();
  let params = useParams();
  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate("/login", { state: { from: `product/${params.slug}` } });
    }
  };
  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? "Đánh giá" : "Đăng nhập để đánh giá"}
      </div>
      <Modal
        title="Để lại đánh giá sản phẩm"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(true);
          toast.success("Cám ơn bạn đã đánh giá sản phẩm");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};
export default RatingModal;
