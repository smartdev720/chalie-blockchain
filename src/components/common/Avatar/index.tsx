import React from "react";
import "./style.css";

interface AvatarProps {
    src: string;
    name: string;
}

const Avatar: React.FC<AvatarProps> = ({src, name}) => {
    return (
        <div className="avatar-wrapper relative h-[24px] flex flex-row gap-2 items-center justify-between">
            <img src={src} alt={name} className="w-full h-full" />
            <span className="text-white text-base font-medium">{name}</span>
        </div>
    );
}

export default Avatar;