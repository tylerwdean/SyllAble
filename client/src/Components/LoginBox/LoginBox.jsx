import React from "react";
import { useState } from "react";

const LoginBox = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = () => {

    }

    return (
        <>  
            <div className="container">
                <div className="col-md-6 col-sm-12 offset-md-3 ">
                    <div className="row">
                        <h1 className="h3 text-dark text-centered mt-5 px-0">Login:</h1>
                    </div>
                    <form onSubmit={login}>
                    <div className="row">
                        <input className="form-control mb-2" 
                        type="text" 
                        placeholder="Enter your email address" 
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="row">
                        <input className="form-control mb-2" 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="row"><button className="btn btn-primary col-md-4 col-sm-12 mb-2 mb-md-0">Submit</button> <button className="btn btn-secondary col-md-5 col-sm-12 offset-md-3">Don't have an account?</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginBox