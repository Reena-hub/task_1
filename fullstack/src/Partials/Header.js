
import React from "react";
import { Button, Container, Label } from "reactstrap";
import { getCookie,deleteAllCookies, reloadWindowToPath } from "gfdu";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const handlelogOut = () => {
        let token = getCookie("token");
        axios.post('http://localhost:9000/employee/logout', {auth_token: token}).then((response) => {
            console.log(response);
            if(response?.data?.success){
                toast.success("Logout Successfully");
                setTimeout(() => {
                    deleteAllCookies() ;
                    reloadWindowToPath("/");
                }, 500);
            }else{
                toast.error("Some Error occurred")
            }
        }).catch((error) => {
            toast.error("Some Error occurred")
        })
      };
    return (
        <React.Fragment>
            <ToastContainer />
            
            <header className="backg mb-4 p-3 fonts">
                <Container className="d-flex justify-content-between">
                    <Label> Home </Label>
                    <Button onClick={handlelogOut}> Logout </Button>
                </Container>
            </header>
            
        </React.Fragment>
    );
}

export default Header;