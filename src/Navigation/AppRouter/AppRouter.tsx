import { Fragment } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import RecordList from "../../Modules/UserRecordModule/Components/RecordList/RecordList";

function AppRouter() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <RecordList/>
            }
          />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default AppRouter;
