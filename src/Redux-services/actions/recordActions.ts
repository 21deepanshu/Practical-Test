import axios from "axios";
import SnackbarHandler from "../../Modules/UserRecordModule/Components/SnackbarHandler/SnackbarHandler";
//FETCH RECORD
export const fetchRecordList = () => async (dispatch: any) => {
  try {
    dispatch({ type: "START_FETCH_RECORD_LIST" });
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    if (res.status) {
      dispatch({ type: "SUCCESS_FETCH_RECORD_LIST", payload: res.data });
      !localStorage.getItem("recordList") &&
        localStorage.setItem("recordList", JSON.stringify(res.data));
    }
  } catch (err: any) {
    dispatch({ type: "ERROR_FETCH_RECORD_LIST", payload: err?.messsage });
  }
};

// ADD USER
export const addRecord =
  (userRecord: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: "START_ADD_RECORD" });
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        userRecord
      );
      if (res.status) {
        const state = getState();
        let locallyStoredRecord = JSON.parse(
          localStorage.getItem("recordList") ?? ""
        );
        const existingRecords = locallyStoredRecord
          ? locallyStoredRecord
          : state.recordData.record || [];
        const updatedRecord = [
          { ...userRecord, id: existingRecords.length + 1 },
          ...existingRecords,
        ];
        SnackbarHandler.successToast("User Added Successfully");
        localStorage.setItem("recordList", JSON.stringify(updatedRecord));
        dispatch({ type: "ADD_RECORD_SUCCESS", payload: updatedRecord });
      }
    } catch (err: any) {
      dispatch({ type: "ERROR_ADD_RECORD", payload: err?.messsage });
      SnackbarHandler.successToast(err?.messsage);
    }
  };

//DELETE USER
export const deleteUser = (userId: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "START_DELETE_RECORD" });
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (res.status) {
      let locallyStoredRecord = JSON.parse(
        localStorage.getItem("recordList") ?? ""
      );
      let updatedRecord = locallyStoredRecord.filter((item: any) => {
        return userId !== item?.id;
      });
      SnackbarHandler.successToast("User Deleted Successfully");
      localStorage.setItem("recordList", JSON.stringify(updatedRecord));
      dispatch({ type: "ADD_RECORD_SUCCESS", payload: updatedRecord });
    }
  } catch (err: any) {
    dispatch({ type: "ERROR_DELETE_RECORD", payload: err?.messsage });
    SnackbarHandler.successToast(err?.messsage);
  }
};

//EDIT USER

export const editRecord =
  (userRecord: any, userId: number) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: "START_EDIT_RECORD" });
      const res = await axios.patch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        userRecord
      );
      if (res.status) {
        const state = getState();
        let locallyStoredRecord = JSON.parse(
          localStorage.getItem("recordList") ?? ""
        );
        const existingRecords = locallyStoredRecord
          ? locallyStoredRecord
          : state.recordData.record || [];
        const updatedRecord = existingRecords.map((record: any) =>
          record.id === userId ? { ...record, ...userRecord } : record
        );
        SnackbarHandler.successToast("User Edited Successfully");
        localStorage.setItem("recordList", JSON.stringify(updatedRecord));
        dispatch({ type: "EDIT_RECORD_SUCCESS", payload: updatedRecord });
      }
    } catch (err: any) {
      dispatch({ type: "ERROR_EDIT_RECORD", payload: err?.messsage });
      SnackbarHandler.successToast(err?.messsage);
    }
  };
