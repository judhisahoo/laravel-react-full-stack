import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios.client";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
    const refEmail = useRef();
    const refPassword = useRef();

    const { setUser,setToken } = useStateContext();
    const [errors,setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: refEmail.current.value,
            password: refPassword.current.value
        };
        console.log(payload);
        axiosClient.post("/login", payload).then(({ data }) => {
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
            <h1 className="title">Login</h1>
            {errors && <div className="alert">
                    {
                        Object.keys(errors).map(key =>(
                            <p key={key}>{errors[key][0]}</p>
                        ))
                    }
                </div>}
            <input ref={refEmail} type="email" placeholder="Enter Email" />
            <input ref={refPassword} type="password" placeholder="Enter Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Register <Link to="/signup">Create a Account</Link>
            </p>
        </form>
    );
}

export default Login;
