import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToTop(delay = 100) {
    const { pathname } = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0, 0);
        }, delay);

        // Cleanup function to clear the timeout
        return () => clearTimeout(timer);
    }, [pathname]);
}

export default useScrollToTop;