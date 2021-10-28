import axios from 'axios';
export default function Home() {
	axios.get('http://localhost:3000/api/getTest').then((ans) => {
		console.log(ans);
		// const creds = ans.data;
		// setReadyData(<>Szcegóły konta {creds.email}</>);
		// setLoadingData(false);
	});
	return <h2>WSZYSTKIE ZAMÓWIENIA</h2>;
}
