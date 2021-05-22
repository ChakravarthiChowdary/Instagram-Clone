import React from "react";
import Avatar from "@material-ui/core/Avatar";

import "./Post.css";
import { PostType } from "../App";

interface IProps {
  post: PostType;
}

const Post: React.FC<IProps> = ({ post }) => {
  return (
    <div className="Post">
      <div className="Post__header">
        <Avatar alt="Chakravarthi" className="Post__avatar" src="" />
        <h3>{post.username}</h3>
      </div>
      <img src={post.imageURL} className="Post__image" alt="post" />
      <h3 className="Post__text">
        <strong>{post.username}:</strong> {post.caption}
      </h3>
    </div>
  );
};

export default Post;
