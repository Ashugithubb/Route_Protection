import React, { useState } from 'react'
import logo from '../assets/logo.png';
import cart from '../assets/cart.png';
import '../Style/Navbar.css';
import {Outlet, Link, useNavigate } from 'react-router-dom';

interface NavProps {
    currentPage: number;
    navbarsChange: (num: number) => void;
    cartCount: number; 
}

export const Navbar: React.FC<NavProps> = (props) => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();
    const handleMenuClick = (menuName: string, pageNum: number) => {
        setMenu(menuName);
        props.navbarsChange(pageNum);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "grocerie") {
            props.navbarsChange(2);
        }
        else if (e.target.value === "items") {
            props.navbarsChange(0);
        }
        else if (e.target.value === "phones") {
            props.navbarsChange(11);
        }
        else if (e.target.value === "sports") {
            props.navbarsChange(13);
        }
        else if (e.target.value === "Watches") {
            props.navbarsChange(18);
        }
    };

    return (
        <>
            <div className='navbar'>
                <div className='nav-logo'>
                    <img src={logo} alt="logo" height="60px" />
                    <p>Bazzar</p>
                </div>
                <ul className='nav-menu'>
                    <li onClick={() => handleMenuClick("home", 0)} >Home
                        {menu === "home" ? <hr /> : null}
                    </li>
                    <li onClick={() => handleMenuClick("men", 7)}>Men
                        {menu === "men" ? <hr /> : null}
                    </li>
                    <li onClick={() => handleMenuClick("women", 16)}>Women
                        {menu === "women" ? <hr /> : null}
                    </li>
                    <select onChange={handleSelectChange}>
                        <option value="items">Items</option>
                        <option value="grocerie">Grocerie</option>
                        <option value="phones">Phones</option>
                        <option value="sports">Sports</option>
                        <option value="Watches">Watch</option>
                    </select>
                </ul>
                <div className='nav-login-cart'>
                    <button onClick={()=>navigate("/login")} style={{ height: "40px" }}>Login</button>
                    <Link to="/cart">
                        <img className="cart" src={cart} alt="cart" height="40" />
                        <div className="nav-cart-count">{props.cartCount}</div>
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}