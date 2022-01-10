import { useRef, useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup, Tab, Row, Col } from "react-bootstrap";
import FriendlyID from "../../../../../../app/components/modules/friendlyID";
import SettingsPane from "../../../../../../app/components/elements/tabPanes/productDetailsModal/settings";
import ConnectedAccountsPane from "../../../../../../app/components/elements/tabPanes/productDetailsModal/connectedAccounts";
import Auction from "../../../../../../app/components/elements/tabPanes/productDetailsModal/auction";
export default function ProductDetailsModal(props) {
  const [credsData, setCredsData] = useState([]);
  const [loadingCredsTable, setLoadingCredsTable] = useState(true);
  const product = props.product;

  return (
    <Modal show={props.show} onHide={props.handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Edytuj produkt <FriendlyID ID={product._id} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="#settings"
        >
          <Row>
            <ListGroup
              variant="flush"
              className="d-flex flex-row p-0 border-bottom mb-3"
            >
              <ListGroup.Item
                action
                href="#settings"
                className="d-flex justify-content-center"
              >
                Ustawienia
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#connectedAccounts"
                className="d-flex justify-content-center"
              >
                Podpięte konta
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="#auction"
                className="d-flex justify-content-center"
              >
                Aukcja
              </ListGroup.Item>
            </ListGroup>
            <Tab.Content>
              <Tab.Pane eventKey="#settings">
                <SettingsPane
                  handleClose={props.handleClose}
                  product={product}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="#connectedAccounts">
                <ConnectedAccountsPane product={product} />
              </Tab.Pane>
              <Tab.Pane eventKey="#auction">
                <Auction product={product} />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Zamknij
        </Button>
        <Button type="submit" variant="success" form="editProductForm">
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
