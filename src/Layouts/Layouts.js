import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../Redux/features/stateSlice";
import Backdrop from "../Components/Backdrop";
import Bar from "./Bar/Bar";
import Header from "./Header/Header";
import Modal from "../Components/Modal";
import PokedexList from "./PokedexList/PokedexList";
import "./Layouts.css";

const Layouts = () => {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.state.isModal);

  return (
    <div className="layouts">
      <Header />
      <PokedexList />
      <Bar />
      {isModal && (
        <React.Fragment>
          <Modal />
          <Backdrop onClick={() => dispatch(closeModal())} />
        </React.Fragment>
      )}
    </div>
  );
};

export default Layouts;
