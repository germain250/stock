import PropTypes from 'prop-types';
function FormCard({ title, children }) {
    return (
        <div className="flex flex-col items-center mt-16">
            <h2 className="text-3xl font-semibold text-deep-green mb-6">{title}</h2>
            <div className="w-lg flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md">
                {children}
            </div>
        </div>
    );
}

FormCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default FormCard;
