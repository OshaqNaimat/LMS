import { useState } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiXCircle,
  FiX,
} from "react-icons/fi";

const Alert = ({
  type = "info",
  title,
  message,
  onClose,
  showIcon = true,
  dismissible = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const alertConfig = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: <FiCheckCircle className="h-5 w-5 text-green-400" />,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: <FiXCircle className="h-5 w-5 text-red-400" />,
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: <FiAlertCircle className="h-5 w-5 text-yellow-400" />,
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: <FiInfo className="h-5 w-5 text-blue-400" />,
    },
  };

  const config = alertConfig[type];

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`rounded-md p-4 ${config.bg} ${config.border} border`}>
      <div className="flex">
        {showIcon && <div className="flex-shrink-0">{config.icon}</div>}
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.text}`}>{title}</h3>
          )}
          {message && (
            <div className={`text-sm ${config.text} mt-2`}>{message}</div>
          )}
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <button
              onClick={handleClose}
              className={`inline-flex ${config.bg} rounded-md p-1.5 ${config.text} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${type}-50 focus:ring-${type}-600`}
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
