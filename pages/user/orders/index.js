import OrderHistoryCard from '../../../components/user/OrderHistoryCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home(props) {
  const [readyData, setReadyData] = useState(false);
  const [loading, setLoading] = useState(true);
  async function getData() {
    const data = await axios.get('http://localhost:3000/api/getOrders', {
      params: {
        _id: null,
      },
    });
    console.log(data.data);
    setReadyData(
      data.data.map((item, index) => {
        return <OrderHistoryCard key={index} order={item}></OrderHistoryCard>;
      })
    );
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <>?</>
  ) : (
    <div className='w-50 d-flex flex-column gap-2'>{readyData}</div>
  );
}
