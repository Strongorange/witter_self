import React, { useState } from "react";
import { dbService } from "../fbase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const WeetEach = styled.div`
  margin-bottom: 20px;
  background-color: white;
  width: 320px;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);

  h4 {
    font-size: 14px;
  }
  img {
    right: -10px;
    top: 20px;
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }

  .weet__actions {
    position: absolute;
    right: 10px;
    top: 10px;
    span {
      cursor: pointer;
    }
  }

  .editForm {
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  .formBtn {
    cursor: pointer;
    width: 100%;
    padding: 7px 20px;
    text-align: center;
    color: white;
    border-radius: 20px;
    background-color: #04aaff;
    cursor: pointer;
  }

  .cancelBtn {
    width: 280px;
    cursor: pointer;
    background-color: tomato;
    margin-top: 10px;
  }

  .formInput {
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid black;
    text-align: center;
    background-color: white;
    color: black;
  }
`;

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
  console.log("wow", isOwner);
  return (
    <>
      <WeetEach>
        {editing ? (
          <>
            <form onSubmit={onEditSubmit} className="editForm">
              <input
                type="text"
                placeholder="트윗 수정"
                value={editingVal}
                autoFocus
                onChange={onChange}
                className="formInput"
              />
              <input type="submit" value="수정" className="formBtn" />
            </form>
            <span onClick={onEditClick} className="formBtn cancelBtn">
              취소
            </span>
          </>
        ) : (
          <>
            <h4>{weetObj.text}</h4>
            {weetObj.attachmentUrl && <img src={weetObj.attachmentUrl} />}
            {isOwner && (
              <div className="weet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={onEditClick}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </>
        )}
      </WeetEach>
    </>
  );
};

export default Weet;
