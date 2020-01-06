import React from 'react';
import './style.css';

const Menu = () => (
    <div id="menu">
        <ul>
            <li><a href={`https://${document.domain}:444`}>Admin</a></li>
            <li><a href={`https://${document.domain}:8443`}>API</a></li>
        </ul>
    </div>
);

export default Menu;
