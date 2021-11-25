export default async function GetData(items, id, cbNoContext) {
	if (items.length > 0) {
		for (const [index, item] of items.entries()) {
			if (item._id == id) {
				return items[index];
			}
		}
	} else {
		const data = await cbNoContext;
		return data.data;
	}
}
