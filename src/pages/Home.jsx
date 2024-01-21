import React from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Container className="bg-hero-image bg-cover bg-bottom md:min-h-[40rem] xl:min-h-[50rem] flex flex-col rounded-b-[200px]">
        <Header inside={true} />
        <div className="h-full flex flex-col justify-center flex-grow">
          <p className="text-md mb-3">Best Quality Plants</p>
          <Heading level={1} className="text-7xl mb-8">
            Cash On Delivery
          </Heading>
          <p className="text-base mb-4">
            Flat shipping charges @299 Rs All Over Pakistan
          </p>
          <button className="btn btn-primary rounded-full w-fit">
            Scroll to Explore your favorite catagories
          </button>
        </div>
      </Container>
      <Container>
        <div className="flex flex-wrap justify-between px-10 py-6">
          {[
            {
              icon: "fa-rotate",
              first: "100% Satisfaction",
              second: "Friendly & Reliable Service",
            },
            {
              icon: "fa-box",
              first: "Fast Shipping",
              second: "Only takes 3 working days",
            },
            {
              icon: "fa-spa",
              first: "Vast Collection of Plants",
              second: "Any plants for your space",
            },
          ].map((elem, index) => (
            <div className="flex items-center gap-x-4">
              <div className="text-[#75C32C] text-2xl bg-[#d0d8d8] rounded-full p-2 flex justify-center items-center">
                <i class={`fa-solid ${elem.icon}`}></i>
              </div>
              <div className="flex flex-col">
                <p className="text-lg mb-2">{elem.first}</p>
                <p className="text-sm text-neutral-500">{elem.second}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
