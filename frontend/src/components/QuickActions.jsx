const QuickActions = () => (
    <div className="bg-white p-4 rounded-lg shadow mt-8 mb-4">
      <h2 className="font-semibold text-lg text-gray-700 mb-4">Quick Actions</h2>
      <div className="space-y-3">
        <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Add New Stock
        </button>
        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Generate Report
        </button>
        <button className="w-full bg-transparent border-2 text-green-500 hover:text-green-100 border-deep-green px-4 py-2 rounded hover:bg-deep-green">
          Add User
        </button>
        <button className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
          Export Data
        </button>
      </div>
    </div>
  );
  
  export default QuickActions;
  