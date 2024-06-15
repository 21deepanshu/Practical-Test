import { RECORD_LIST_TYPE } from "../../Modules/UserRecordModule/Types/ResponseTypes";


type RECORD_STATE_TYPE = {
  record: RECORD_LIST_TYPE[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: RECORD_STATE_TYPE = {
  record: null,
  loading: false,
  error: null,
};

const recordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "START_FETCH_RECORD_LIST":
      return { ...state, record: null, loading: true, error: null };
    case "SUCCESS_FETCH_RECORD_LIST":
      return {
        ...state,
        record: action.payload,
        loading: false,
        error: null,
      };
    case "ERROR_FETCH_RECORD_LIST":
      return { ...state, record: null, loading: false, error: action.payload };
    case "START_ADD_RECORD":
      return { ...state, record: state.record, loading: true, error: null };
    case "ADD_RECORD_SUCCESS":
      return {
        ...state,
        record: action.payload,
        loading: false,
        error: null,
      };
    case "ERROR_ADD_RECORD":
      return { ...state, record: null, loading: false, error: action.payload };
    case "START_DELETE_RECORD":
      return {
        ...state,
        record: state.record,
        loading: true,
        error: action.payload,
      };
    case "DELETE_RECORD_SUCCESS":
      return {
        ...state,
        record: action.payload,
        loading: false,
        error: action.payload,
      };
    case "ERROR_DELETE_RECORD":
      return { ...state, record: null, loading: false, error: action.payload };
    case "START_EDIT_RECORD":
      return { ...state, record: state.record, loading: true, error: null };
    case "EDIT_RECORD_SUCCESS":
      return {
        ...state,
        record: action.payload,
        loading: false,
        error: null,
      };
    case "ERROR_EDIT_RECORD":
      return { ...state, record: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default recordReducer;
