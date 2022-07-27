import { useRef } from "react";
import { Navigate } from "react-router-dom";
import css from "../styles/entryForm.module.css";
const Login = () => {
    const loginRef = useRef();
    const registerRef = useRef();
    const handleLogin = e => {
        e.preventDefault();
    }
    const handleRegister = async e => {
        e.preventDefault();
        const form = registerRef.current;
        if (form["password"].value !== form["confirm-password"].value) { alert("passwords do not match"); return; }
        // const vals = {

        // };
        // for (let i of form.querySelectorAll("input")) {
        //     vals[i.name] = i.value;
        // }
        // delete vals["confirm-password"];
        const requestBody = new FormData(form);
        const response = await fetch("http://localhost:8000/users/register", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: requestBody,
        });
        if (response.status !== 201)
            alert("error in registering");
        else {
            alert("registered successfully, you may now login");
            for (let i of form.querySelectorAll("input")) {
                i.value = "";
            }
        }
    }
    return (
        <div className={css.formContainer}>
            <form ref={loginRef}>
                <header>
                    login
                </header>
                <div className={css.formContent}>
                    <input placeholder="Username"></input>
                    <input placeholder="Password" type="password"></input>
                    <div className={css.formSubmitContainer}><button className={css.btnGrad} onClick={handleLogin}>login</button></div>
                </div>
            </form>
            <div className={css.formDivider}></div>
            <form ref={registerRef}>
                <header>
                    register
                </header>
                <div className={css.formContent}>
                    <input placeholder="Email" type="email" name="email"></input>
                    <input placeholder="Full Name" name="name"></input>
                    <input placeholder="Username" name="username"></input>
                    <input placeholder="Password" type="password" name="password"></input>
                    <input placeholder="Confirm Password" type="password" name="confirm-password"></input>
                    <div className={css.formSubmitContainer}><button className={css.btnGrad} onClick={handleRegister}>register</button></div>
                </div>
            </form>
        </div>
    )
}

export default Login;