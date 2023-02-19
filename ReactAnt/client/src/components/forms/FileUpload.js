import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUplloadFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            //console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                console.log("image upload res data", res);
                allUplloadFiles.push(res.data);
                setValues({ ...values, images: allUplloadFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleRemove = (public_id) => {
    setLoading(true);
    console.log("id", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeImages`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div>
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              style={{ cursor: "pointer" }}
              onClick={() => handleRemove(image.public_id)}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="m-3"
              ></Avatar>
            </Badge>
          ))}
      </div>
      <div className="row">
        <label
          className="btn btn-primary btn-raised ml-3"
          style={{ width: 100 }}
        >
          Chọn file
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};
export default FileUpload;
