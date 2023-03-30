import React from 'react';
import NavBar from './NavBar'
const Layout = ({ children, page}) => {
    return (
        <div>
            <NavBar page={page}/>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
