import css from "../styles/entryForm.module.css";
const Login = () => {
    const handleLogin = e =>{
        e.preventDefault();
    }
    return (
        <div className={css.formContainer}>
            <form>
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
            <form>
                <header>
                    register
                </header>
                <div className={css.formContent}>
                <input placeholder="Email" type="email"></input>
                    <input placeholder="Full Name"></input>
                    <input placeholder="Username"></input>
                    <input placeholder="Password" type="password"></input>
                    <input placeholder="Confirm Password" type="password"></input>
                    <div className={css.formSubmitContainer}><button className={css.btnGrad} onClick={handleLogin}>register</button></div>
                </div>
            </form>
        </div>
    )
}

export default Login;