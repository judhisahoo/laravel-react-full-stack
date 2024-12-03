import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios.client";
import { useStateContext } from "../contexts/ContextProvider";

function Signup() {
    const refName = useRef();
    const refEmail = useRef();
    const refPassword = useRef();
    const refConfPassword = useRef();

    const { setUser,setToken } = useStateContext();

    const [errors,setErrors] = useState(null);


    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: refName.current.value,
            email: refEmail.current.value,
            password: refPassword.current.value,
            password_confirmation: refConfPassword.current.value,
        };
        console.log(payload);
        axiosClient.post("/signup", payload).then(({ data }) => {
            setToken(data.token);
            setUser(data.user);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Sign Up</h1>
            {errors && <div className="alert">
                    {
                        Object.keys(errors).map(key =>(
                            <p key={key}>{errors[key][0]}</p>
                        ))
                    }
                </div>}
            <input ref={refName} placeholder="Enter Full Name" />
            <input ref={refEmail} type="email" placeholder="Enter Email" />
            <input
                ref={refPassword}
                type="password"
                placeholder="Enter Password"
            />
            <input
                ref={refConfPassword}
                type="password"
                placeholder="Enter Confirm Password"
            />
            <button className="btn btn-block"></button>
            <p className="message">
                Already Register <Link to="/login">Sign in</Link>
            </p>
        </form>
    );
}

export default Signup;
