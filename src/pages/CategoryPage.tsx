//*| Hooks and Libraries
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//*| Components
import Product from "../components/Product";

const CategoryPage = () => {
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

  const { categoryId } = useParams();
  const [products, setProducts] = useState<IProduct[] | undefined>();

  useEffect(() => {
    const handleRequest = async () => {
      /*
        Recupero della lista di prodotti
      */
      const productsResponse = await axios.get(
        "http://localhost:8000/product/list"
      );
      setProducts(
        productsResponse.data.data.products.filter((product: any) => {
          return product.category === categoryId;
        })
      );
    };
    handleRequest();
  }, [categoryId]);

  return (
    <div className="category-page">
      <h2 className="store-section-title">
        {products && products[0].category_name} games:
      </h2>
      <div className="products-container">
        {products?.map((product) => {
          return (
            <Product
              key={product.slug}
              name={product.name}
              price={product.price}
              slug={product.slug}
              image={`https://storage.endgames.nexthub.io/uploads/images/products/${product.image_name}.${product.image_type}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
