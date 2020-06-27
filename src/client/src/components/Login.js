import React from 'react';
import '../assets/scss/components/Login.scss';

function Login() {

    return (
        <div className="login">
            <div className="app__content">
            <form action="/api/login" method="post">
                <input id="username" name="username" placeholder="username"></input>
                <input id="password" name="password" placeholder="password"></input>
                <button type="submit">login</button>
            </form>
            </div>
        </div>
    )
}
export default Login;
