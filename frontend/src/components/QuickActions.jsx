import PropTypes from 'prop-types'
const QuickActions = ({ setActiveSection }) => (
  <div className="bg-white p-4 rounded-lg shadow mt-8 mb-4">
    <div className="space-y-3">
      <button
        onClick={() => setActiveSection("ActivityLog")}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Activity Log
      </button>
      <button
        onClick={() => setActiveSection("AddCategory")}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Add Category
      </button>
      <button
        onClick={() => setActiveSection("AddNewStock")}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Stock
      </button>
      <button
        onClick={() => setActiveSection("GenerateReport")}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Report
      </button>
      <button
        onClick={() => setActiveSection("AddUser")}
        className="w-full bg-transparent border-2 text-green-500 hover:text-green-100 border-deep-green px-4 py-2 rounded hover:bg-deep-green"
      >
        Add User
      </button>
      <button
        onClick={() => setActiveSection("ExportData")}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Export Data
      </button>
    </div>
  </div>
);

QuickActions.propTypes = {
  setActiveSection: PropTypes.func
}

export default QuickActions;
