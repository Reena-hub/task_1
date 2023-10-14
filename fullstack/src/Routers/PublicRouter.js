import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate   } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register"

const PublicRouter = () => {

    return (
      <React.Fragment>
       <Routes>
            <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" exact element={<Navigate replace to="/" />}/>
        </Routes> 
      </React.Fragment>
    );
  };
  
  export default PublicRouter;
