import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useMemo,
} from "react";
// import { DIS } from 'app/components/elements/tables/tableInstance/table';

export const RowDetails = createContext({
  rowContext: {},
  setRowContext: () => {},
});

export default function tr({ row }) {
  const [rowContext, setRowContext] = useState({});
  const value = useMemo(() => ({ rowContext, setRowContext }), [rowContext]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    row.cells.map((el) => {
      const id = el.column.id;
      const val = el.value;
      const obj = {};
      obj[id] = { value: val };

      setRowContext((prevState) => ({
        ...prevState,
        [id]: val,
      }));
    });
    setLoading(false);
  }, []);

  return (
    <RowDetails.Provider value={value}>
      <tr {...row.getRowProps()}>
        {row.cells.map((cell, index) => {
          return loading ? (
            <td key={index}>?</td>
          ) : (
            <td key={index} {...cell.getCellProps()}>
              {cell.render(() => {
                return rowContext[cell.column.id];
              })}
            </td>
          );
        })}
      </tr>
    </RowDetails.Provider>
  );
}
