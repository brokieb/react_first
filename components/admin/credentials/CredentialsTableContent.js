import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTable } from 'react-table';
import {
  faLock,
  faUnlock,
  faFolderOpen,
  faCalendarPlus,
  faUser,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import CredentialsDetailsModal from './CredentialsDetailsModal';
import { Button, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ToggleCredentialsActive from './ToggleCredentialsActive';

export default function CredentialsTableContent(props) {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);
  const [showCredentialsDetailsModal, setShowCredentialsDetailsModal] =
    useState(false);
  const [InitialShowModal, setInitialShowModal] = useState(false);
  const [ModalCredentialsId, setModalCredentialsId] = useState(false);

  const handleShowCredentialsDetailsModal = () =>
    setShowCredentialsDetailsModal(true);

  function getData() {
    axios.get('http://localhost:3000/api/getCredentials').then((ans) => {
      ans.data.forEach((arg, index) => {
        arg['buttons'] = (
          <div className='d-flex justify-content-around'>
            <ToggleCredentialsActive arg={arg} index={index} />
            <Button
              className='btn btn-sm btn-primary'
              onClick={function () {
                if (!InitialShowModal) {
                  setInitialShowModal(true);
                }
                setModalCredentialsId(arg._id);
                handleShowCredentialsDetailsModal();
              }}>
              <FontAwesomeIcon icon={faFolderOpen} />
            </Button>
            <Button className='btn btn-sm btn-secondary'>
              <FontAwesomeIcon icon={faCalendarPlus} />
            </Button>
          </div>
        );

        arg['users'] = (
          <div className='d-flex justify-content-around align-items-center'>
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={farUser} />
            <FontAwesomeIcon icon={farUser} />
            <FontAwesomeIcon icon={farUser} />
          </div>
        );
      });
      setLoadingData(false);
      setData(ans.data);
    });
  }

  useEffect(() => {
    console.log('UGA BUGA');
    getData();
  }, []);

  const columns = [
    {
      Header: 'Email',
      accessor: 'email', // accessor is the "key" in the data
    },
    {
      Header: 'Hasło',
      accessor: 'password',
    },
    {
      Header: 'Aktywne do',
      accessor: 'expiredIn',
    },
    {
      Header: 'Komentarz',
      accessor: 'comment',
    },
    {
      Header: 'uzytkownicy',
      accessor: 'users',
    },
    {
      Header: 'Komentarz',
      accessor: 'buttons',
    },
  ];

  return (
    <>
      {loadingData ? (
        <p>Ładowanie tabeli...</p>
      ) : (
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              {columns.map((headerGroup, headerIndex) => (
                <td key={headerIndex}>{headerGroup.Header}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((rows, rowIndex) => {
              let rowItem = [];
              columns.forEach((item, cellIndex) => {
                rowItem.push(<td key={cellIndex}>{rows[item.accessor]}</td>);
              });
              return <tr key={rowIndex}>{rowItem}</tr>;
            })}
          </tbody>
        </Table>
      )}
      {InitialShowModal ? (
        <CredentialsDetailsModal
          show={showCredentialsDetailsModal}
          handleClose={() => {
            setShowCredentialsDetailsModal(false);
          }}
          credId={ModalCredentialsId}></CredentialsDetailsModal>
      ) : (
        <></>
      )}
    </>
  );
}
