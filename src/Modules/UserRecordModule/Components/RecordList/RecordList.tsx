import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { RECORD_LIST_TYPE } from "../../Types/ResponseTypes";
import { fetchRecordList } from "../../../../Redux-services/actions/recordActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddAndEditRecordModal from "../AddAndEditRecordModal/AddAndEditRecordModal";
function RecordList() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.recordData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userDetails, setUserDetails] = useState<RECORD_LIST_TYPE|any>();
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    dispatch(fetchRecordList());
  }, [dispatch]);
  const handleClose = () => setShowAddModal(false);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const recordList = localStorage.getItem("recordList")
    ? JSON.parse(localStorage.getItem("recordList") ?? "")
    : [];
  return (
    <Container className="d-flex flex-column vh-100">
      <Row className="my-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h1>User Information</h1>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddModal(true);
              setUserDetails(null);
            }}
          >
            Add Record
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Row className="justify-content-center">
          <Col xs="auto">
            {recordList.length === 0 ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "60vh", fontSize: "1.5rem" }}
              >
                No Record Found
              </div>
            ) : (
              <Table striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Zipcode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recordList?.map((item: RECORD_LIST_TYPE, index: number) => (
                    <tr key={item?.id}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item?.address?.city}</td>
                      <td>{item?.address?.zipcode}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="mx-2"
                          onClick={() => {
                            setShowAddModal(true);
                            setUserDetails(item);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setUserId(item?.id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      )}

      <AddAndEditRecordModal
        show={showAddModal}
        closeModal={handleClose}
        userDetail={userDetails}
        setUserDetail={setUserDetails}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        closeModal={handleCloseDelete}
        userId={userId}
      />
    </Container>
  );
}

export default RecordList;
