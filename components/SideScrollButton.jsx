import React from "react";
import Link from "next/link";

const SideScrollButton = ({ data }) => {
	return (
		<div
			className="fixed left-1 top-1/2 -translate-y-1/2 z-[60] flex flex-col justify-center items-center"
			id="sideButton"
			style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
		>
			<Link href={data.link} passHref>
				<a className="bg-black text-white px-2 py-4 rounded-2xl hover:opacity-90 font-sans font-semibold">
					{data.text}
				</a>
			</Link>
		</div>
	);
};

export default SideScrollButton;
