import { useState, useEffect } from "react";

function useIsSmallDevice() {
    const [isSmallDevice, setIsSmallDevice] = useState(() =>
        window.matchMedia("(max-width: 768px)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = () => {
            setIsSmallDevice(mediaQuery.matches);
        };

        // Listen for changes
        mediaQuery.addEventListener("change", handleResize);

        // Cleanup listener on unmount
        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    return isSmallDevice;
}

export default useIsSmallDevice;
