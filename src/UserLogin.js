import axios from 'axios';
import React from 'react';


class UserLogin extends React.Component {
    state = {username: null, password: null, errors: {}}

    onValueChange = (event) => {
        const {name, value} = event.target;
        
        const errors = this.state.errors;
        errors[name] = undefined;

        this.setState({[name]: value, errors});
    }

    onButtonSubmit = async (event) => {
        event.preventDefault();
        const {username, password} = this.state;

        try {
            await axios.post("/api/user/create", {username, password});
            alert(username + " created!");            
        } catch (error) {
            alert(username + " not created!");            
            if (error.response.data.validationErrors)
                this.setState({errors: error.response.data.validationErrors}); 
        }
    }

    render() {
        const {invalidusername, invalidpassword} = this.state.errors;

        return  <div className="container">
                    <form>
                        <h1 className="text-center">Sign Up</h1>

                        <div className="form-group">
                            <label>User Name:</label>
                            <input className={!invalidusername ? "form-control" : "form-control is-invalid"}  
                                name="username" onChange={this.onValueChange}/>
                            <span className="invalid-feedback">{invalidusername}</span>
                        </div>
                    
                        <div className="form-group">
                            <label>Password:</label>
                            <input className={!invalidpassword ? "form-control" : "form-control is-invalid"}  
                                name="password" type="password" onChange={this.onValueChange}/>
                            <span className="invalid-feedback">{invalidpassword}</span>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary" onClick={this.onButtonSubmit}>Send</button>
                        </div>                    
                    </form>
                </div>
    }
}

export default UserLogin;