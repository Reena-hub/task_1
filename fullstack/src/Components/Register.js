import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Input, Form, FormGroup, Label, Button } from "reactstrap"
import axios from 'axios';
import {  reloadWindowToPath } from "gfdu";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [detail, setDetail] = useState({ email: "", password: "", name: "", lname: "", cpassword: "" });
    const [required, setRequired] = useState({ email: false, password: false, firstname: false, lastname: false, repassword:false , show: false});
    const validEmail = new RegExp('([a-z0-9.]{2,})+@([a-z]{3,})+([.]{1})+[a-z]{2,3}');
    const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})');
    const isValidName = new RegExp('^([a-zA-Z]{3,})');
    const isValidLastName = new RegExp('^([a-zA-Z]{1,})');

    const handleChange = (e) => {
        setRequired((prevState) => ({ ...prevState, [e.target.name]: false, }))
        setDetail((prevState) => ({ ...prevState, [e.target.name]: e.target.value, }));
    };
     const checkState = async () => {
        if(!isValidName.test(detail.name)) {
            setRequired((prevState) => ({ ...prevState, name: true }))
        }else if(!isValidLastName.test(detail.lname)){
            setRequired((prevState) => ({ ...prevState, lname: true }))
        }
        else if (!validEmail.test(detail.email)) {
            setRequired((prevState) => ({ ...prevState, email: true }))
        }
        else if (!validPassword.test(detail.password)) {
            setRequired((prevState) => ({ ...prevState, password: true }));
        }else if(detail.password !== detail.cpassword){
            setRequired((prevState) => ({ ...prevState, cpassword: true }))
        }
        else{
            await axios.post('http://localhost:9000/employee/insertion', {
                email: detail.email, password: detail.password, name: detail.name, last_name: detail.lname, confirm_password: detail.cpassword
              })
              .then(function (response) {
                (response?.data?.message) ?  <> {setRequired((prevState) => ({ ...prevState, invalid: true }))} {toast.error("Email already exists")}</>: <>{toast.success("Registered Successfully")}{setTimeout(() => {
                    reloadWindowToPath("/")
                }, 1000) }</>;
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
                    {required.invalid ? <Label className="m-1 coloring fw-bolder text-center w-100">Email ID alerady exists</Label>:<></>}
                    <Form>
                        <FormGroup>
                            <Label for="name" className="px-2 fw-bolder">First Name: <span className="coloring">*</span></Label>
                            <Input id="name" name="name" placeholder="Enter First Name" onChange={handleChange} value={detail.name} type="text" required/>
                            {required.name ? <Label className="m-1 coloring"> Name field is required </Label> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="lname" className="px-2 fw-bolder">Last Name: <span className="coloring">*</span></Label>
                            <Input id="lname" name="lname" placeholder="Enter Last Name" onChange={handleChange} value={detail.lname} type="text" required/>
                            {required.lname ? <Label className="m-1 coloring"> Last name is required</Label> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className="px-2 fw-bolder">Email: <span className="coloring">*</span></Label>
                            <Input id="email" name="email" placeholder="Enter Email" onChange={handleChange} value={detail.email} type="email" required/>
                            {required.email ? <Label className="m-1 coloring"> Invalid Email Address </Label> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className="px-2 fw-bolder">Password: <span className="coloring">*</span></Label>
                            <Input id="password" name="password" placeholder="Enter Password" onChange={handleChange} value={detail.password}  type="password" className="mb-2" required/>
                            <Input type="checkbox" onClick={() => showPassword()} id="show"/> <Label for="show" className="pointer">Show Password</Label><br></br>
                            {required.password ? <Label className="m-1 coloring"> Needs a Strong Password </Label> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="cpassword" className="px-2 fw-bolder">Retype Password: <span className="coloring">*</span></Label>
                            <Input id="cpassword" name="cpassword" placeholder="Re-enter Password" onChange={handleChange} value={detail.cpassword}  type =  "password" required />
                            {required.cpassword ? <Label className="m-1 coloring"> Password doesn't match </Label> : null}
                        </FormGroup>
                        <Button className="btn my-4 rounded w-100" onClick={checkState}> Sign Up </Button>
                    </Form>
                    <label className="w-100 text-center"> Already have an account? <Link to="/" className="forgot">Sign In</Link></label>
                </div>
            </Container>
            <Container>
                <p className="text-center text-muted p-4 mb-0 bottom-0"> &copy; 2023 YSquare. Created with <span className="coloring"> &hearts;</span> by ThemesBrand </p>
            </Container>
        </React.Fragment>
    )
}

export default Register;