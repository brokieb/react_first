import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTable } from 'react-table';
import { useSession, signIn } from 'next-auth/react';
import { useCookies } from 'react-cookie';
import {
	faLock,
	faUnlock,
	faFolderOpen,
	faCalendarPlus,
	faUser,
	faCoffee,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import dayjs from 'dayjs';
import Table from 'app/components/elements/tables/tableInstance/table';
import ProductDiscountPrice from 'app/components/common/store/ProductDiscountPrice';
export default function CredentialsTableContent({ items }) {
	const [loadingData, setLoadingData] = useState(true);
	const [cartData, setCartData] = useState(items);
	const [tableData, setTableData] = useState([]);
	useEffect(() => {
		let render = [];
		cartData.forEach((item, index) => {
			if (item.productId.discount && item.productId.discount.discountUntil > dayjs().format()) {
				
				item.productId.price = <ProductDiscountPrice price={item.productId.price } discount={item.productId.discount.discountValue} /> ;
				
			}
			render[index] = {
				title: item.productId.title,
				quantity: item.quantity,
				price: item.productId.price,
				value: item.productId.price * item.quantity,
			};
		});
		setTableData(render);
		setLoadingData(false);
	}, [items]);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Produkt',
				accessor: 'title', // accessor is the "key" in the data
			},
			{
				Header: 'ilość miesięcy',
				accessor: 'quantity',
			},
			{
				Header: 'cena',
				accessor: 'price',
			},
			{
				Header: 'Wartość',
				accessor: 'value',
			},
		],
		[],
	);

	return (
		<>{loadingData ? <p>Ładowanie tabeli...</p> : <Table columns={columns} data={tableData} />}</>
	);
}
