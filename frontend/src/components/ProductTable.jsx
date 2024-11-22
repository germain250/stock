import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct, getSingleCategory, createStockIn, createStockOut } from '../services/apiService';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false); // State for InputModal
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToStockIn, setProductToStockIn] = useState(null); // State for stock-in product
  const [productToStockOut, setProductToStockOut] = useState(null); // State for stock-out product
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
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      setShowModal(false);
      showAlert({
        title: 'Product',
        text: 'Product Deleted Successfully!',
        icon: 'success'
      });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleStockIn = async (quantity) => {
    try {
      await createStockIn({ productId: productToStockIn, quantity, userId: user._id });
      showAlert({
        title: 'Product',
        text: 'Stock In Successful!',
        icon: 'success'
      });
      setShowInputModal(false);
      setProductToStockIn(null);
      fetchProducts();
    } catch (error) {
      console.error('Failed to stock in product:', error);
      showAlert({
        title: 'Error',
        text: 'Failed to stock in product. Please try again.',
        icon: 'error'
      });
    }
  };

  const handleStockOut = async (quantity) => {
    try {
      await createStockOut({ productId: productToStockOut, quantity, userId: user._id });
      showAlert({
        title: 'Product',
        text: 'Stock Out Successful!',
        icon: 'success'
      });
      setShowInputModal(false);
      setProductToStockOut(null);
      fetchProducts();
    } catch (error) {
      console.error('Failed to stock out product:', error);
      showAlert({
        title: 'Error',
        text: 'Failed to stock out product. Please try again.',
        icon: 'error'
      });
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="max-w-screen-xl p-6 mx-auto mt-16">
      <div className="flex w-full mx-auto justify-between mt-8 mb-4">
        <SearchBar />
        <Button onClick={() => navigate('/add-product')}>Add Product</Button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <ProductTableHeader />
          <tbody>
            {currentProducts.map((product) => (
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
            ))}
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
          title={productToStockIn ? "Stock In" : "Stock Out"}
          onConfirm={productToStockIn ? handleStockIn : handleStockOut}
          onCancel={() => setShowInputModal(false)}
          confirmText={productToStockIn ? "Stock In" : "Stock Out"}
        />
      )}

      <PaginationControls
        currentPage={currentPage}
        itemsPerPage={productsPerPage}
        totalItems={products.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductTable;
