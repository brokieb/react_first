import axiosInstance from 'app/lib/axiosInstance';
export default function Home() {
	axiosInstance.get('/api/getTest').then((ans) => {
		// const creds = ans.data;
		// setReadyData(<>Szcegóły konta {creds.email}</>);
		// setLoadingData(false);
	});
	return <h2>WSZYSTKIE ZAMÓWIENIA</h2>;
}
