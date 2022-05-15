import { useNavigate } from "react-router-dom";

const Product = ({
  name,
  price,
  slug,
  image,
}: {
  name: string;
  price: number;
  slug: string;
  image: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="product" onClick={() => navigate(`/product/${slug}`)}>
      <img className="product-img" src={image} alt="img" />
      <div className="product-info">
        <h2
          className={`product-info-price second-font ${
            price.toString().includes(".") ? "" : "bigger"
          }`}
        >
          {price}
          <u>€</u>
        </h2>
        <div className="product-info-name-container">
          <h2 className="product-info-name second-font">{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default Product;
