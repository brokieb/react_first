export default function GetIndex(items, id) {
	for (const [index, item] of items.entries()) {
		if (item._id == id) {
			return index;
		}
	}
}
