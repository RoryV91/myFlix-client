import React from "react";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const Home = () => {
	useScrollToTop();
	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100">
			<h1 className="display-1">Welcome to MyFlix</h1>
			<h2 className="display-6">
				Discover and watch your favorite movies and TV shows.
			</h2>
		</div>
	);
};

export default Home;
