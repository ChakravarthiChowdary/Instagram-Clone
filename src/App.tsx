import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import Header from "./components/Header";
import Post from "./components/Post";
import { auth, db } from "./firebase";
import { CLEAR_USER, GET_POSTS, SET_USER } from "./store/actions";
import { useAppSelector } from "./store/store";

export interface PostType {
  username: string;
  caption: string;
  imageURL: string;
}

function App() {
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  console.log(user);

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
    db.collection("posts").onSnapshot((snapshot) => {
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
      {posts.map((post: { id: string; post: PostType }) => (
        <Post post={post.post} key={post.id} />
      ))}
    </div>
  );
}

export default App;
