import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecord,
  editRecord,
} from "../../../../Redux-services/actions/recordActions";
import { RECORD_LIST_TYPE } from "../../Types/ResponseTypes";
import { Dispatch, SetStateAction, useEffect } from "react";
type ADD_RECORD_PROPS_TYPE = {
  show: boolean;
  closeModal: () => void;
  userDetail: RECORD_LIST_TYPE | any;
  setUserDetail: Dispatch<SetStateAction<RECORD_LIST_TYPE | any>>;
};
function AddAndEditRecordModal(props: ADD_RECORD_PROPS_TYPE) {
  const { show, closeModal, userDetail, setUserDetail } = props;
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.recordData);
  const { handleSubmit, register, setValue } = useForm();
  const handleAddRecord = handleSubmit((values) => {
    userDetail?.id
      ? dispatch(
          editRecord(
            {
              name: values?.name,
              email: values?.email,
              phone: values?.phone,
              address: {
                city: values?.city,
                zipcode: values?.zipcode,
              },
            },
            userDetail?.id
          )
        )
      : dispatch(
          addRecord({
            name: values?.name,
            email: values?.email,
            phone: values?.phone,
            address: {
              city: values?.city,
              zipcode: values?.zipcode,
            },
          })
        );
    closeModal();
    setUserDetail(null);
  });
  useEffect(() => {
    if (userDetail) {
      setValue("name", userDetail?.name);
      setValue("email", userDetail?.email);
      setValue("phone", userDetail?.phone);
      setValue("city", userDetail?.address?.city);
      setValue("zipcode", userDetail?.address?.zipcode);
    }
  }, [userDetail]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          closeModal();
          setUserDetail(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{userDetail ? "Edit Record" : "Add Record"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddRecord}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                {...register("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone"
                required
                {...register("phone")}
                maxLength={10}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                required
                {...register("city")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zipcode"
                required
                {...register("zipcode")}
              />
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              {userDetail ? "Update" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddAndEditRecordModal;
