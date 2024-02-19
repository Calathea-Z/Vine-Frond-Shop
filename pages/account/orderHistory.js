import dynamic from "next/dynamic";

const OrderHistory = dynamic(() => import("@/components/OrderHistory"), {
	ssr: false,
});

export default function OrderHistoryPage() {
	return <OrderHistory />;
}
