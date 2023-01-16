import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//*| Components
import Product from "../components/Product";
import LoadingOverlay from "../components/LoadingOverlay";

const UserGames = () => {
  const navigate = useNavigate();

  /*
    Interfaccia del prodotto
  */
  interface IProduct {
    product_id: number;
    product_name: string;
    purchase_date: string;
    image_name: string;
    image_type: string;
  }
  
  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRequest = async () => {
      setIsLoading(true);
      const auth_token = localStorage.getItem("auth_token");
      if (!auth_token) {
        navigate("/signin");
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${auth_token}` },
      };
      const res = await axios.get(
        "http://localhost:8000/user/library/list",
        config
      );
      setProducts(res.data.data.products);
      setIsLoading(false);
    };
    handleRequest();
  }, []);
  return (
    <div className="user-games">
      {isLoading && <LoadingOverlay />}
      <h2 className="store-section-title">Your games:</h2>
      <div className="products-container">
        {products?.map((product) => {
          return (
            <Product
              key={product.product_id}
              name={product.product_name}
              image={`https://storage.endgames.nexthub.io/uploads/images/products/${product.image_name}.${product.image_type}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserGames;
