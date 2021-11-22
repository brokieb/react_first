import React, { createContext, useState, useMemo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AddCredentialsForm from 'app/components/elements/forms/admin/credentials/addCredentialsForm';
import CredentialsTable from 'app/components/elements/tables/credentials/credentialsTableContent';
import CredentialsDetailsModal from 'app/components/elements/modals/admin/credentials/credentialsDetailsModal';
import axiosInstance from 'app/lib/axiosInstance';
import Loading from 'app/components/layout/loading';

export const CredentialsDataContext = createContext({
	credentialsData: [],
	setCredentialsData: () => {},
});

export const ModalShow = createContext({
	modalShow: false,
	setModalShow: () => {},
});
export const ModalDataIndex = createContext({
	modalIndex: null,
	setModalIndex: () => {},
});

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [reload, setReload] = useState(false);

	const [credentialsData, setCredentialsData] = useState([]);
	const data = useMemo(() => ({ credentialsData, setCredentialsData }), [credentialsData]);

	const [modalShow, setModalShow] = useState(false);
	const modalData = useMemo(() => ({ modalShow, setModalShow }), [modalShow]);

	const [modalIndex, setModalIndex] = useState(null);
	const modalDataIndex = useMemo(() => ({ modalIndex, setModalIndex }), [modalIndex]);

	useEffect(() => {
		axiosInstance.get('/api/creds/getCredentials').then((ans) => {
			setCredentialsData(ans.data);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (reload) {
			RenderModal;
			setReload(false);
			console.log('GENERATE');
		}
	}, [reload]);

	return (
		<div className="d-flex justify-content-between w-100 flex-column">
			<div>
				<AddCredentialsForm />
			</div>
			<CredentialsDataContext.Provider value={data}>
				<ModalShow.Provider value={modalData}>
					<ModalDataIndex.Provider value={modalDataIndex}>
						{loading ? <Loading /> : <CredentialsTable items={credentialsData} />}
						<CredentialsDetailsModal
							show={modalShow}
							handleClose={() => {
								setModalShow(false);
							}}
							onExited={() => {
								console.log('USUWAM DANE!!');
								setModalIndex(null);
							}}
							credId={modalIndex}
							onReload={setReload}
						></CredentialsDetailsModal>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />@{modalIndex}#
					</ModalDataIndex.Provider>
				</ModalShow.Provider>
			</CredentialsDataContext.Provider>
		</div>
	);
}
