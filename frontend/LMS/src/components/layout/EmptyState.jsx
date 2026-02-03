import { FiPlus, FiSearch, FiFileText } from "react-icons/fi";

const EmptyState = ({
  icon = "search",
  title = "No items found",
  description = "Get started by creating a new item.",
  action,
  secondaryAction,
}) => {
  const icons = {
    search: <FiSearch className="h-12 w-12 text-gray-400" />,
    add: <FiPlus className="h-12 w-12 text-gray-400" />,
    file: <FiFileText className="h-12 w-12 text-gray-400" />,
  };

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-4">
        {icons[icon] || icons.search}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">{description}</p>
      <div className="flex justify-center space-x-3">
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            {action.icon && <action.icon className="mr-2 h-4 w-4" />}
            {action.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {secondaryAction.icon && (
              <secondaryAction.icon className="mr-2 h-4 w-4" />
            )}
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
