//*| Hooks and Libraries
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

//*| Components
import ModalOne from "../../components/modals/ModalOne";
import CheckIcon from "../../assets/icons/check.svg";
import LoadingOverlay from "../../components/LoadingOverlay";

const AdminUploadProduct = () => {
  const navigate = useNavigate();

  interface IState {
    name: string;
    price: number;
    publisher: string;
    description: string;
    category: number;
    base64Img: string;
    imgType: string;
  }

  interface ICategories {
    ID: number;
    name: string;
  }

  const [state, setState] = useState<IState>({
    name: "",
    price: 0,
    publisher: "",
    description: "",
    category: 1,
    base64Img: "",
    imgType: "",
  });

  const handleSetStateValue = (name: string, value: string) => {
    if (name === "price" && value.length > 5) {
      return;
    }
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [categories, setCategories] = useState<ICategories[]>();
  const [showError, setShowError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgSelectState, setImgSelectState] = useState(false);

  useEffect(() => {
    axios.get("/category/list").then((res) => {
      if (res.data.response.code !== 202) {
        return;
      }
      setCategories(res.data.data.categories);
    });
  }, []);

  const imageHandler = (e: any) => {
    const img = e.target.files[0];
    if (img === undefined || img === null) {
      return;
    }
    const imgType = img.type.split("/").pop();
    handleSetStateValue("imgType", imgType);
    getBase64(img);
  };
  const onLoad = (fileString: any) => {
    handleSetStateValue("base64Img", fileString);
    setImgSelectState(true);
  };
  const getBase64 = (img: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const handleUploadRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (state.price < 1) {
      return;
    }
    //const floatPrice = parseFloat(state.price.toString());
    const auth_token = localStorage.getItem("auth_token");
    const config = {
      headers: { Authorization: `Bearer ${auth_token}` },
    };
    const data = {
      name: state.name,
      description: state.description,
      category: state.category,
      price: state.price,
      images: [
        {
          data: state.base64Img,
          type: state.imgType,
        },
      ],
    };
    await axios
      .post("/product/create", data, config)
      .then(() => {
        setIsModalOpen(true);
      })
      .catch(() => {
        setShowError(true);
      });
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      {isLoading && <LoadingOverlay />}
      <form
        className="auth admin-upload"
        onSubmit={(e) => handleUploadRequest(e)}
      >
        <h2 className="auth-title">Upload product</h2>
        <div className="auth-link-container">
          <h3 className="auth-link" onClick={() => navigate("/")}>
            <svg
              className="auth-link-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
            Go back
          </h3>
        </div>
        <div className="auth-input-wrapper">
          {showError && (
            <div className="auth-error">
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
              <h3 className="auth-error-message">
                An error occurred. Try again.
              </h3>
            </div>
          )}
          <h2 className="auth-input-name">Name</h2>
          <div
            className={`auth-input-container ${
              state.name !== "" ? "active" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="auth-input-icon"
              fill="#EC2C45"
            >
              <path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z" />
            </svg>
            <input
              className="auth-input"
              type="name"
              required
              value={state.name}
              onChange={(e) => {
                handleSetStateValue("name", e.target.value);
              }}
            />
          </div>
          <h2 className="auth-input-name">Price</h2>
          <div
            className={`auth-input-container ${
              state.price !== 0 ? "active" : ""
            }`}
          >
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
            <input
              className="auth-input"
              type="number"
              required
              maxLength={4}
              value={state.price}
              onChange={(e) => {
                handleSetStateValue("price", e.target.value);
              }}
            />
          </div>
          <h2 className="auth-input-name">Publisher</h2>
          <div
            className={`auth-input-container ${
              state.publisher !== "" ? "active" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="auth-input-icon"
              fill="#EC2C45"
            >
              <path d="M256 48C256 21.49 277.5 0 304 0H592C618.5 0 640 21.49 640 48V464C640 490.5 618.5 512 592 512H381.3C383 506.1 384 501.6 384 496V253.3C402.6 246.7 416 228.9 416 208V176C416 149.5 394.5 128 368 128H256V48zM571.3 347.3C577.6 341.1 577.6 330.9 571.3 324.7L507.3 260.7C501.1 254.4 490.9 254.4 484.7 260.7L420.7 324.7C414.4 330.9 414.4 341.1 420.7 347.3C426.9 353.6 437.1 353.6 443.3 347.3L480 310.6V432C480 440.8 487.2 448 496 448C504.8 448 512 440.8 512 432V310.6L548.7 347.3C554.9 353.6 565.1 353.6 571.3 347.3H571.3zM0 176C0 167.2 7.164 160 16 160H368C376.8 160 384 167.2 384 176V208C384 216.8 376.8 224 368 224H16C7.164 224 0 216.8 0 208V176zM352 480C352 497.7 337.7 512 320 512H64C46.33 512 32 497.7 32 480V256H352V480zM144 320C135.2 320 128 327.2 128 336C128 344.8 135.2 352 144 352H240C248.8 352 256 344.8 256 336C256 327.2 248.8 320 240 320H144z" />
            </svg>
            <input
              className="auth-input"
              type="text"
              required
              value={state.publisher}
              onChange={(e) => {
                handleSetStateValue("publisher", e.target.value);
              }}
            />
          </div>
          <h2 className="auth-input-name">Category</h2>
          <div className="auth-input-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="auth-input-icon-smaller"
              fill="currentColor"
            >
              <path d="M7.994 153.5c1.326 0 2.687 .3508 3.975 1.119L208 271.5v223.8c0 9.741-7.656 16.71-16.01 16.71c-2.688 0-5.449-.7212-8.05-2.303l-152.2-92.47C12.13 405.3 0 383.3 0 359.5v-197.7C0 156.1 3.817 153.5 7.994 153.5zM426.2 117.2c0 2.825-1.352 5.647-4.051 7.248L224 242.6L25.88 124.4C23.19 122.8 21.85 119.1 21.85 117.2c0-2.8 1.32-5.603 3.965-7.221l165.1-100.9C201.7 3.023 212.9 0 224 0s22.27 3.023 32.22 9.07l165.1 100.9C424.8 111.6 426.2 114.4 426.2 117.2zM440 153.5C444.2 153.5 448 156.1 448 161.8v197.7c0 23.75-12.12 45.75-31.78 57.69l-152.2 92.5C261.5 511.3 258.7 512 256 512C247.7 512 240 505 240 495.3V271.5l196-116.9C437.3 153.8 438.7 153.5 440 153.5z" />
            </svg>
            <select
              className="auth-input-select"
              value={state.category}
              onChange={(e) => {
                handleSetStateValue("category", e.target.value);
              }}
            >
              {categories?.map((category) => {
                return (
                  <option
                    className="auth-input-select-option"
                    value={category.ID}
                    key={category.ID}
                  >
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <h2 className="auth-input-name">Image</h2>
          <div className="auth-input-container">
            <label className="auth-input-file-custom">
              <input
                className="auth-input-file"
                type="file"
                id="image-input"
                accept="image/jpeg, image/png, image/jpg, image/webp"
                required
                onChange={(e) => {
                  imageHandler(e);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="auth-input-icon-smaller"
                fill="currentColor"
              >
                <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" />
              </svg>
              Select Image
            </label>
          </div>
          <div className="signup-regex-container">
            <p className={`signup-regex ${imgSelectState ? "active" : ""}`}>
              {imgSelectState ? "Image selected" : "No image selected"}
            </p>
          </div>
          <h2 className="auth-input-name">Description</h2>
          <div
            className={`auth-input-container ${
              state.publisher !== "" ? "active" : ""
            }`}
          >
            <textarea
              className="auth-input auth-input-textarea"
              required
              value={state.description}
              onChange={(e) => {
                handleSetStateValue("description", e.target.value);
              }}
            />
          </div>
          <button className="auth-submit-button">
            <svg
              className="auth-submit-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
            UPLOAD
          </button>
        </div>
        <AnimatePresence>
          {isModalOpen && (
            <ModalOne
              handleCloseModal={handleCloseModal}
              icon={CheckIcon}
              title="Product added!"
              paragraph={`${state.name} has been added to the database`}
            />
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default AdminUploadProduct;
