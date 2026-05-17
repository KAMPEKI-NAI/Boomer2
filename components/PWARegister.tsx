import { useEffect } from "react";

const PWARegister = () => {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
            return;
        }

        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js").catch(() => undefined);
        });
    }, []);

    return null;
};

export default PWARegister;
