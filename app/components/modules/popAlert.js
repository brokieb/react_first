import SweetAlert from 'react-bootstrap-sweetalert';
export default function PopAlert({ data }) {
	if (Object.keys(data).length > 0) {
		return (
			<SweetAlert type={data.variant} title={data.title} onConfirm={data.cb}>
				{data.body}
			</SweetAlert>
		);
	} else {
		return <></>;
	}
}
