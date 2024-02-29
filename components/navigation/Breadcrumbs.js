function Breadcrumbs() {
	return (
		<div className="breadcrumbs">
			<a href="/allproducts">All Products</a> / <span>{category}</span>
		</div>
	);
}
export default Breadcrumbs;
