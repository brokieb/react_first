import { useEffect, useState } from "react";
import ShopSettingsForm from "/app/components/elements/forms/admin/settings/shopSettingsForm";
import axiosInstance from "/app/lib/axiosInstance";
import { Alert, Button } from "react-bootstrap";
import AllegroLoginButton from "/app/components/elements/buttons/admin/settings/allegroLoginButton";
import SingleSystemStatus from "/app/components/layout/singleSystemStatus";
export default function Home(props) {
  const [smtpStatus, setSmtpStatus] = useState(0);
  const [allegroStatus, setAllegroStatus] = useState(0);
  useEffect(() => {
    props.setTitle("[A] - Ustawienia serwisu");

    axiosInstance
      .post("/api/email/postEmail", null, {
        params: {
          template: "testMail",
          to: "brokieb@gmail.com",
          test: "true",
        },
      })
      .then((item) => {
        setSmtpStatus(2);
      })
      .catch((err) => {
        setSmtpStatus(1);
      });

    const access = axiosInstance
      .get("/api/allegro/getLogin")
      .then((item) => {
        setAllegroStatus(2);
      })
      .catch((err) => {
        setAllegroStatus(1);
      });
  }, []);

  return (
    <div className="w-50">
      <h2>USTAWIENIA</h2>
      <Alert variant="danger">
        <Alert.Heading>Hej, uważaj!</Alert.Heading>
        <p>
          Dane z poniższego formularza są danymi wrażliwymi, niepoprawne
          ustawienie wartości danego parametru może zablokować sklep i
          uniemożliwić zalogowanie się do panelu administratora tego sklepu.
        </p>
        <hr />
        <p className="mb-0">Bądz czujny wprowadzając zmiany!</p>
      </Alert>
      <div className="d-flex flex-column  align-items-start my-3">
        <SingleSystemStatus status={smtpStatus} title="SMTP services" />
        <SingleSystemStatus status={allegroStatus} title="Allegro connect" />
        <SingleSystemStatus status={2} title="Shop live" />
      </div>
      <AllegroLoginButton />
      <ShopSettingsForm settings={props.settings} />
      <hr />
      <ul>
        <li>zmiana currency</li>
        <li>Api do allegro</li>
        <li>Włącz/wyłącz sklep</li>
        <li>Toggle automat</li>
        <li>Zaokrąglenie cen</li>
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const settings = await axiosInstance.get("/api/settings/getSettings");
  const ENV_ALLEGRO_ID = process.env.ALLEGRO_ID;
  const ENV_ADDRESS = process.env.ADDRESS;
  return {
    props: {
      settings: settings.data,
    },
  };
}
