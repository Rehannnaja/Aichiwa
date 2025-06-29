import { useEffect, useState } from "react";

export default function useMatureMode() {
  const [isMatureVisible, setIsMatureVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mature");
    if (stored === "true") {
      setIsMatureVisible(true);
    }
  }, []);

  const toggleMature = () => {
    const newState = !isMatureVisible;
    setIsMatureVisible(newState);
    localStorage.setItem("mature", newState.toString());
  };

  return { isMatureVisible, toggleMature };
}

