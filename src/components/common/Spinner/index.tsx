import React from "react";

interface SpinnerProps {
    size: number;
    margin: number;
}

const Spinner: React.FC<SpinnerProps> = ({size, margin}) => {
    return (
        <div className="relative" style={{marginLeft: `${margin}px`}}>
            <div className="border-purple-200 border-2 rounded-full" style={{width: `${size}px`, height: `${size}px`}}></div>
            <div className="border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0" style={{width: `${size}px`, height: `${size}px`}}></div>
        </div>
    );
}

export default Spinner;