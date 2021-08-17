import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import "./userlist.scss";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const update = async () => {
    try {
      const ref = db.collection("users").orderBy("dateCreated", "desc");
      const data = await ref.get();
      console.log(data);
      let userArray = [];
      data.forEach((user) => {
        userArray.push(user.data());
      });
      setUsers(userArray);
      console.log(userArray);
    } catch (err) {
      console.error(err.message);
      alert("There was an error getting users");
    }
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <div className="userlist">
      <div className="title">User List</div>
      <div className="number">{users.length} Users</div>
      <button onClick={update} className="updatebutton">
        Refresh
      </button>
      <div className="usercontainer">
        {users.map((user) => {
          return (
            <div className="username" key={user.username}>
              {user.username}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { UserList };
