import React from 'react';
import Header from '../components/Shared/Header/Header';
import { Outlet } from "react-router-dom";
import Footer from '../components/Shared/Footer/Footer';

const Main = () => {
  return (
    <div>
      <Header></Header>
      <div style={{ minHeight: "70vh" }} className="container my-5">
        <Outlet lassName="container"></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;