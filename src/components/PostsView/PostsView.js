import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase";
import { Post } from "../Post/Post";
import "./postsview.scss";

const PostsView = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //TODO: Set up unsubscriptions
    const setUpDataStream = async () => {
      let ref = null;
      try {
        if (!props.id) {
          ref = db
            .collectionGroup("posts")
            .where("members", "array-contains", auth.currentUser.displayName)
            .orderBy("created", "desc");
        } else {
          ref = db
            .collection("groups")
            .doc(props.id)
            .collection("posts")
            .where("members", "array-contains", auth.currentUser.displayName)
            .orderBy("created", "desc");
        }

        const unsubscribe = ref.onSnapshot((querySnap) => {
          var posts = [];
          querySnap.forEach((doc) => {
            posts.push(doc.data());
          });
          setData(posts);
          console.table(posts);
        });

        return unsubscribe;
      } catch (err) {
        console.error(err);
      }
    };
    setUpDataStream();
  }, []);

  const posts = data.map((postData) => {
    return <Post key={postData.id} data={postData} />;
  });

  return <div className="postsview-container">{posts}</div>;
};

export { PostsView };
