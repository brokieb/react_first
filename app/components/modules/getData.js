export default async function GetData(items, id, cbNoContext, type = "_id") {
  if (items.length > 0) {
    for (const [index, item] of items.entries()) {
      if (item[type] == id) {
        return item;
      }
    }
  } else {
    const data = await cbNoContext;
    return data.data;
  }
}
