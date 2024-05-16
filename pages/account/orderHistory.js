import dynamic from "next/dynamic";

const OrderHistory = dynamic(
	() => import("@/components/userAccount/OrderHistory"),
	{
		ssr: false,
	}
);

export default function OrderHistoryPage() {
	return <OrderHistory />;
}
