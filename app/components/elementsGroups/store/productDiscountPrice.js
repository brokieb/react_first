export default function ProductDiscountPrice(price, discount, type) {
	const newPrice = price - discount;

	return Math.round(newPrice * 100) / 100;
}
