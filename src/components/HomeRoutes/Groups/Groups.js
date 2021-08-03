import React from "react";
import { useEffect, useState } from "react";
import "./groups.scss";
import { auth, db } from "../../../firebase/firebase";
import { AddGroup } from "./AddGroup/AddGroup";
import { GroupLink } from "./GroupLink/GroupLink";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroupListeners();
  }, []);

  const setGroupListeners = async () => {
    try {
      db.collection("groups")
        .where("members", "array-contains", auth.currentUser.displayName)
        .onSnapshot((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setGroups(data);
          console.table(data);
        });
    } catch (err) {
      /* handle error */
      console.error(err.message);
    }
  };

  const owned = [];
  let viewer = [];

  for (let i = 0; i < groups.length; i++) {
    if (groups[i].owners.includes(auth.currentUser.displayName)) {
      owned.push(
        <GroupLink
          name={groups[i].name}
          key={groups[i].id}
          id={groups[i].id}
          color={groups[i].color}
        />
      );
    } else {
      viewer.push(
        <GroupLink
          name={groups[i].name}
          key={groups[i].id}
          id={groups[i].id}
          color={groups[i].color}
        />
      );
    }
  }

  return (
    <div className="groups-screen">
      <div className="groups-content">
        <div className="groups-header">My Groups</div>
        <AddGroup />
        <div className="groups-linkcontainer">{owned}</div>
        <div className="groups-header">Other Groups</div>
        <div className="groups-linkcontainer">{viewer}</div>
      </div>
    </div>
  );
};

export { Groups };
