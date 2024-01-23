import React from "react";
import { useState } from "react";

const LoginView = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password
          };
        
    }


    return (
		<div className="login-view">
			<form>
				<label>
					Username:
					<input 
                        type="text"
                        value={username} 
                    />
				</label>
				<label>
					Password:
					<input 
                        type="password"
                        value={password} />
				</label>
				<button type="submit">Submit</button>
			</form>
            <span>Dont have an account? <a href="#">Sign up</a> for one here</span>
		</div>
	);
};

export default LoginView;
