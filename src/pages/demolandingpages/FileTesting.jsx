import React from "react";

const FileTesting = () => {
  const openPlayStore = () => {
    // 🔁 Replace with YOUR app Play Store link
    window.open(
      "https://play.google.com/store/apps/details?id=com.kubyntool&pcampaignid=web_share",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={openPlayStore}
        className="
          px-8 py-4
          text-lg font-semibold text-white
          bg-gradient-to-r from-green-500 to-green-600
          rounded-xl
          shadow-lg
          hover:shadow-2xl
          hover:scale-105
          transition-all duration-300
          active:scale-95
        "
      >
        Download App
      </button>
    </div>
  );
};

export default FileTesting;
