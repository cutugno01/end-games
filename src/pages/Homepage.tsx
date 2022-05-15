//*| Components
//import StoreLayout from "../layout/StoreLayout";
import Product from "../components/Product";

const Homepage = () => {
  const heroProduct = {
    img: require("../assets/img/the-last-of-us.webp"),
    name: "THE LAST OF US: PART II",
    description: `The Last of Us Part II is a 2020 action-adventure game developed by Naughty 
      Dog and published by Sony Interactive Entertainment for the PlayStation 4.`,
  };

  const products = [
    {
      name: "MIDDLE EARTH: SHADOW OF MORDOR",
      price: 45.0,
      slug: "middle-earth-shadow-of-mordor",
      image: require("../assets/img/shadow-of-mordor.webp"),
    },
    {
      name: "THE LAST OF US: PART II",
      price: 70.0,
      slug: "the-last-of-us-part-2",
      image: require("../assets/img/the-last-of-us.webp"),
    },
    {
      name: "THE LAST OF US: PART I",
      price: 70.0,
      slug: "the-last-of-us",
      image: require("../assets/img/thelast.png"),
    },
    {
      name: "Crash bandicoot 2",
      price: 20.59,
      slug: "crash-bandicoot-2",
      image: require("../assets/img/the-last-of-us.webp"),
    },
  ];

  return (
    <div>
      <header className="store-header">
        <img className="store-header-img" src={heroProduct.img} alt="img" />
        <div className="store-header-description-container">
          <div className="store-header-description-wrapper">
            <h2 className="store-header-product-name">{heroProduct.name}</h2>
            <h4 className="store-header-product-description">
              {heroProduct.description}
            </h4>
          </div>
        </div>
      </header>
      <h2 className="store-section-title">New Releases</h2>
      <div className="products-container">
        {products.map((product) => {
          return (
            <Product
              key={product.slug}
              name={product.name}
              price={product.price}
              slug={product.slug}
              image={product.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
