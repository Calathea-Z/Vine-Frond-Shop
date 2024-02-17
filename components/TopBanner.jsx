import Link from "next/link";

function TopBanner({ data }) {
	return (
		<div
			style={{
				backgroundColor: data.backgroundColor.hex,
				height: "30px",
				zIndex: 20,
			}}
			className="w-full fixed top-0 left-0 text-center"
			id="top-banner"
		>
			<Link
				className="hover:underline underline-offset-2 text-sm"
				href={data.link}
			>
				{data.text}
			</Link>
		</div>
	);
}

export default TopBanner;
