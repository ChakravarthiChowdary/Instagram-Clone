import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { Container } from "@material-ui/core";

import Header from "./components/Header";
import Post from "./components/Post";
import { auth, db } from "./firebase";
import { CLEAR_USER, GET_POSTS, SET_USER } from "./store/actions";
import { useAppSelector } from "./store/store";
import ImageUpload from "./components/ImageUpload";

export interface PostType {
  username: string;
  caption: string;
  imageURL: string;
}

function App() {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: SET_USER, payload: user });
      } else {
        dispatch({ type: CLEAR_USER });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch({
          type: GET_POSTS,
          payload: snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data() as PostType,
          })),
        });
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Container>
        {posts.map((post: { id: string; post: PostType }) => (
          <Post post={post.post} key={post.id} postId={post.id} />
        ))}

        {user && <ImageUpload />}
      </Container>
    </div>
  );
}

export default App;
