import PropTypes from 'prop-types';
function Button({ children, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="p-3 text-lg font-semibold text-white bg-deep-green rounded-md hover:bg-green-700 transition duration-200"
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};

export default Button;
