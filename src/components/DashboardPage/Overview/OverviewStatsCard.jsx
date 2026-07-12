import React from "react";

const OverviewStatsCard = ({ title, value, icon: Icon, iconBg }) => {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white dark:bg-gray-500/50 p-4 shadow-sm ">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-sm ${iconBg} dark:bg-white`}
        >
          <Icon className={`text-2xl text-black`} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-white">
            {title}
          </p>
          <h3 className=" text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OverviewStatsCard;
