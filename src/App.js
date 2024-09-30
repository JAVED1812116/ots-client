import AllRoutes from "./routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { ValidateUser } from "./Redux/Reducer/ValidateUser";

function App() {
  const dispatch = useDispatch();
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if ((error.response?.status === 406 || error.response?.status === 401)) {
        toast.error("Session Expired!!", {
          position: "top-center",
        });
        sessionStorage.clear();
        localStorage.clear("name")
        localStorage.clear("user_id")
        localStorage.clear("token")
        dispatch(ValidateUser())
        // history.push("/login") 
        window.location.href = "/login" 
      } else {
        return Promise.reject(error);
      }
    }
  );
  return <AllRoutes />;
}

export default App;
