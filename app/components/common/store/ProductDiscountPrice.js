export default function ProductDiscountPrice({price,discount,type}){
console.log(price,discount,"@@")
const newPrice = price - discount;

return Math.round(newPrice * 100) / 100;

}