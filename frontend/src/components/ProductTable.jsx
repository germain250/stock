import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  getAllProducts, 
  deleteProduct, 
  getSingleCategory, 
  createStockIn, 
  createStockOut 
} from '../services/apiService';
import Button from './Button';
import SearchBar from './SearchBar';
import ReusableModal from './ReusableModal';
import InputModal from './InputModal';
import PaginationControls from './PaginationControls';
import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import showAlert from '../composables/swalAlert';

const ProductTable = () => {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToStockIn, setProductToStockIn] = useState(null);
  const [productToStockOut, setProductToStockOut] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      const productsWithCategories = await Promise.all(
        data.map(async (product) => {
          if (product.category) {
            const category = await getSingleCategory(product.category);
            return { ...product, categoryName: category.name };
          }
          return product;
        })
      );
      setProducts(productsWithCategories);
      setFilteredProducts(productsWithCategories);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      showAlert({ title: 'Error', text: 'Failed to fetch products.', icon: 'error' });
    }
  };

  const exportReport = () => {
    if (products.length === 0) {
      showAlert({ title: 'Error', text: 'No products to export.', icon: 'error' });
      return;
    }
  
    const dataToExport = products.map(({ _id, name, price, stock, categoryName }) => ({
      ID: _id,
      Name: name,
      Price: price,
      Stock: stock,
      Category: categoryName || 'Uncategorized',
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  
    XLSX.writeFile(workbook, 'Products_Report.xlsx');
  };

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      setShowModal(false);
      showAlert({ title: 'Success', text: 'Product deleted successfully!', icon: 'success' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      showAlert({ title: 'Error', text: 'Failed to delete product.', icon: 'error' });
    }
  };

  const handleStockChange = async (type, quantity) => {
    try {
      const action = type === 'stockIn' ? createStockIn : createStockOut;
      const productId = type === 'stockIn' ? productToStockIn : productToStockOut;

      await action({ productId, quantity, userId: user._id });
      showAlert({ 
        title: 'Success', 
        text: `${type === 'stockIn' ? 'Stock In' : 'Stock Out'} Successful!`, 
        icon: 'success' 
      });

      setShowInputModal(false);
      type === 'stockIn' ? setProductToStockIn(null) : setProductToStockOut(null);
      fetchProducts();
    } catch (error) {
      console.error(`Failed to ${type} product:`, error);
      showAlert({ 
        title: 'Error', 
        text: `Failed to ${type === 'stockIn' ? 'stock in' : 'stock out'} product. Please try again.`, 
        icon: 'error' 
      });
    }
  };

  const handleSearch = (filtered) => {
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page for filtered results
  };

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="max-w-screen-xl p-6 mx-auto mt-16">
      <div className="flex justify-between items-center mb-4">
        <SearchBar products={products} onSearch={handleSearch} />
        <div className='flex space-x-2'>
          <Button onClick={() => navigate('/add-product')}>Add Product</Button>
          <Button onClick={exportReport}>Export report</Button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <ProductTableHeader />
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductTableRow
                  key={product._id}
                  product={product}
                  categoryName={product.categoryName}
                  onEdit={() => navigate(`/update-product/${product._id}`)}
                  onStockIn={() => { 
                    setProductToStockIn(product._id); 
                    setShowInputModal(true); 
                  }}
                  onStockOut={() => { 
                    setProductToStockOut(product._id); 
                    setShowInputModal(true); 
                  }}
                  onDelete={() => confirmDelete(product._id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center bg-red-100 text-red-950 mx-auto py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ReusableModal
          isOpen={showModal}
          title="Confirm Deletion"
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
          confirmText="Yes, delete it"
          cancelText="Cancel"
        />
      )}

      {showInputModal && (
        <InputModal
          isOpen={showInputModal}
          title={productToStockIn ? 'Stock In' : 'Stock Out'}
          onConfirm={(quantity) => handleStockChange(productToStockIn ? 'stockIn' : 'stockOut', quantity)}
          onCancel={() => setShowInputModal(false)}
          confirmText={productToStockIn ? 'Stock In' : 'Stock Out'}
        />
      )}

      <PaginationControls
        currentPage={currentPage}
        itemsPerPage={productsPerPage}
        totalItems={filteredProducts.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductTable;
