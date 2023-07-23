import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import Settings from "../components/Setting";
import Container from "../components/Container";

const Home = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <SideBar />
        <Container />
      </div>
      <Footer />
      <Settings />
    </div>
  );
};

export default Home;
