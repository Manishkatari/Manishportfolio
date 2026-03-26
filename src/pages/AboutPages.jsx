import React from "react";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Header from "../components/Header";
import About from "../components/About"
import ContactForm from "../components/ContactForm";

const AboutPages = () => {
  return (
    <> 
      <Header/>
      <section className="container-fluid secMar" >
        <Carousel />
      </section>
      <section className="container-fluid">
       <About/>
      </section>
      <section className="container-fluid">
        <ContactForm/>
      </section>
      <Footer/>
    </>
  );
};

export default AboutPages;
