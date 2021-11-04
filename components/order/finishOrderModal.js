import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FinishOrderModal(props) {
  const [loadingData, setLoadingData] = useState(true);
  const [readyData, setReadyData] = useState('');
  useEffect(() => {
    if (!loadingData) {
      setLoadingData(true);
    }
  }, [props.credId]);

  function getData() {
    axios
      .get('http://localhost:3000/api/getOrders', {
        params: {
          _id: props.orderId,
        },
      })
      .then((ans) => {
        console.log(ans);
        const data = ans.data[0];
        setReadyData(
          <>
            Opłać zamówienie {data._id}
            <Button onClick={props.handleClose} variant='success'>
              ZAPŁAĆ ! ! !
            </Button>
          </>
        );
        setLoadingData(false);
      });
  }

  useEffect(() => {
    getData();
  }, [props.credId]);

  return (
    <Modal onHide={props.handleClose} show={props.show} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Szczegóły konta</Modal.Title>
      </Modal.Header>
      <Modal.Body>{loadingData ? <p>Ładowanie</p> : readyData}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Zamknij
        </Button>
        <Button type='submit' variant='success'>
          Zapisz
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
