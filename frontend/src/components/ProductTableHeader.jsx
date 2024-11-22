const ProductTableHeader = () => (
    <thead className="bg-gray-200">
      <tr>
        {['Name', 'SKU', 'Category', 'Description', 'Price', 'Stock', 'Action'].map((header) => (
          <th key={header} className="px-6 py-3 text-xs font-medium text-left text-gray-700 uppercase">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
  
  export default ProductTableHeader;
  