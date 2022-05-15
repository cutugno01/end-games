import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const StoreLayout = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { username: string; email: string; role: number };
}) => {
  return (
    <div className="store-layout">
      <div>
        <Navbar user={user} />
        <div className="store-layout-children-container">
          <div className="store-layout-children">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StoreLayout;
