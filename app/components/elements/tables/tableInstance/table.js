import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  usePresence,
} from "framer-motion";
import Empty from "../../../../../app/components/layout/empty";
export default function TableRender({ columns, data }) {
  const [dataState, setDataState] = useState(true);
  const [isPresent, safeToRemove] = usePresence();
  const [timer, setTimer] = useState(() => {});

  // useEffect(() => {
  // 	!isPresent && setTimeout(safeToRemove, 1000);
  // }, [isPresent]);

  useEffect(() => {
    clearInterval(timer);
    const interval = setTimeout(() => {
      if (data.length == 0) {
        setDataState(false);
      } else {
        setDataState(true);
      }
    }, 1000);
    setTimer(interval);
  }, [data]);

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });
  return (
    <div className="position-relative  p-2" style={{ maxWidth: "95vw" }}>
      {dataState ? (
        <Table responsive="md" striped bordered size="sm">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  if (!column.hidden) {
                    return (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    );
                  }
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            <AnimatePresence>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <motion.tr
                    key={i}
                    {...row.getRowProps()}
                    exit={{ x: 1000 }}
                    transition={{ duration: 1 }}
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        if (!cell.column.hidden) {
                          return (
                            <td {...cell.getCellProps()}>
                              {
                                // Render the cell contents
                                cell.render("Cell")
                              }
                            </td>
                          );
                        }
                      })
                    }
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </Table>
      ) : (
        <Empty />
      )}
    </div>
  );
}
