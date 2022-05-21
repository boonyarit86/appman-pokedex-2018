import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../Redux/features/stateSlice";
import "./Bar.css";

const Bar = React.memo(() => {
  const dispatch = useDispatch();

  return (
    <section className="bar">
      <div className="btn-add" onClick={() => dispatch(openModal())}>
        +
      </div>
    </section>
  );
});

export default Bar;
