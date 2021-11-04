import axios from 'axios';
import { increment } from '../../../features/counter/counterSlice';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import CartItemsTable from '../../../components/user/CartItemsTable';
import FinishOrderModal from '../../../components/order/finishOrderModal';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([{}]);
  const [sumPrice, setSumPrice] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(<></>);
  useEffect(() => {
    function getData() {
      axios
        .get('/api/getCartItems', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.status == '200') {
            let data = res.data.cart.items;
            let sum = 0;
            data.forEach((arg, index) => {
              sum += arg.productId.price * arg.quantity;
              arg['value'] = arg.productId.price * arg.quantity;
            });
            setSumPrice(sum);
            setData(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (loading) {
      getData();
    }
  }, []);

  function handleCreateOrder() {
    axios
      .post('/api/postNewOrder', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res.data);
        setData([]);
        setShowCreateOrderModal(<FinishOrderModal orderId={res.data._id} />);
        //zamówienie utworzone, otwieramy modal do realizacji zamówienia
        console.log(res);
      })
      .catch((err) => {
        console.log('niE ZDIAŁA', err);
      });
  }
  return (
    <div className='w-50 d-flex flex-column gap-2'>
      {loading ? (
        <p>Ładowanie danych..</p>
      ) : data.length == 0 ? (
        <p>Twój koszyk jest pusty :)</p>
      ) : (
        <>
          <CartItemsTable data={data} />
          <div>
            Pełna wartość zamówienia : <strong>{sumPrice}</strong>
          </div>
          <div>
            Po dokonaniu płatności, dane do logowania zostaną automatycznie
            wysłane na adres email podany przy rejestracji lub jeżeli taki adres
            nie został podany twoje aktualne subskrypcje będą widoczne w
            zakładce <Link href='/user/orders'>ZAMÓWIENIA</Link> na twoim
            profilu.
          </div>
          <div>
            <div className='mb-3'>
              <Form.Check
                checked={acceptTerms}
                type='checkbox'
                id='accept-terms'
                label={
                  acceptTerms
                    ? 'Regulamin strony został zaakceptowany :)'
                    : 'Akceptuję regulamin strony, i chcę realizować zamówienie'
                }
                onChange={() => {
                  if (acceptTerms) {
                    setAcceptTerms(false);
                  } else {
                    setAcceptTerms(true);
                  }
                }}
              />
            </div>
          </div>
          <div>
            {acceptTerms ? (
              <Button
                variant='success'
                onClick={() => {
                  handleCreateOrder();
                }}>
                Finalizuj zamówienie a
              </Button>
            ) : (
              <Button disabled='disabled' variant='success'>
                Finalizuj zamówienie
              </Button>
            )}
          </div>
        </>
      )}
      {showCreateOrderModal}
    </div>
  );
}
