import { useState, useRef } from "react";
import "../App.css";

const Test = () => {
  const [number, setNumber] = useState();
  const [secNumber, setSecNumber] = useState();
  const [thirdNumber, setThirdNumber] = useState();
  const [forthNumber, setFothNumber] = useState();
  //   const [counter, setCounter] = useState(0);
  const ref = useRef();
  const ref2 = useRef()
  

  //   const click = () => {
  //     console.log(ref.current);
  //   };

  const handleInput = (e) => {
    if (e.target.value.length === 5) {
      return ref.current.focus();
    }
    setNumber(e.target.value);
  };

  const handleSecInput = (e) => {
    if (e.target.value.length === 5) {
      return ref2.current.focus();
    }
    setSecNumber(e.target.value);
  };

//   const handleThInput = (e) => {
//     if (e.target.value.length === 5) {
//       return ref.current.focus();
//     }
//     setThirdNumber(e.target.value);
//   };

  return (
    <div className="m-4 ">
      {/* <input
        value={number}
        onChange={handleInput}
        type="number"
        maxlength="4"
        className="w-[5rem] mr-4 "
      />
      <input
        value={secNumber}
        onChange={handleSecInput}
        ref={ref}
        type="number"
        maxLength="4"
        className="w-[5rem] mr-4"
      />
      <input
        value={thirdNumber}
        ref={ref2}
        type="number"
        maxLength="4"
        className="w-[5rem] mr-4"
      /> */}
    </div>
  );
};

export default Test;
