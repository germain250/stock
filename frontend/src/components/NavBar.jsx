import { FaSearch, FaDashcube, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import { useAuthContext } from '../context/AuthContext';
import UserDropdown from './UserDropdown';

const NavBar = () => {
  const navTabs = [
    { name: 'Dashboard', icon: <FaDashcube size={20} />, link: '/' },
    { name: 'Stocks', icon: <FaChartLine size={20} />, link: '/stock-manager' },
  ];

  const { user } = useAuthContext(); // Context for user authentication

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">StockXY</span>
        </Link>

        {/* Right Section */}
        <div className="flex md:order-2 space-x-6">
          {user ? (
            <>
              {/* Search */}
              <button className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300">
                <FaSearch size={20} />
              </button>

              {/* Notifications */}
              <NotificationDropdown />

                <UserDropdown />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-500"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {user && (
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex space-x-8 md:space-x-12 font-medium">
              {navTabs.map((tab, index) => (
                <li
                  key={index}
                  className="flex items-center border-2 py-2 px-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
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
        )}
      </div>
    </nav>
  );
};

export default NavBar;
