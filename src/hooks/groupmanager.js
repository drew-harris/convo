import { useState, useEffect } from "react";
import { db, dbArrayUnion, dbArrayRemove } from "../firebase/firebase";

const useGroupManager = (id) => {
  const [members, setMembers] = useState([]);
  const [nonmembers, setNonmembers] = useState([]);
  const groupRef = db.collection("groups").doc(id);
  useEffect(() => {
    const update = async () => {
      //get all users

      let allUsers = [];
      const ref = await db.collection("users").get();
      const list = [];
      ref.forEach((doc) => {
        list.push(doc.data().username);
      });
      allUsers = list;

      const unsub = groupRef.onSnapshot(async (copy) => {
        setMembers(copy.data().members);

        const excluded = allUsers.filter(
          (user) => !copy.data().members.includes(user)
        );
        setNonmembers(excluded);
      });

      return () => {
        unsub();
      };
    };
    update();
  }, [id, groupRef]);

  const addMember = async (name) => {
    groupRef.update({
      members: dbArrayUnion(name),
    });
    return null;
  };

  const removeMember = async (name) => {
    groupRef.update({
      members: dbArrayRemove(name),
    });
    return null;
  };

  return [members, nonmembers, addMember, removeMember];
};

export { useGroupManager };
