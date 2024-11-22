import Overview from "../components/Overview";
import QuickActions from "../components/QuickActions";
import ActivityLog from "../components/ActivityLog";

function AdminDashboard() {
  return (
    <div className="max-w-screen-xl p-6 mx-auto mt-16">
      {/* Overview Section */}
      <Overview />

      <div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-6 mt-8">
        {/* Left Section: FilterPanel and QuickActions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <QuickActions />
        </div>

        {/* Right Section: Activity Log */}
        <div className="col-span-12 lg:col-span-8">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
