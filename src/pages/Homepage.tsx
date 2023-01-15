//*| Hooks and Libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

//*| Components
import Product from "../components/Product";

const Homepage = () => {
  const navigate = useNavigate();

  /*
    Struttura del prodotto
  */
  interface IProduct {
    ID: number;
    category: string;
    category_name: string;
    name: string;
    price: number;
    description: string;
    slug: string;
    image_name: string;
    image_type: string;
  }

  /*
    L'hero è il prodotto principale che viene mostrato(grande, in alto)
  */
  interface IHeroProduct {
    name: string;
    price: number;
    description: string;
    category: string;
    id: number;
    image: {
      name: string;
      type: string;
    };
  }


  interface ICategory {
    name: string;
    ID: number;
  }

  const [products, setProducts] = useState<IProduct[] | undefined>();
  const [heroProduct, setHeroProduct] = useState<IHeroProduct | undefined>();
  const [heroIndex, setHeroIndex] = useState<number>();
  const [categories, setCategories] = useState<ICategory[] | undefined>();

  useEffect(() => {
    const handleRequest = async () => {
      /*
        Recupero della lista di prodotti
      */
      const productsResponse = await axios.get(
        "http://localhost:8000/product/list"
      );
      setProducts(productsResponse.data.data.products);

      /*
        Viene estratto casualmente un prodotto dalla lista,
        poi impostato come Hero
      */
      const heroIndex = Math.floor(
        Math.random() * productsResponse.data.data.products.length
      );
      setHeroIndex(heroIndex);

      /*
        Il prodotto principale(hero) necessita 
        della lettura delle informazioni(descrizione ecc)

      */
      const heroProductResponse = await axios.post(
        "http://localhost:8000/product/slug",
        {
          slug: productsResponse.data.data.products[heroIndex].slug,
        }
      );
      setHeroProduct({
        id: heroProductResponse.data.data.product_info.id,
        name: heroProductResponse.data.data.product_info.name,
        price: heroProductResponse.data.data.product_info.price,
        category: heroProductResponse.data.data.product_info.category_name,
        description: heroProductResponse.data.data.product_info.description,
        image: {
          name: heroProductResponse.data.data.product_images[0].name,
          type: heroProductResponse.data.data.product_images[0].type,
        },
      });
      const categoriesResponse = await axios.get(
        "localhost:8000/category/list"
      );
      setCategories(categoriesResponse.data.data.categories.slice(0, 5));
    };
    handleRequest();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="homepage"
      >
        <header className="store-header">
          {heroProduct && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="store-header-img"
              src={`https://storage.end-games.nexthub.io/uploads/images/products/${heroProduct?.image.name}.${heroProduct?.image.type}`}
              alt="img"
            />
          )}
          <div className="store-header-description-container">
            <div className="store-header-description-wrapper">
              <h2
                className="store-header-product-name"
                onClick={() =>
                  navigate(
                    `/product/${products![heroIndex ? heroIndex : 0].slug}`
                  )
                }
              >
                {heroProduct?.name}
              </h2>
              <div>
                <h4 className="product-page-category second-font">
                  {heroProduct?.category}
                </h4>
              </div>
              <h4 className="store-header-product-description">
                {heroProduct?.description}
              </h4>
            </div>
          </div>
        </header>
        <h2 className="store-section-title">New Releases</h2>
        <div className="products-container">
          {products
            ?.slice(products.length - 8, products.length)
            .reverse()
            .map((product) => {
              return (
                <Product
                  key={product.slug}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                  image={`https://storage.end-games.nexthub.io/uploads/images/products/${product.image_name}.${product.image_type}`}
                />
              );
            })}
        </div>

        {categories?.map((category) => {
          return (
            products?.some((product) => {
              return category.ID?.toString() === product.category;
            }) && (
              <div key={category.ID}>
                <div
                  className="store-category"
                  onClick={() => {
                    navigate(`/category/${category.ID}`);
                  }}
                >
                  <h2 className="store-section-title">
                    {category.name}
                    <u>see all</u>
                  </h2>
                </div>
                <div className="products-container">
                  {products
                    ?.filter((product) => {
                      return product.category === category.ID?.toString();
                    })
                    .slice(0, 4)
                    .map((product) => {
                      return (
                        <Product
                          key={product.slug + "1"}
                          name={product.name}
                          price={product.price}
                          slug={product.slug}
                          image={`http://localhost/storage/uploads/images/products/${product.image_name}.${product.image_type}`}
                        />
                      );
                    })}
                </div>
              </div>
            )
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default Homepage;
