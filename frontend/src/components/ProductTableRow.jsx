import { FaEdit, FaTrashAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProductTableRow = ({ product, categoryName, onEdit, onStockIn, onStockOut, onDelete }) => (
  <tr className="border-b hover:bg-gray-100">
    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
    <td className="px-6 py-4 text-sm text-gray-900">{product.sku}</td>
    <td className="px-6 py-4 text-sm text-gray-900">{categoryName || 'N/A'}</td>
    <td className="px-6 py-4 text-sm text-gray-900">{product.description}</td>
    <td className="px-6 py-4 text-sm text-gray-900">${product.price.toFixed(2)}</td>
    <td className="px-6 py-4 text-sm justify-center my-auto text-gray-900 flex items-center">
      {product.stockQuantity}
      <FaArrowUp onClick={onStockIn} className="ml-2 text-green-600 cursor-pointer" title="Stock In" />
      <FaArrowDown onClick={onStockOut} className="ml-2 text-red-600 cursor-pointer" title="Stock Out" />
    </td>
    <td className="px-6 py-4 text-sm text-gray-900 space-y-3">
      <FaEdit onClick={onEdit} className="text-blue-600 cursor-pointer" title="Edit" />
      <FaTrashAlt onClick={onDelete} className="text-red-600 cursor-pointer" title="Delete" />
    </td>
  </tr>
);

ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
  categoryName: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onStockIn: PropTypes.func.isRequired,
  onStockOut: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductTableRow;
