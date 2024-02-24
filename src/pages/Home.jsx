import Heading from "../components/Heading";
import Container from "../components/Container";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import staticData from "../staticData";
import CollectionCard from "../components/CollectionCard";

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
      {/* Services Section */}
      <Container>
        <div className="flex flex-wrap justify-between px-10 py-6">
          {staticData.services.map((elem, index) => (
            <div key={index} className="flex items-center gap-x-4">
              <div className="text-[#75C32C] text-2xl bg-[#d0d8d8] rounded-full p-2 flex justify-center items-center">
                <i className={`fa-solid ${elem.icon}`}></i>
              </div>
              <div className="flex flex-col">
                <p className="text-lg mb-2">{elem.first}</p>
                <p className="text-sm text-neutral-500">{elem.second}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      {/* Collection Section */}
      <Container className="flex flex-col items-center">
        <Heading level={1} className="mb-8 text-4xl">
          Our Collection
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticData.collections.map((elem, index) => (
            <CollectionCard key={index} data={elem} />
          ))}
        </div>
      </Container>
      {/* Featured Section */}
      <Container className="flex flex-col items-center">
        <div className="mb-8 mt-12 text-center">
          <Heading level={1} className="text-4xl">
            Featured Plants
          </Heading>
          <p>Some of our most liked plants are listed Here 🙂</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticData.plants.map((elem, index) => (
            <ProductCard key={index} data={elem} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
