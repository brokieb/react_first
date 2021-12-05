export default function Home(props) {
  useEffect(() => {
    props.setTitle("[A] - Ustawienia serwisu");
  }, [props]);
  return (
    <>
      <h2>USTAWIENIA</h2>
      <ul>
        <li>zmiana currency</li>
        <li>Api do allegro</li>
        <li>Włącz/wyłącz sklep</li>
        <li>Toggle automat</li>
        <li>Zaokrąglenie cen</li>
      </ul>
    </>
  );
}
