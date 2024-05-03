import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import custom CSS for additional styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const proceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:3000/user/" + username)
                .then(res => res.json())
                .then(resp => {
                    if (Object.keys(resp).length === 0) {
                        toast.error('Please enter a valid username');
                    } else {
                        if (resp.password === password) {
                            toast.success('Successfully logged in!');
                            sessionStorage.setItem('username', username);
                            sessionStorage.setItem('userrole', resp.role);
                            navigate('/');
                        } else {
                            toast.error('Please enter valid credentials');
                        }
                    }
                })
                .catch(err => {
                    toast.error('Login failed due to: ' + err.message);
                });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please enter a username');
        }

        if (password === '' || password === null) {
            result = false;
            toast.warning('Please enter a password');
        }

        return result;
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={proceedLogin} className="container">
                    <div className="card">
                        <div className="card-header custom-bg-dark custom-heading-color"> {/* Apply custom background color */}
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary mr-2">Login</button>
                            <Link className="btn btn-success ml-2" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
