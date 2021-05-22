import React, { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Post from "./components/Post";
import { db } from "./firebase";

export interface PostType {
  username: string;
  caption: string;
  imageURL: string;
}

function App() {
  const [posts, setPosts] = useState<{ id: string; post: PostType }[]>([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data() as PostType,
        }))
      );
    });
  }, []);

  return (
    <div className="App">
      <Header />
      {posts.map((post) => (
        <Post post={post.post} key={post.id} />
      ))}
    </div>
  );
}

export default App;
