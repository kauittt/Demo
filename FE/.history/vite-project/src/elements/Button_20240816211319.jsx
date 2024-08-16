import PropTypes from "prop-types";

const Button = ({
    name = "Button",
    type = "button",
    disabled = false,
    width = "100px",
    ...props
}) => {
    // border border-text-color

    return (
        <button
            type={type}
            disabled={disabled}
            className={`m-w-[${width}}] w-[${width}}] m-h-[40px] h-[40px] leading-[40px] p-[10px]
            rounded text-lg font-semibold 
            flex items-center justify-center
            cursor-pointer shadow-custom
            transition-base
            hover-main border-2 border-main 
            `}
            {...props}
        >
            {name}
        </button>
    );
};

Button.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    width: PropTypes.string,
};

export default Button;
