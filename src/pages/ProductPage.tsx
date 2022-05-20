//*| Hooks and Libraries
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//*| Components
//import StoreLayout from "../layout/StoreLayout";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productSlug } = useParams();

  interface IProduct {
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

  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    axios
      .post("/product/slug", {
        slug: productSlug,
      })
      .then((res) => {
        //console.log(res);
        setProduct({
          id: res.data.data.product_info.id,
          name: res.data.data.product_info.name,
          price: res.data.data.product_info.price,
          category: res.data.data.product_info.category_name,
          description: res.data.data.product_info.description,
          image: {
            name: res.data.data.product_images[0].name,
            type: res.data.data.product_images[0].type,
          },
        });
      })
      .catch(() => {
        navigate("/404");
      });
  }, [navigate, productSlug]);
  return (
    <div className="product-page">
      <div className="product-page-img-container">
        <img
          className="product-page-img"
          src={`https://storage.end-games.nexthub.io/uploads/images/products/${product?.image.name}.${product?.image.type}`}
          alt=""
        />
        <div className="product-page-description-container">
          <div className="product-page-description-wrapper">
            <h2 className="product-page-product-name">{product?.name}</h2>
            <h4 className="product-page-product-description">
              {/* The Last of Us Part II is a 2020 action-adventure game developed
                by Naughty Dog and published by Sony Interactive Entertainment
                for the PlayStation 4. */}
              {product?.description}
            </h4>
          </div>
        </div>
      </div>
      <div className="product-page-categories">
        <h4 className="product-page-category second-font">
          {product?.category}
        </h4>
      </div>
      <h2 className="product-page-price second-font">
        <svg
          className="auth-input-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        {product?.price}€
      </h2>
      <div className="product-page-button-container">
        <button className="product-page-button second-font">Buy</button>
      </div>
    </div>
  );
};

export default ProductPage;
