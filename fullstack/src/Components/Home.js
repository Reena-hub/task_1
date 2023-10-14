import React, { useEffect } from 'react';
import { Container, Row, Label } from 'reactstrap';
import {  getCookie,textCapitalize } from 'gfdu';
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch  } from 'react-redux';
import axios from 'axios';
import welcome from "../Assets/images/welcome.avif"
import { ActionTypes } from "../Constant/ActionTypes";

const Home = () => {
    const {home} = useSelector((state) => state);
    const dispatch = useDispatch();
    const updateState = (actionType, value) => () => {
        dispatch({type : actionType, payload : value})
        return Promise.resolve();
    }
    const getEmployeeDetail = () => {
        toast.success("Login Successful");
        let token = getCookie('token')
        axios.post(`http://localhost:9000/employee/getDetail`, {auth_token :token}).then((response) => {
            dispatch(updateState(ActionTypes.HOME,{detail: response?.data?.data}));
        }).catch((error) => {
            toast.error(error);
        })
    }
    useEffect(() => {
        getEmployeeDetail();
    }, []);
    return (
        <React.Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <div className='card text-center'>
                        <Label className='forgot mt-3 fw-bolder'> Welcome {textCapitalize(home?.detail?.detail?.name)}</Label>
                        <span><img src={welcome} alt="welcome" /></span>
                    </div>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Home;
