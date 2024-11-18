import React from "react";

const SocialButtonGroup = () => {
  return (
    <div className="grid grid-cols-3 gap-0">
      <button className="p-2">
        <img src="./assets/telegram.svg" alt="telegram" />
      </button>
      <button className="p-2">
        <img src="./assets/youtube.svg" alt="youtube" />
      </button>
      <button className="p-2">
        <img src="./assets/twitter.svg" alt="twitter" />
      </button>
    </div>
  );
};

export default SocialButtonGroup;