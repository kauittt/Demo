import PropTypes from "prop-types";

const FormButton = ({
    name = "Button",
    main = true,
    type = "button",
    disabled = false,
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`m-w-[100px] w-[100px] m-h-[40px] h-[40px] leading-[40px]
            rounded text-lg font-semibold 
            flex items-center justify-center
            cursor-pointer shadow-custom
            transition-all duration-200 ease-in-out
            bg-bgr-white
            ${
                main
                    ? "hover-main border border-text-color"
                    : "hover-sub border border-bgr-color"
            }
            `}
            {...props}
        >
            {name}
        </button>
    );
};

FormButton.propTypes = {
    main: PropTypes.bool,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

export default FormButton;
