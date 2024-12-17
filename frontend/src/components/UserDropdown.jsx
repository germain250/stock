import { useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthContext from "../context/AuthContext";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user,logout } = useContext(AuthContext); // Correctly consume AuthContext

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        id="dropdownUserAvatarButton"
        onClick={toggleDropdown}
        className="text-gray-600 mt-2 dark:text-white hover:text-gray-800 dark:hover:text-gray-300"
        type="button"
        aria-expanded={isDropdownOpen} // Accessibility
        aria-controls="dropdownAvatar"
      >
        <FaUserCircle size={24} />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          id="dropdownAvatar"
          className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            {/* Handle cases where `user` is null or undefined */}
            {user ? (
              <>
                <div>{user.username}</div>
                <div className="font-medium truncate">{user.email}</div>
              </>
            ) : (
              <div className="text-gray-500 italic">Guest User</div>
            )}
          </div>
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
