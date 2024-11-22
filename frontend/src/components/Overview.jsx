import { useState, useEffect } from "react";
import { GrMoney, GrUser, GrShop, GrApps, GrPackage } from "react-icons/gr";
import StockCard from "./Card";
import { getStockOverview } from "../services/apiService";

const Overview = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await getStockOverview();
        setOverview(data);
      } catch (error) {
        console.error("Failed to fetch overview:", error);
      }
    };

    fetchOverview();
  }, []);

  if (!overview) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4 mt-8 mb-4">
      <StockCard title="Total Revenue" value={`$${overview.totalRevenue.toLocaleString()}`} icon={GrMoney} />
      <StockCard title="Total Sales" value={overview.totalStockOut.toLocaleString()} icon={GrShop} />
      <StockCard title="Total Stock Quantity" value={overview.totalStockQuantity.toLocaleString()} icon={GrUser} />
      <StockCard title="Total Categories" value={overview.totalCategories.toLocaleString()} icon={GrApps} />
      <StockCard title="Total Products" value={overview.totalProducts.toLocaleString()} icon={GrPackage} />
    </div>
  );
};

export default Overview;
