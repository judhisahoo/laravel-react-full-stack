import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios.client";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
    const { id } = useParams();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: null,
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    });

    const {setNotification} = useStateContext()

    if (id) {
        //now working for edit process
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`).then(
                ({ data }) => {
                    console.log(data);
                    setLoading(false);
                    setUser(data);
                },
                (error) => {
                    setLoading(false);
                    console.log(error);
                }
            );
        }, []);
    } else {
        //
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(user);
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    //show notification and redirect
                    setNotification('User was successfully updated')
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    //show notification and redirect
                    setNotification("User added successfully.");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };
    return (
        <>
            {user.id && <h1>Update user :: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            placeholder="Enter Full Name"
                        />
                        <input
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            value={user.email}
                            type="email"
                            placeholder="Enter Email"
                        />
                        <input
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            value={user.password}
                            type="password"
                            placeholder="Enter Password"
                        />
                        <input
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            value={user.password_confirmation}
                            type="password"
                            placeholder="Enter Confirm Password"
                        />
                        <button className="btn btn-block">Submit</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
