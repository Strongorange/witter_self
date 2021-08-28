import React, { useState } from "react";
import { dbService } from "../fbase";

const Weet = ({ weetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [editingVal, setEditingVal] = useState("");

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setEditingVal(value);
  };
  const onDeleteClick = async (e) => {
    const ok = window.confirm("정말 삭제하시겠어요?");
    if (ok) {
      await dbService.doc(`weets/${weetObj.id}`).delete();
    }
  };
  const onEditClick = (e) => {
    setEditing((prev) => !prev);
  };
  const onEditSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`weets/${weetObj.id}`).update({
      text: editingVal,
    });
    setEditing((prev) => !prev);
  };

  return (
    <>
      {editing ? (
        <div>
          {isOwner ? (
            <form onSubmit={onEditSubmit}>
              <input type="text" value={editingVal} onChange={onChange} />
              <span onClick={onEditClick}>✅</span>
            </form>
          ) : null}
        </div>
      ) : (
        <div>
          <span>{weetObj.text}</span>
          <span onClick={onDeleteClick}>❌</span>
          {isOwner ? <span onClick={onEditClick}>✒</span> : null}
        </div>
      )}
    </>
  );
};

export default Weet;
