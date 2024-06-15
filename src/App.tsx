import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRouter from "./Navigation/AppRouter/AppRouter";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}

export default App;
