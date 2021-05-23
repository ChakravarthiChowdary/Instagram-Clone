import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";

import "./Post.css";
import { PostType } from "../App";
import { db } from "../firebase";
import { useAppSelector } from "../store/store";

interface IProps {
  post: PostType;
  postId: string;
}

const Post: React.FC<IProps> = ({ post, postId }) => {
  const [comments, setComments] = useState<
    { id: string; comment: { text: string; username: string } }[]
  >([]);
  const [comment, setComment] = useState("");

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    let unsubscribe: any;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data() as { text: string; username: string },
            }))
          )
        );
    }
    return () => {
      if (postId) unsubscribe();
    };
  }, [postId]);

  const postComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        username: user?.displayName,
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => setComment(""));
  };

  return (
    <div className="Post">
      <div className="Post__header">
        <Avatar alt="Chakravarthi" className="Post__avatar" src="" />
        <h3>{post.username}</h3>
      </div>
      <img src={post.imageURL} className="Post__image" alt="post" />
      <h4 className="Post__text">
        <strong>{post.username}:</strong> {post.caption}
      </h4>
      <div className="Post__comments">
        {comments.map((comment) => (
          <p key={comment.id}>
            <b>
              {comment.comment.username}
              {"  "}
            </b>
            {comment.comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="Post__commentbox">
          <input
            className="Post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="Post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
