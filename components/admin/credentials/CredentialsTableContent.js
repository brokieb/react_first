import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTable } from 'react-table';
import {
  faLock,
  faUnlock,
  faFolderOpen,
  faCalendarPlus,
  faUser,
  faCoffee,
} from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import CredentialsDetailsModal from './CredentialsDetailsModal';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import ToggleCredentialsActive from './ToggleCredentialsActive';

export default function CredentialsTableContent(props) {
  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([{}]);
  const [buttonsStatus, setbuttonsStatus] = useState([]);
  const [showCredentialsDetailsModal, setShowCredentialsDetailsModal] =
    useState(false);
  const [InitialShowModal, setInitialShowModal] = useState(false);
  const [ModalCredentialsId, setModalCredentialsId] = useState(false);

  const handleCloseCredentialsDetailsModal = () => {
    console.log('chowam element');
  };
  const handleShowCredentialsDetailsModal = () =>
    setShowCredentialsDetailsModal(true);

  useEffect(() => {
    console.log(buttonsStatus, 'to zmienione');
  }, [buttonsStatus]);

  useEffect(() => {
    function getData() {
      axios.get('http://localhost:3000/api/getCredentials').then((ans) => {
        ans.data.forEach((arg, index) => {
          setbuttonsStatus((oldArray) => [...oldArray, arg.active]);

          console.log(buttonsStatus, 'actual state here - undefined');

          arg['buttons'] = (
            <div className='d-flex justify-content-around'>
              {/* TUTAJ CHCĘ SPRAWDZIĆ STATUS Z buttonsStatus[index] ale `undefined`  */}

              <Button
                className={
                  buttonsStatus[index]
                    ? 'btn btn-sm btn-success'
                    : 'btn btn-sm btn-danger'
                }
                onClick={() => LockStatus()}>
                <FontAwesomeIcon icon={faLock} />
              </Button>

              {/* ============== */}
              {}
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
        setData(ans.data);
        setLoadingData(false);
      });
    }
    if (loadingData) {
      getData();
    }
  }, []);
  const columns = React.useMemo(
    () => [
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
    ],
    []
  );
  const readyData = React.useMemo(() => data, [buttonsStatus]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      {loadingData ? (
        <p>Ładowanie tabeli...</p>
      ) : (
        <Table striped bordered hover size='sm' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: cell.column.className,
                        })}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
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
