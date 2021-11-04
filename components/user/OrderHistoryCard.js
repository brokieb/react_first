import { Card, Button, ProgressBar } from 'react-bootstrap';
import { useState } from 'react';
import FinishOrderModal from '../order/finishOrderModal';
export default function Home(props) {
  const [modal, setModal] = useState(false);
  const [ShowFinishOrderModal, setShowFinishOrderModal] = useState(false);
  const order = props.order;
  console.log(order._id);
  function genCard() {
    switch (order.orderStatus) {
      case 'NEW':
      case 'NOT-PAID':
        return (
          <>
            <div className='py-2'>
              <Button
                variant='info'
                onClick={() => {
                  console.log('essa');
                  setModal(true);
                  setShowFinishOrderModal(true);
                }}>
                Opłać
              </Button>
            </div>
          </>
        );
        break;
      case 'PAID':
        return (
          <>
            <Card.Text>
              <p>
                Login <strong>{order.login}</strong>
              </p>
              <p>
                hasło <strong>{order.password}</strong>
              </p>
            </Card.Text>
            <small>
              pozostało dni: <strong>{order.title}</strong>
            </small>
            <ProgressBar animated now={order.days_left} />
            <div className='py-2'>
              <Button variant='success' className='m-2'>
                Przedłuż
              </Button>
              <Button variant='danger' className='m-2'>
                Mam problem
              </Button>
            </div>
          </>
        );
        break;
      case 'SEND':
        return (
          <>
            <Card.Text>
              <p>
                Login <strong>{order.login}</strong>
              </p>
              <p>
                hasło <strong>{order.password}</strong>
              </p>
            </Card.Text>
            <small>
              pozostało dni: <strong>{order.title}</strong>
            </small>
            <ProgressBar animated now={order.days_left} />
            <div className='py-2'>
              <Button variant='success' className='m-2'>
                Przedłuż
              </Button>
              <Button variant='danger' className='m-2'>
                Mam problem
              </Button>
            </div>
          </>
        );
        break;
    }
  }
  console.log(props.order);
  return (
    <Card style={{ width: '100%' }}>
      <Card.Header>{order._id}</Card.Header>
      <Card.Body>
        {genCard()}
        {modal ? (
          <FinishOrderModal
            show={ShowFinishOrderModal}
            handleClose={() => setShowFinishOrderModal(false)}
            orderId={order._id}
          />
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}
