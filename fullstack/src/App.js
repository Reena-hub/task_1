import React from "react";
import PublicRouter from "./Routers/PublicRouter";
import PrivateRouter from "./Routers/PrivateRouter"
import {  getCookie } from "gfdu";

const App = () => {
  const token = getCookie("token");
  // const navigate = useNavigate();
  // const [toast, setToast] = useState(false);
  // initializeApiCall(
  //     {
  //         "Content-Type":"application/json",
  //         // "Authorization": "Bearer "+token,
  //     }, 
  //     "",
  //     false,
  //     [
  //         {
  //             status_code:'401',
  //             // func: () => (alert("Hello"))
  //         },{
  //           status_code: '404',
  //           // func: () => {navigate("/"); setToast(true);}
  //         }
  //     ]
  // );
  return (
    <React.Fragment>
      { token ? <PrivateRouter /> : <PublicRouter /> }
    </React.Fragment>
  );
};

export default App;

