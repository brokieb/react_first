import OrderHistoryCard from '../../../components/user/OrderHistoryCard';

export default function Home() {
	return (
		<div className="w-50 d-flex flex-column gap-2">
			<OrderHistoryCard login="loginek" password="asdasdasdas" title="jakis tytul" days_left="5"></OrderHistoryCard>
			<OrderHistoryCard login="loginek" password="asdasdasdas" title="jakis tytul 2 " days_left="35"></OrderHistoryCard>
			<OrderHistoryCard login="loginek" password="asdasdasdas" title="jakis tytul3 3" days_left="66"></OrderHistoryCard>
			<OrderHistoryCard login="loginek" password="asdasdasdas" title="jakis tytul 4444" days_left="12"></OrderHistoryCard>
		</div>
	);
}
