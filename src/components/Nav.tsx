import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from './authConfig/AuthConext';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
function Nav(): JSX.Element {
    const navigate = useNavigate()
    const { user, logOut } = UserAuth();
    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <nav>
            <div className="nav-wrapper green darken-3">
                <a href="#" className="brand-logo">Movies Of Group 5</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    {user?.displayName ? (
                        <>
                            <li style={{ marginTop: "12px" }} ><Avatar alt={user?.email!} src={user?.photoURL!} /></li>
                            <li><a onClick={handleSignOut}>Log out</a></li>
                        </>
                    ) : (
                        <li><Link to="/login">Log in</Link></li>
                    )}

                </ul>
            </div>
        </nav>
    );
}
export default Nav;
