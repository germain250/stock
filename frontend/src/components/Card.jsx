import PropTypes from 'prop-types';

const StockCard = ({ title, value, icon: Icon, onViewMore }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center">
        {Icon && (
          <div className="p-2 bg-green-100 rounded-full mr-4">
            <Icon className="h-6 w-6 text-green-500" />
          </div>
        )}
        <div>
          <h4 className="text-md font-semibold text-gray-700">{title}</h4>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <button
        onClick={onViewMore}
        className="text-green-500 hover:text-green-700 text-sm font-medium mt-4 self-end"
      >
        View More
      </button>
    </div>
  );
};

StockCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  onViewMore: PropTypes.func,
};

StockCard.defaultProps = {
  icon: null,
  onViewMore: () => {},
};

export default StockCard;
