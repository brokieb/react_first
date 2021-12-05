import { pkg, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";

export default function Home(props) {
  const [range, setRange] = useState([]);

  useEffect(() => {
    props.setTitle("[A] - Statystyki");
  }, [props]);

  function RangeGen() {
    let render = <></>;

    range.forEach((item, k) => {
      range.push(
        <tr key={k}>
          <td>{item}</td>
          <td>{item}</td>
          <td>{item}2</td>
          <td>{item}2</td>
        </tr>
      );
    });
    return render;
  }

  return (
    <>
      <h2>STATS XD</h2>
      <div>
        <Form.Range
          onChange={(e) => {
            setRange(e.target.value);
          }}
        />
      </div>
      <br />
      <div>
        <button
          onClick={() => {
            setRange((old) => {
              return [...old, "asd"];
            });
          }}
        >
          GEN
        </button>
        <button
          onClick={() => {
            setRange([]);
          }}
        >
          RESET
        </button>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <td>asd</td>
              <td>asd</td>
              <td>asd</td>
              <td>asd</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>asd</td>
              <td>asd</td>
              <td>asd</td>
              <td>asd</td>
            </tr>
            <AnimatePresence>
              <RangeGen />
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div></div>
      <motion.h2 animate={{ fontSize: 50, color: "#ff2292", x: 50, y: 100 }}>
        TETET
      </motion.h2>
    </>
  );
}
