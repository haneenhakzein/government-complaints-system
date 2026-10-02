import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-left" autoClose={4000} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
