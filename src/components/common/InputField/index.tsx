import React from "react";
import "./style.css";

interface InputFieldProps {
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({value, placeholder, onChange}) => {
    return (
        <div className="input-wrapper relative h-[36px] bg-[#2C2C2C] w-full">
            <div className="inset-[1px] input-wrapper absolute flex items-center justify-center bg-[#212121]">
                <input
                    type="text"
                    className="bg-transparent outline-none border-none text-white px-2 w-[90%] text-base"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default InputField;