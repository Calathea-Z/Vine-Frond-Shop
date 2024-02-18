import React from "react";

const SideScrollButton = ({ isSideButtonEnabled }) => {
	if (!isSideButtonEnabled) {
		return null;
	}

	return (
		<div
			className="fixed left-1 top-1/2 -translate-y-1/2 z-[60] flex flex-col justify-center items-center"
			id="sideButton"
			style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
		>
			<button className="bg-black text-white px-2 py-4 rounded-2xl hover:opacity-90 font-sans font-semibold">
				Get 10% off
			</button>
		</div>
	);
};

export default SideScrollButton;
