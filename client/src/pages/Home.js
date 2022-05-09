import React from 'react';
import {
  Announcements,
  Categories,
  Footer,
  Navbar,
  Newletter,
  Products,
  Slider,
} from '../components';

const Home = () => {
  return (
    <>
      <Announcements />
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newletter />
      <Footer />
    </>
  );
};

export default Home;
