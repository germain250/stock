import { FaSearch, FaUserCircle, FaDashcube, FaChartLine, FaRegFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const NavBar = () => {
  const navTabs = [
    { name: 'Dashboard', icon: <FaDashcube size={20} />, link: '/' },
    { name: 'Stocks', icon: <FaChartLine size={20} />, link: '/stock-manager' },
    { name: 'Reports', icon: <FaRegFileAlt size={20} />, link: '/reports' },
  ];

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">StockXY</span>
        </Link>

        <div className="flex md:order-2 space-x-6">
          <button className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300">
            <FaSearch size={20} />
          </button>

          <NotificationDropdown />

          <button className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300">
            <FaUserCircle size={24} />
          </button>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex space-x-8 md:space-x-12 font-medium">
            {navTabs.map((tab, index) => (
              <li key={index} className="flex items-center border-2 py-2 px-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="mr-2">{tab.icon}</span>
                <Link
                  to={tab.link}
                  className="text-gray-900 text-sm dark:text-white hover:text-deep-green dark:hover:text-green-500"
                >
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
