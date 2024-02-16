import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToTop(delay = 100) {
	const { pathname } = useLocation();

	useEffect(() => {
		const timer = setTimeout(() => {
			window.scrollTo(0, 0);
		}, delay);

		return () => clearTimeout(timer);
	}, [pathname]);
}

export default useScrollToTop;
