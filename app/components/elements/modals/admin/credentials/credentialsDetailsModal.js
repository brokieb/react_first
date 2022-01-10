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
import { faCopy, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../../../../lib/axiosInstance";
import CredentialsChangePasswordForm from "../../../forms/admin/credentials/credentialsChangePasswordForm";
import ActiveCredentialsUserTable from "../../../tables/credentials/activeCredentialsUserTable";
import BannedCredentialsUserTable from "../../../tables/credentials/bannedCredentialsUserTable";
import CredDetails from "../../../../elementsGroups/credentialsDetailsModal/credDetails";
import CredentialsUserSpecialActionForm from "../../../forms/admin/credentials/credentialsUserSpecialActionForm";
import { CredentialsDataContext } from "../../../tables/credentials/credentialsTableContent";
import FriendlyID from "../../../../modules/friendlyID";
import GetData from "../../../../modules/getData";
import { ModalDataIndex } from "../../../../../../pages/admin/credentials";
import Loading from "../../../../layout/loading";
import { AnimatePresence } from "framer-motion";
import PopAlert from "../../../../modules/popAlert";

export const BanUsersContext = createContext({
  bannedUsers: [],
  setBannedUsers: () => {},
});

export const UnbanUsersContext = createContext({
  unbannedUsers: [],
  setUnbannedUsers: () => {},
});

export const MoveUsersContext = createContext({
  movedUsers: [],
  setMovedUsers: () => {},
});

export default function CredentialsDetailsModal({ credId, handleClose, show }) {
  const [loadingData, setLoadingData] = useState(true);
  const [readyData, setReadyData] = useState("");
  const [alertData, setAlertData] = useState({});

  const [bannedUsers, setBannedUsers] = useState([]);
  const banned = useMemo(
    () => ({ bannedUsers, setBannedUsers }),
    [BanUsersContext]
  );

  const [unbannedUsers, setUnbannedUsers] = useState([]);
  const unbanned = useMemo(
    () => ({ unbannedUsers, setUnbannedUsers }),
    [UnbanUsersContext]
  );

  const [movedUsers, setMovedUsers] = useState([]);
  const moved = useMemo(
    () => ({ movedUsers, setMovedUsers }),
    [MoveUsersContext]
  );

  const { credentialsData, setCredentialsData } = useContext(
    CredentialsDataContext
  );

  useEffect(() => {
    const ans = GetData(
      credentialsData,
      credId,
      axiosInstance.get("/api/creds/getCredentials", {
        params: {
          _id: credId,
        },
      })
    ).then((items) => {
      setReadyData(items);
      setLoadingData(false);
    });
  }, [credId, credentialsData]);

  useEffect(() => {}, [credentialsData]);
  function BadgeArrayItems({
    items,
    variant,
    header,
    sendEmail,
    moveUsers,
    maxUsers,
    currentUsers,
    cb,
  }) {
    const render = items.map((item, key) => {
      return (
        <Badge className="p-1 m-1" bg={variant} key={key}>
          {item}
        </Badge>
      );
    });
    return render.length ? (
      <div>
        <h3>{header}</h3>
        <div>{render}</div>
        <div>
          {maxUsers < currentUsers + render.length ? (
            <Alert variant="danger">
              Próbujesz odbanować więcej osób niż jest miejsca, zwolnij najpierw
              miejsce żeby kontynuować
            </Alert>
          ) : (
            <></>
          )}
        </div>
        {maxUsers < currentUsers + render.length ? (
          <Button variant="success" disabled={true}>
            Wyślij
          </Button>
        ) : (
          <CredentialsUserSpecialActionForm
            id={credId}
            sendEmail={sendEmail}
            moveUsers={moveUsers}
            cb={cb}
          />
        )}
      </div>
    ) : (
      <div>
        Brak zaznaczonych użytkowników do funkcji : {header.toLowerCase()}
      </div>
    );
  }

  return (
    <Modal onHide={handleClose} show={show} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          Szczegóły konta <FriendlyID ID={credId} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        {loadingData ? (
          <Loading />
        ) : (
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
                  Ustawienia
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="#link2"
                  className="d-flex justify-content-center"
                >
                  Użytkownicy
                </ListGroup.Item>
              </ListGroup>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  <Row>
                    <Col>
                      <CredentialsChangePasswordForm credId={readyData._id} />
                    </Col>
                    <Col>
                      <CredDetails cred={readyData} />
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <MoveUsersContext.Provider value={moved}>
                    <BanUsersContext.Provider value={banned}>
                      <h2>Użytkownicy aktywni</h2>
                      <AnimatePresence>
                        <ActiveCredentialsUserTable credId={readyData._id} />
                      </AnimatePresence>

                      <div>
                        <BadgeArrayItems
                          items={movedUsers}
                          variant="primary"
                          header="Przenoszenie"
                          sendEmail={true}
                          moveUsers={true}
                          cb={(val) => {
                            const usrToMove = movedUsers;
                            setMovedUsers([]);
                            axiosInstance
                              .put("/api/creds/putMoveCredentialsUser", {
                                params: {
                                  newId: val.newCredId,
                                  users: usrToMove,
                                  sendEmail: val.sendEmail,
                                },
                              })
                              .then((ans) => {
                                let arr = [];
                                setAlertData({
                                  variant: "success",
                                  title: "Sukces",
                                  body: "Poprawnie przeniesiono użytkowników",
                                  cb: () => {
                                    setAlertData({});
                                  },
                                });
                                setCredentialsData((item) => {
                                  return item.map((item, index) => {
                                    if (item._id == readyData._id) {
                                      //stare konto
                                      item.users = item.users.filter((user) => {
                                        if (usrToMove.includes(user._id)) {
                                          arr.push(user);
                                        }
                                        return !usrToMove.includes(user._id);
                                      });
                                      item.usersLen =
                                        item.usersLen - arr.length;
                                    }
                                    return item;
                                  });
                                });

                                setCredentialsData((item) => {
                                  return item.map((item, index) => {
                                    if (item._id == val.newCredId) {
                                      item.users.push(...arr);
                                      item.usersLen =
                                        item.usersLen + arr.length;
                                    }
                                    return item;
                                  });
                                });
                              })
                              .catch((err) => {
                                setAlertData({
                                  variant: "danger",
                                  title: "Błąd",
                                  body: "Wystąpił błąd",
                                  cb: () => {
                                    setAlertData({});
                                  },
                                });
                              });
                          }}
                        />
                        <BadgeArrayItems
                          items={bannedUsers}
                          variant="primary"
                          header="Banowanie"
                          sendEmail={false}
                          cb={(val) => {
                            axiosInstance
                              .put("/api/creds/putBanCredentialsUser", {
                                params: {
                                  users: bannedUsers,
                                },
                              })
                              .then((ans) => {
                                const content = ans.data.data;
                                setBannedUsers([]);
                                setAlertData({
                                  variant: "success",
                                  title: "Sukces",
                                  body: "Poprawnie zablokowano użytkowników",
                                  cb: () => {
                                    setAlertData({});
                                  },
                                });
                                setCredentialsData((item) => {
                                  return item.map((item, index) => {
                                    if (item._id == content._id) {
                                      item.users = content.users;
                                      item.usersLen = content.usersLen;
                                      item.usersHistory = content.usersHistory;
                                    }
                                    return item;
                                  });
                                });
                              })
                              .catch((err) => {
                                setAlertData({
                                  variant: "danger",
                                  title: "Błąd",
                                  body: "Nie udało się zablokować użytkowników",
                                  cb: () => {
                                    setAlertData({});
                                  },
                                });
                              });
                          }}
                        />
                      </div>
                    </BanUsersContext.Provider>
                  </MoveUsersContext.Provider>
                  <hr />
                  <h2>Użytkownicy wykluczeni</h2>
                  <UnbanUsersContext.Provider value={unbanned}>
                    <BannedCredentialsUserTable credId={readyData._id} />
                    <BadgeArrayItems
                      items={unbannedUsers}
                      variant="primary"
                      header="Odbanowanie"
                      sendEmail={false}
                      currentUsers={readyData.usersLen}
                      maxUsers={readyData.usersMaxLen}
                      cb={(val) => {
                        axiosInstance
                          .put("/api/creds/putUnbanCredentialsUser", {
                            params: {
                              users: unbannedUsers,
                            },
                          })
                          .then((ans) => {
                            const content = ans.data.data;
                            setUnbannedUsers([]);
                            setAlertData({
                              variant: "success",
                              title: "OK!",
                              body: "Poprawnie odblokowano użytkowników",
                              cb: () => {
                                setAlertData({});
                              },
                            });
                            setCredentialsData((item) => {
                              return item.map((item, index) => {
                                if (item._id == content._id) {
                                  item.users = content.users;
                                  item.usersLen = content.usersLen;
                                  item.usersHistory = content.usersHistory;
                                }
                                return item;
                              });
                            });
                          })
                          .catch((err) => {
                            setAlertData({
                              variant: "danger",
                              title: "Błąd",
                              body: "Wystąpił błąd",
                              cb: () => {
                                setAlertData({});
                              },
                            });
                          });
                      }}
                    />
                  </UnbanUsersContext.Provider>
                </Tab.Pane>
              </Tab.Content>
            </Row>
          </Tab.Container>
        )}
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
