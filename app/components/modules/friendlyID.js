export default function FriendlyID({ ID }) {
	if (ID) {
		const friendly = ID.slice(-6);
		return '#' + friendly.toUpperCase();
	} else {
		return ':(';
	}
}
