import React from "react";

const ProductsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="products-container">{children}</div>;
};

export default ProductsContainer;
