import { useContext, useRef } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import css from "../styles/entryForm.module.css";
const Login = () => {
    const { login } = useContext(AuthContext);
    const loginRef = useRef();
    const registerRef = useRef();
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = registerRef.current;
        if (form["password"].value !== form["confirm-password"].value) {
            alert("passwords do not match");
            return;
        }
        const requestBody = {
            username: form["username"].value,
            name: form["name"].value,
            email: form["email"].value,
            password: form["password"].value,
        };

        const response = await fetch("http://localhost:8000/users/register", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        console.log(response.body);
        if (response.status !== 201) alert("error in registering");
        else {
            alert("registered successfully, you may now login");
            for (let i of form.querySelectorAll("input")) {
                i.value = "";
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = loginRef.current.username.value;
        const password = loginRef.current.password.value;
        console.log(username, password);
        const details = {
            username: username,
            password: password,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const response = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: formBody,
        });
        const data = await response.json();
        // console.log(data);
        if (response.status !== 200)
            alert("error, username or password is incorrect");
        else {
            const token = data.access_token;
            login(token);
            localStorage.setItem("currUser", details.username);
        }
    };

    return (
        <div className={css.formContainer}>
            <form ref={loginRef}>
                <header>login</header>
                <div className={css.formContent}>
                    <input placeholder="Username" name="username"></input>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                    ></input>
                    <div className={css.formSubmitContainer}>
                        <button className={css.btnGrad} onClick={handleLogin}>
                            login
                        </button>
                    </div>
                </div>
            </form>
            <div className={css.formDivider}></div>
            <form ref={registerRef}>
                <header>register</header>
                <div className={css.formContent}>
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                    ></input>
                    <input placeholder="Full Name" name="name"></input>
                    <input placeholder="Username" name="username"></input>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                    ></input>
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        name="confirm-password"
                    ></input>
                    <div className={css.formSubmitContainer}>
                        <button
                            className={css.btnGrad}
                            onClick={handleRegister}
                        >
                            register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
