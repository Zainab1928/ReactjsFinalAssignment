import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './Customer.css';

const Customer = () => {
    const [custlist, custupdate] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Change this number to adjust items per page
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); // State to control visibility of add form
    const [newCustomer, setNewCustomer] = useState({ code: '', name: '', email: '' }); // State to hold new customer data
    const [validationErrors, setValidationErrors] = useState({}); // State to hold validation errors

    const navigate = useNavigate();

    useEffect(() => {
        GetUserAccess();
        loadcustomer();
    }, []);

    const loadcustomer = () => {
        fetch("http://localhost:3000/customer").then(res => {
            if (!res.ok) {
                navigate('/');
                toast.warning('You are not authorized to access');
                return false;
            }
            return res.json();
        }).then(res => {
            custupdate(res);
        });
    }

    const GetUserAccess = () => {
        const userrole = sessionStorage.getItem('userrole') != null ? sessionStorage.getItem('userrole').toString() : '';
        fetch("http://localhost:3000/roleaccess?role=" + userrole + "&menu=customer").then(res => {
            if (!res.ok) {
                return false;
            }
            return res.json();
        }).then(res => {
            if (res.length > 0) {
                viewchange(true);
                let userobj = res[0];
                editchange(userobj.haveedit);
                addchange(userobj.haveadd);
                removechange(userobj.havedelete);
            } else {
                navigate('/');
                toast.warning('You are not having access for Add item');
            }
        })
    }

    const handleAddButtonClick = () => {
        if (haveadd) {
            setShowAddForm(true);
        } else {
            toast.warning('You are not having access for Add item');
        }
    }

    const handleedit = () => {
        if (haveedit) {
            toast.success('Admin have access to edit this item');
        } else {
            toast.warning('You are not having access for Edit item');
        }
    }

    const handleremove = () => {
        if (haveremove) {
            toast.success('Admin have access to remove this item');
        } else {
            toast.warning('You are not having access for Remove item');
        }
    }


    const handleAddFormSubmit = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCustomer)
        };

        fetch('http://localhost:3000/customer', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add customer');
                }
                return response.json();
            })
            .then(data => {
                const updatedList = [...custlist, data];
                custupdate(updatedList);
                setShowAddForm(false);
                setNewCustomer({ code: '', name: '', email: '' });
                toast.success('Customer added successfully');
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to add customer');
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const validateForm = () => {
        let errors = {};

        if (!newCustomer.code.trim()) {
            errors.code = 'Code is required';
        }

        if (!newCustomer.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!newCustomer.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(newCustomer.email)) {
            errors.email = 'Invalid email format';
        }

        return errors;
    }

    const isValidEmail = (email) => {
        // Basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = custlist.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="card">
            <div className="card-header custom-bg-grey">
             <h3>Customer Listing</h3>
            </div>

                <div className="card-body">
                    <button onClick={handleAddButtonClick} className="btn btn-success">Add (+)</button>
                    <br></br>
                    {showAddForm && (
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <input type="text" className="form-control mb-2" name="code" placeholder="Code" value={newCustomer.code} onChange={handleInputChange} />
                                {validationErrors.code && <div className="text-danger">{validationErrors.code}</div>}
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control mb-2" name="name" placeholder="Name" value={newCustomer.name} onChange={handleInputChange} />
                                {validationErrors.name && <div className="text-danger">{validationErrors.name}</div>}
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control mb-2" name="email" placeholder="Email" value={newCustomer.email} onChange={handleInputChange} />
                                {validationErrors.email && <div className="text-danger">{validationErrors.email}</div>}
                            </div>
                            <div className="col-md-12">
                                <button onClick={handleAddFormSubmit} className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    )}
                    <table className="table table-bordered mt-3">
                        <thead className="custom-bg-dark text-white">
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(item => (
                                <tr key={item.code}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button onClick={handleedit} className="btn btn-primary">Edit</button>
                                        <button onClick={handleremove} className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(custlist.length / itemsPerPage) }).map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className="page-link">
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Customer;
