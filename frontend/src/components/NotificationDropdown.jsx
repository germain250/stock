import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../assets/style.css"; // Ensure you have relevant styles imported

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setNewNotificationCount(0); // Reset the count when the dropdown is opened
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Replace with your server URL

    // Fetch existing notifications on mount
    fetch("http://localhost:3000/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Error fetching notifications:", err));

    // Listen for real-time notifications
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setNewNotificationCount((count) => count + 1); // Increment new notifications count
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={toggleDropdown}
        className="relative inline-flex items-center p-2 text-gray-500 hover:text-gray-900 focus:outline-none"
      >
        {/* Notification Icon */}
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
          aria-hidden="true"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>

        {/* Notification Badge */}
        {newNotificationCount > 0 && (
          <div className="absolute top-[-10px] right-[-10px] flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full text-xs animate-bounce">
            {newNotificationCount}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20">
          {/* Header */}
          <div className="py-3 px-4 text-center bg-gray-50 dark:bg-gray-700 rounded-t-lg font-semibold text-gray-700 dark:text-gray-200">
            Notifications
          </div>
          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex flex-col px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {notification.name || "System"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(notification.time).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No notifications available.
              </div>
            )}
          </div>
          {/* Footer */}
          <div className="py-2 text-center bg-gray-50 dark:bg-gray-700 rounded-b-lg">
            <a
              href="#"
              className="text-blue-500 hover:underline dark:text-blue-400 text-sm"
            >
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
