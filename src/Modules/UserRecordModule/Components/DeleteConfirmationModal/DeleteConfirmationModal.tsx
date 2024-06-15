import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../../Redux-services/actions/recordActions";
type DELETE_RECORD_PROPS_TYPE = {
  show: boolean;
  closeModal: () => void;
  userId: number;
};
function DeleteConfirmationModal(props: DELETE_RECORD_PROPS_TYPE) {
  const { show, closeModal, userId } = props;
  const dispatch = useDispatch();
  const handleDeleteUser = () => {
    dispatch(deleteUser(userId));
    closeModal();
  };
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete the user ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
