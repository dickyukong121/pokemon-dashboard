import type React from "react";

const Button: React.FC<{
    onClick?: () => void;
}> = ({ onClick }) => {
    return (
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClick}>
            Click Me
        </button>
    );
};

export default Button;