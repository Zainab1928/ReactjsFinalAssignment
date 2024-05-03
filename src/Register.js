import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './Register.css';

const Register = () => {

const [id, idchange] = useState("");
const [name, namechange] = useState("");
const [password, passwordchange] = useState("");
const [email, emailchange] = useState("");
const [phone, phonechange] = useState("");
const [country, countrychange] = useState("india");
const [address, addresschange] = useState("");
const [gender, genderchange] = useState("female");

const navigate = useNavigate();

const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';

    if(id===null || id===''){
        isproceed = false;
        errormessage += ' Username';
    }

    if(name===null || name===''){
        isproceed = false;
        errormessage += ' Fullname';
    }

    if(password===null || password===''){
        isproceed = false;
        errormessage += ' Password';
    }

    if(email===null || email===''){
        isproceed = false;
        errormessage += ' Email';
    }

    if(!isproceed){
        toast.warning(errormessage);
    }else{
        if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

        }else{
            isproceed = false;
            toast.warning('Please enter the valid Email');
        }
    }

    if (/^\d{10}$/.test(phone)) {
        // Mobile number is valid (assuming 10 digits)
      } else {
        isproceed = false;
        toast.warning('Please enter a 10 digit valid Mobile number');
      }

      if (password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
        // Password meets strength criteria
      } else {
        isproceed = false;
        toast.warning('Please enter a strong password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      }


    return isproceed;
}

const handlesubmit = (e) => {

    e.preventDefault();
    let regobj = {id,name,password,email,phone,country,address,gender};
    if(IsValidate()){
    //console.log(regobj);

    fetch("http://localhost:3000/user",{
        method: "POST",
        headers:{'content-type':'application/json'},
        body: JSON.stringify(regobj)
    }).then((res) => {
         toast.success('Registered Successfully')
         navigate('/login');
    }).catch((err)=>{
        toast.error('Failed :'+err.message);
    });
  }
}

    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header  custom-heading-color">
                        <h1>User Registration</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e=>passwordchange(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg">*</span></label>
                                        <input value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone no. <span className="errmsg">*</span></label>
                                        <input value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country <span className="errmsg">*</span></label>
                                        <select value={country} onChange={e=>countrychange(e.target.value)} className="form-control">
                                            <option value="india">India</option>
                                            <option value="chaina">Chaina</option>
                                            <option value="usa">USA</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea value={address} onChange={e=>addresschange(e.target.value)} className="form-control"></textarea>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br></br>
                                        <input type="radio" checked={gender==='male'} onChange={e=>genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                                        <label>Male</label>
                                        <input type="radio" checked={gender==='female'} onChange={e=>genderchange(e.target.value)} name="gender" value="female" className="app-check"></input>
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="card-footer d-flex justify-content-between ">
                        <button type="submit" className="btn btn-primary mr-3">Register</button> 
                        <Link className ="btn btn-danger ml-2" to={'/login'}>Close</Link>
                        </div>
                    </div>
                </form>
            </div>

           
        </div>
    );
}

export default Register;