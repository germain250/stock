import PropTypes from 'prop-types';

function InputField({ label, type = "text", value, onChange, placeholder }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="py-2 px-4 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default InputField;
