import React from "react";
import { Routes, Route, Navigate   } from "react-router-dom";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import Home from "../Components/Home";

const PrivateRouter = () => {
    return (
      <React.Fragment>
            <Header />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/*" exact element={<Navigate replace to="/" />}/>
            </Routes>
            <Footer />
      </React.Fragment>
    );
  };
  
  export default PrivateRouter;
