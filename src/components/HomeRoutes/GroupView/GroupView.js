import React from "react";
import { useEffect, useState } from "react";
import {
  db,
  auth,
  dbArrayUnion,
  dbArrayRemove,
  analytics,
} from "../../../firebase/firebase";
import { MemberPill } from "./MemberPill";
import { AddMemberOverlay } from "./AddMemberOverlay/AddMemberOverlay";
import { DeleteGroup } from "./DeleteGroup/DeleteGroup";
import { LeaveGroup } from "./LeaveGroup/LeaveGroup";
import { PostsView } from "../../PostsView/PostsView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./groupview.scss";

const GroupView = (props) => {
  const id = props.match.params.id;
  const [groupData, setGroupData] = useState(null);
  const [open, setOpen] = useState(false);
  const [groupDeleting, setGroupDeleting] = useState(false);
  const [excluded, setExcluded] = useState(false);
  const ref = db.collection("groups").doc(id);

  let allUsers = [];

  const setDeleting = () => {
    setGroupDeleting(true);
  };

  useEffect(() => {
    const initial = async () => {
      allUsers = [];
      const allRef = db.collection("users").get();
      const list = [];
      (await allRef).forEach((doc) => {
        list.push(doc.data().username);
      });
      allUsers = list;

      ref.onSnapshot((copy) => {
        try {
          const data = copy.data();
          setGroupData(data);

          const excluded = allUsers.filter(
            (user) => !data.members.includes(user)
          );
          setExcluded(excluded);
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
    });
    analytics.logEvent("add_member");
    return null;
  };

  const removeMember = async (name) => {
    ref.update({
      members: dbArrayRemove(name),
    });
    analytics.logEvent("remove_member");
    return null;
  };

  const handleTouch = (name) => {
    if (!open || name === auth.currentUser.displayName) {
      return;
    }
    try {
      if (groupData.members.includes(name)) {
        removeMember(name);
      } else {
        addMember(name);
      }
    } catch (err) {
      /* handle error */
      console.error(err.message);
    }
  };

  if (!groupData || groupDeleting) {
    return (
      <div className="groupview-screen">
        <div className="spinner-container">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </div>
    );
  } else {
    const memberPills = groupData.members.map((name) => {
      if (groupData.owners.includes(name)) {
        return (
          <MemberPill
            name={name}
            color="gray-owner"
            key={name}
            handleTouch={handleTouch}
          />
        );
      } else {
        return (
          <MemberPill
            name={name}
            color="gray"
            key={name}
            handleTouch={handleTouch}
          />
        );
      }
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
              onClick={() => {
                setOpen(!open);
                analytics.logEvent("toggle_edit_members", { group_id: id });
              }}
            >
              EDIT MEMBERS
            </div>
          ) : null}
        </div>
        <div className="groupview-pillcontainer">{memberPills}</div>
        <div className="groupview-subheader">Posts</div>

        <PostsView id={id} />
        {groupData.owners.includes(auth.currentUser.displayName) ? (
          <DeleteGroup id={id} setDeleting={setDeleting} />
        ) : (
          <LeaveGroup id={id} remove={removeMember} />
        )}
      </div>
    );
  }
};

export { GroupView };
