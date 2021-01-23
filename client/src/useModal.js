import { useState } from 'react';

const useModal = () => {
  // isShowing is set to false by default here
  const [isShowing, setIsShowing] = useState(false);

  //toggles isShowing (which is set to false by default) to the opposite of itself
  function toggle() {
    setIsShowing(!isShowing);
  }

  // returns isShowing and toggle so they can imported and used in other files
  return {
    isShowing,
    toggle,
  }
};

export default useModal;