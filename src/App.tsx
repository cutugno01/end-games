//*| Hooks and Libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";

//*| Styles
import "./styles/globals.scss";

//*| Components
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import ProductPage from "./pages/ProductPage";
import AdminUploadProduct from "./pages/admin/AdminUploadProduct";
import NotFoundPage from "./pages/NotFoundPage";
import StoreLayout from "./layout/StoreLayout";
import Profile from "./pages/Profile";
import CategoryPage from "./pages/CategoryPage";
import UserGames from "./pages/UserGames";

function App() {
  //Auth: -1 = not authenticated; 0 = authenticated as user; 1 = authenticated as admin
  // About security concerns: if some user is somehow able to change these params,
  // they still wouldn't be able to access important informations or make requests, since all the requests need a token
  interface IUser {
    username: string;
    email: string;
    role: number;
  }

  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    role: -1,
  });

  useEffect(() => {
    const handleRequest = async () => {
      const auth_token = localStorage.getItem("auth_token");
      if (!auth_token) {
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${auth_token}` },
      };
      await axios
        .get("http://localhost:8000/user/fetch", config)
        .then((res) => {
          console.log(res);
          
          if (res.data.response.code !== 202) {
            return;
          }
          setUser({
            username: res.data.data.user_data.username,
            email: res.data.data.user_data.email,
            role: parseInt(res.data.data.user_data.role),
          });
        });
    };
    handleRequest();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<StoreLayout user={user} children={<Homepage />} />}
        />
        <Route
          path="search"
          element={<StoreLayout user={user} children={<Search />} />}
        />
        <Route
          path="product/:productSlug"
          element={
            <StoreLayout
              user={user}
              children={<ProductPage userRole={user.role} />}
            />
          }
        />
        <Route
          path="category/:categoryId"
          element={<StoreLayout user={user} children={<CategoryPage />} />}
        />
        {user.role !== -1 && (
          <>
            <Route path="profile" element={<Profile user={user} />} />
            <Route
              path="user-games"
              element={<StoreLayout user={user} children={<UserGames />} />}
            />
          </>
        )}
        {user.role === -1 && (
          <>
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ForgotPassword />} />
          </>
        )}
        {user.role === 1 && (
          // <Route path="/admin-dashboard" element={<Homepage auth={auth} />} />
          <Route
            path="/admin-upload-product"
            element={<AdminUploadProduct />}
          />
        )}
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
