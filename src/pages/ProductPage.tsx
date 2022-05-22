//*| Hooks and Libraries
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

//*| Components
import LoadingOverlay from "../components/LoadingOverlay";
import ModalOne from "../components/modals/ModalOne";
import CheckIcon from "../assets/icons/check.svg";

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
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      await axios
        .post("/product/slug", {
          slug: productSlug,
        })
        .then((res) => {
          setProduct({
            id: res.data.data.product_info.ID,
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
      setIsLoading(false);
    };
    handleRequest();
  }, [navigate, productSlug]);

  const handleBuyRequest = async () => {
    setIsLoading(true);
    const auth_token = localStorage.getItem("auth_token");
    if (!auth_token) {
      navigate("/signin");
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${auth_token}` },
    };
    const data = {
      product_id: product?.id,
    };

    await axios
      .post("/product/purchase", data, config)
      .then(() => {
        setIsModalOpen(true);
      })
      .catch(() => {
        setShowError(true);
      });
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-page">
      {isLoading && <LoadingOverlay />}
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
      {showError && (
        <div className="product-page-error-container">
          <svg
            className="auth-input-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="auth-error-message">
            You have bought this item already
          </h2>
        </div>
      )}
      <div className="product-page-button-container">
        <button
          className="product-page-button second-font"
          onClick={handleBuyRequest}
        >
          Buy
        </button>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <ModalOne
            handleCloseModal={handleCloseModal}
            icon={CheckIcon}
            title="Product purchased!"
            paragraph="You can now see the game in your library"
            navigateLink={{ name: "Library", link: "game-library" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
