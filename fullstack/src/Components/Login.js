import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Input, Form, FormGroup, Label, Button } from "reactstrap"
import { setCookie, reloadWindowToPath, deleteAllCookies} from "gfdu";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
  
const Login = () => {
    deleteAllCookies();
    const [detail, setDetail] = useState({ email: "", password: "" });
    const [required, setRequired] = useState({ email: false, password: false, invalid: false, show:false });
    const validEmail = new RegExp('([a-z0-9.]{2,})+@([a-z]{3,})+([.]{1})+[a-z]{2,3}');
    const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{1,})');

    const handleChange = (e) => {
        setRequired((prevState) => ({ ...prevState, [e.target.name]: false, }))
        setDetail((prevState) => ({ ...prevState, [e.target.name]: e.target.value, }));
    };
    const checkState = async () => {
        if (!validEmail.test(detail.email)) {
            setRequired((prevState) => ({ ...prevState, email: true }))
        }else if (!validPassword.test(detail.password)) {
            setRequired((prevState) => ({ ...prevState, password: true }));
        }else{
            await axios.post('http://localhost:9000/employee/login', {
                email: detail.email, password: detail.password
              })
              .then(function (response) {
                console.log(response)
                response?.data?.success ? <> {setCookie("token", response?.data?.auth_token)}{toast.success("Login Successful")} </>: toast.error(response?.data?.message)
                response?.data?.success ? reloadWindowToPath("/") : <></>
                
              })
              .catch(function (error) {
                toast.error(error?.msg || "Something went wrong");
            });
        }
    }
    const showPassword = () => {
        setRequired((prevState) => ({ ...prevState, show: !required.show }));
        const input = document.getElementById("password");
        required.show ? input.type = "password" : input.type = "text"; 
    }
    return (
        <React.Fragment>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop={false}
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
            <div className="img-gradient position-absolute">
                <div className="imageInsert position-absolute"> </div>
                <div className="gradient position-absolute"> </div>
                <div className="svgInsert position-absolute bottom-0"> </div>
            </div>
            <div className="heading position-relative">
                <p className="text-center my-3 premium"> Premium Admin & Dashboard Template</p>
            </div>
            <Container className="my-5" >
                <div className="card p-3">
                    <h6 className="text-center welcome fw-bold my-2"> Welcome Back!</h6>
                    <p className="text-center mb-4 signin"> Sign in to continue to YSquare.</p>
                    <Form>
                        <FormGroup>
                            <Label for="email" className="px-2 fw-bolder"> Email ID: </Label>
                            <Input id="email" name="email" placeholder="Enter Username" onChange={handleChange} value={detail.email} type="text" />
                            {required.email ? <Label className="m-1 coloring"> Invalid Email Address </Label> : null}
                        </FormGroup>
                        <FormGroup>
                            <span className="d-flex justify-content-between">
                                <Label for="password" className="px-2 fw-bolder"> Password </Label>
                            </span>
                            <Input id="password" name="password" value={detail.password} onChange={handleChange} placeholder="Enter password" type="password" className="mb-2" />
                            <Input type="checkbox" onClick={() => showPassword()} id="show"/> <Label for="show" className="pointer">Show Password</Label> <br></br>
                            {required.password ? <Label className="m-1 coloring mt-2"> Invalid Password </Label> : null}
                        </FormGroup>
                        <Button className="btn my-4 rounded w-100" onClick={checkState}> Sign In </Button>
                        {required.invalid ? <h6 className="coloring text-center"> Invalid Password or Email Address </h6> : null}
                    </Form>
                    <label className="w-100 text-center"> Don't have an account? <Link to="/register" className="forgot">Sign Up</Link></label>
                </div>
            </Container>
            <Container>
                <p className="text-center text-muted p-4 mb-0 bottom-0"> &copy; 2023 YSquare. Created with <span className="coloring"> &hearts;</span> by ThemesBrand </p>
            </Container>
        </React.Fragment>
    );
}
export default Login;