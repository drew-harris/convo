import React from "react";
import { useEffect, useState } from "react";
import {
  db,
  auth,
  dbArrayUnion,
  dbArrayRemove,
} from "../../../firebase/firebase";
import { MemberPill } from "./MemberPill";
import { AddMemberOverlay } from "./AddMemberOverlay/AddMemberOverlay";
import { DeleteGroup } from "./DeleteGroup/DeleteGroup";
import { PostsView } from "../../PostsView/PostsView";
import "./groupview.scss";

const GroupView = (props) => {
  const id = props.match.params.id;
  const [groupData, setGroupData] = useState(null);
  const [open, setOpen] = useState(false);
  const [excluded, setExcluded] = useState(false);
  const ref = db.collection("groups").doc(id);

  let allUsers = [];

  useEffect(() => {
    const initial = async () => {
      allUsers = [];
      const allRef = db.collection("users").get();
      const list = [];
      (await allRef).forEach((doc) => {
        list.push(doc.data().username);
      });
      allUsers = list;
      console.log(allUsers);

      const unsub = ref.onSnapshot((copy) => {
        try {
          const data = copy.data();
          console.log(data);
          setGroupData(data);

          const excluded = allUsers.filter(
            (user) => !data.members.includes(user)
          );
          setExcluded(excluded);

          console.log(excluded);
        } catch (err) {
          console.error(err.message);
        }
      });
    };
    initial();
    return () => {};
  }, [id]);

  const addMember = async (name) => {
    ref.update({
      members: dbArrayUnion(name),
      viewers: dbArrayUnion(name),
    });
    return null;
  };

  const removeMember = async (name) => {
    ref.update({
      members: dbArrayRemove(name),
      viewers: dbArrayRemove(name),
    });
    return null;
  };

  const handleTouch = (name) => {
    if (!open || name === auth.currentUser.displayName) {
      return;
    }
    try {
      if (groupData.members.includes(name)) {
        console.log("add");
        removeMember(name);
      } else {
        console.log("remove");
        addMember(name);
      }
    } catch (err) {
      /* handle error */
      console.error(err.message);
    }
  };

  if (groupData === null) {
    return <div className="groupview-screen"></div>;
  } else {
    const memberPills = groupData.members.map((name) => {
      return (
        <MemberPill
          name={name}
          color="gray"
          key={name}
          handleTouch={handleTouch}
        />
      );
    });

    return (
      <div className="groupview-screen">
        <AddMemberOverlay
          names={excluded || []}
          color="white"
          open={open}
          handleTouch={handleTouch}
          handleClose={() => setOpen(false)}
        />
        {groupData.owners.includes(auth.currentUser.displayName) && !open ? (
          <DeleteGroup id={id} />
        ) : null}
        <div className="groupview-titleheader">{groupData.name}</div>
        <div className="groupview-subheader">
          <div className="groupview-conditionalcontainer">
            Members
            {open ? (
              <div className="groupview-removewarning">(Tap to remove)</div>
            ) : null}
          </div>

          {groupData.owners.includes(auth.currentUser.displayName) ? (
            <div
              className="groupview-editmembersbutton"
              onClick={() => setOpen(!open)}
            >
              EDIT MEMBERS
            </div>
          ) : null}
        </div>
        <div className="groupview-pillcontainer">{memberPills}</div>
        <div className="groupview-subheader">Posts</div>

        <PostsView id={id} />
      </div>
    );
  }
};

export { GroupView };
