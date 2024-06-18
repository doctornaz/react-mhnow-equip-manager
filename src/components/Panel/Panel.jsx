import React from 'react';
import './Panel.css';

const Panel = ({ children, className }) => {
    return <div className={`panel ${className}`}>{children}</div>;
};

export default Panel;
