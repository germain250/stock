import { useState } from "react";
import Overview from "../components/Overview";
import QuickActions from "../components/QuickActions";
import ActivityLog from "../components/ActivityLog";
import ProductForm from "./AddProduct";
import RegisterForm from "../components/RegisterForm";
import AddCategory from "../components/AddCategory";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("ActivityLog");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "ActivityLog":
        return <ActivityLog />;
      case "AddNewStock":
        return <div className="lg:mt-[-100px]"><ProductForm /></div>;
      case "GenerateReport":
        return <div>Generate Report Section</div>;
      case "AddUser":
        return <div className="lg:mt-[-100px]"><RegisterForm /></div>;
      case "ExportData":
        return <div>Export Data Section</div>;

      case "AddCategory":
        return <div><AddCategory /></div>
      default:
        return <div>Select an action from Quick Actions.</div>;
    }
  };

  return (
    <div className="max-w-screen-xl p-6 mx-auto mt-16">
      {/* Overview Section */}
      <Overview />

      <div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-6 mt-8">
        {/* Left Section: QuickActions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <QuickActions setActiveSection={setActiveSection} />
        </div>

        {/* Right Section: Active Component */}
        <div className="col-span-12 lg:col-span-8">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
