import {
  Button,
  Modal,
  Col,
  Tab,
  Row,
  ListGroup,
  CloseButton,
  Badge,
  Alert,
} from "react-bootstrap";
import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useContext,
} from "react";
import { CredentialsDataContext } from "../../../../../../app/components/elements/tables/credentials/credentialsTableContent";
import PopAlert from "../../../../../../app/components/modules/popAlert";
import Details from "../../../../../../app/components/elements/tabPanes/auctionDetailsModal/details";
import AuctionEditor from "../../../../../../app/components/elements/tabPanes/auctionDetailsModal/auctionEditor";
export default function AuctionDetailsModal({ auction, handleClose, show }) {
  const [loadingData, setLoadingData] = useState(true);
  const [readyData, setReadyData] = useState("");
  const [alertData, setAlertData] = useState({});

  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );

  //   useEffect(() => {
  //     const ans = GetData(
  //       credentialsData,
  //       credId,
  //       axiosInstance.get("/api/creds/getCredentials", {
  //         params: {
  //           _id: credId,
  //         },
  //       })
  //     ).then((items) => {
  //       setReadyData(items);
  //       setLoadingData(false);
  //     });
  //   }, [credId, credentialsData]);

  return (
    <Modal onHide={handleClose} show={show} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Szczegóły aukcji {auction.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <ListGroup
              variant="flush"
              className="d-flex flex-row p-0 border-bottom mb-3"
            >
              <ListGroup.Item
                action
                href="#link1"
                className="d-flex justify-content-center"
              >
                Podsumowanie
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#link2"
                className="d-flex justify-content-center"
              >
                Edycja
              </ListGroup.Item>
            </ListGroup>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <Details auction={auction} />
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <AuctionEditor auction={auction} />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Zamknij
        </Button>
        <Button
          type="submit"
          variant="success"
          form="credentialsChangePasswordForm"
        >
          Zapisz
        </Button>
      </Modal.Footer>
      <PopAlert data={alertData} />
    </Modal>
  );
}
