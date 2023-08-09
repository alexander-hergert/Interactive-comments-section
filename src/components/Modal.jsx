import React, { useState } from "react";
import { styled } from "styled-components";
import { useGlobalContext } from "../context";

/***************** STYLES ******************/
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalStyles = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  width: 30rem;
  height: 15rem;
  background-color: white;
  border-radius: 10px;
  p {
    color: hsl(211, 10%, 45%);
  }
  div {
    display: flex;
    justify-content: center;
    gap: 1rem;
    button {
      padding: 1rem;
      color: white;
      border-radius: 10px;
      border: none;
    }
  }
  .cancel {
    background-color: hsl(211, 10%, 45%);
  }
  .delete {
    background-color: hsl(358, 79%, 66%);
  }
`;
/***************** COMPONENT ******************/

const Modal = ({ setIsDelete, id }) => {
  const { state, dispatch } = useGlobalContext();
  const handleCancel = () => {
    setIsDelete(false);
  };
  const handleDelete = () => {
    const deleteId = id;
    dispatch({
      type: "ON DELETE",
      payload: { deleteId },
    });
    setIsDelete(false);
  };

  return (
    <ModalOverlay>
      <ModalStyles>
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div>
          <button className="cancel" onClick={handleCancel}>
            NO, CANCEL
          </button>
          <button className="delete" onClick={handleDelete}>
            YES, DELETE
          </button>
        </div>
      </ModalStyles>
    </ModalOverlay>
  );
};

export default Modal;
