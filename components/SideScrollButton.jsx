import React from "react";
import Link from "next/link";

const SideScrollButton = ({ data }) => {
	return (
		<div
			className="fixed left-1 top-1/2 -translate-y-1/2 z-[60] flex flex-col justify-center items-center"
			id="sideButton"
			style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
		>
			<Link
				href={data.link}
				passHref
				className="bg-black text-xl font-bold text-white font-amaticSC px-2 py-4 rounded-2xl hover:opacity-90 tracking-widest"
			>
				{data.text}
			</Link>
		</div>
	);
};

export default SideScrollButton;
