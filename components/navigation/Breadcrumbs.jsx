import { useRouter } from "next/router";
import Link from "next/link";

function Breadcrumbs() {
	const router = useRouter();
	const { categoryName } = router.query;

	let breadcrumbPaths = [{ name: "Shop All", path: "/allproducts" }];

	if (categoryName) {
		breadcrumbPaths.push({
			name: categoryName,
			path: `/allproducts/${categoryName}`,
		});
	}

	// Hide the "Shop All" breadcrumb when at the "/allproducts" route
	if (router.pathname === "/allproducts") {
		breadcrumbPaths = breadcrumbPaths.slice(1);
	}

	return (
		<div className="breadcrumbs">
			{breadcrumbPaths.map((crumb, index) => (
				<span key={index}>
					{index > 0 && " / "}
					<Link
						href={crumb.path}
						className="text-black font-bold text-[1.3rem] font-amaticSC px-3"
					>
						{crumb.name}
					</Link>
				</span>
			))}
		</div>
	);
}
export default Breadcrumbs;
