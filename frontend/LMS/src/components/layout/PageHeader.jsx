import { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";

const PageHeader = ({ title, subtitle, action, showBreadcrumbs = true }) => {
  return (
    <div className="mb-8">
      {showBreadcrumbs && <Breadcrumbs />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {action && <div className="mt-4 sm:mt-0">{action}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
