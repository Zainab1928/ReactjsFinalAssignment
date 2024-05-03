import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import './Appheader.css';

const Appheader = () => {
    const [displayUsername, setDisplayUsername] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setShowMenu(false);
        } else {
            setShowMenu(true);
            const username = sessionStorage.getItem('username');
            if (!username) {
                navigate('/login');
            } else {
                setDisplayUsername(username);
            }
        }
    }, [location, navigate]);

    return (
        <div>
            {showMenu && (
                <div className="header d-flex justify-content-between align-items-center">
                    <div className="menu-box">
                        <Link to={'/'} className="menu-link">Home</Link>
                    </div>
                    <div className="menu-box">
                        <Link to={'/customer'} className="menu-link">Customer</Link>
                    </div>
                    <div className="menu-box">
                        <Link to={'/login'} className="menu-link">Logout</Link>
                    </div>
                    <span style={{ color: 'darkblue', fontSize: '20px' }}>Welcome <b style={{ color: 'darkblue', fontSize: '20px' }}>{displayUsername}</b></span>


                </div>
            )}
        </div>
    );
}

export default Appheader;
