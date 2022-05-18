//*| Hooks and Libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//*| Components
import Product from "../components/Product";

const Homepage = () => {
  const navigate = useNavigate();
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
      const productsResponse = await axios.get("/product/list");
      //console.log(productsResponse);
      setProducts(productsResponse.data.data.products);
      const heroIndex = Math.floor(
        Math.random() * productsResponse.data.data.products.length
      );
      setHeroIndex(heroIndex);
      const heroProductResponse = await axios.post("/product/slug", {
        slug: productsResponse.data.data.products[heroIndex].slug,
      });
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
      const categoriesResponse = await axios.get("/category/list");
      setCategories(categoriesResponse.data.data.categories.slice(0, 4));
    };
    handleRequest();
  }, []);

  return (
    <div>
      <header
        className="store-header"
        // onClick={() => {
        //   console.log(products, categories);
        // }}
      >
        {heroProduct && (
          <img
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
        {products?.slice(0, 8).map((product) => {
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
              <h2 className="store-section-title">{category.name}</h2>
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
                        image={`https://storage.end-games.nexthub.io/uploads/images/products/${product.image_name}.${product.image_type}`}
                      />
                    );
                  })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Homepage;