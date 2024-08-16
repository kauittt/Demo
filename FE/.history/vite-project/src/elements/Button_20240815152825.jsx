import PropTypes from "prop-types";

const FormButton = ({
    name = "Button",
    type = "button",
    disabled = false,
    ...props
}) => {
    // border border-text-color

    return (
        <button
            type={type}
            disabled={disabled}
            className={`m-w-[100px] w-[100px] m-h-[40px] h-[40px] leading-[40px]
            rounded text-lg font-semibold 
            flex items-center justify-center
            cursor-pointer shadow-custom
            transition-base
            hover-main 
            `}
            {...props}
        >
            {name}
        </button>
    );
};

FormButton.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

export default FormButton;
