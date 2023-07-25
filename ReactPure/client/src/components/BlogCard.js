import React from "react";
import { Link } from "react-router-dom";
import blogimg from "../images/blog-1.jpg";
const BlogCard = (props) => {
  const { id, title, description, image, date } = props;
  return (
    <div className="blog-card">
      <div className="card-image">
        <img
          src={image ? image : blogimg}
          className="img-fluid w-100"
          alt="blog"
        />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{
            __html: description?.substring(0, 180) + "...",
          }}
        ></p>
        <Link to={"/blog/" + id} className="button">
          Xem thêm
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
