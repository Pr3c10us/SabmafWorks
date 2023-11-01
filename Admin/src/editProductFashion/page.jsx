import React from "react";
import Logo from "../assets/homeLogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AddImages from "./components/addImages";
import Loading from "../loading";
import { FaTrash } from "react-icons/fa";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [imageDelete, setImageDelete] = React.useState("");
  const [productDetails, setProductDetails] = React.useState({});
  const [fileList, setFileLIst] = React.useState([]);
  const [images, setImages] = React.useState(productDetails.images || []);
  const [services, setServices] = React.useState([]);

  const listOfServices = [
    { name: "Construction", value: "Construction" },
    { name: "Interior Design", value: "Interior Design" },
    { name: "Designs and Modelling", value: "Designs and Modelling" },
    { name: "Estate Management", value: "Estate Management" },
  ];

  React.useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}projects/${
          location.pathname.split("/")[1]
        }`,
      );
      setProductDetails((prev) => ({ ...prev, ...res.data }));
      setImages(res.data.images);
      setServices(res.data.services);
      formik.setFieldValue("name", res.data.name);
      formik.setFieldValue("description", res.data.description);
      setLoading(false);
    };
    getProductDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: productDetails.name,
      description: productDetails.description,
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      const data = {
        name: values.name,
        description: values.description,
        services,
      };

      const token = localStorage.getItem("token");

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}projects/${
            location.pathname.split("/")[1]
          }`,
          data,
          {
            headers: {
              authorization: `JWT ${token}`,
            },
          },
        )
        .then((res) => {
          setProductDetails((prev) => ({ ...prev, ...res.data.project }));
          setImages(res.data.project.images);
          setServices(res.data.project.services);
          formik.setFieldValue("name", res.data.project.name);
          formik.setFieldValue("description", res.data.project.description);
          setSubmitting(false);
          toast.success("Edit Complete");
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setSubmitting(false);
        });
    },

    validationSchema: Yup.object({
      name: Yup.string().required("name is Required"),
      description: Yup.string().required("description is Required"),
    }),
  });

  const handleDeleteImage = async (imageName) => {
    if (images.length == 1) {
      toast.error("You can't delete the last image");
      return;
    }
    setImageDelete(imageName);
    try {
      const imageNames = [imageName];

      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}projects/${
          location.pathname.split("/")[1]
        }/image`,
        {
          data: { imageNames },
          headers: {
            authorization: `JWT ${token}`,
          },
        },
      );
      setImages((prev) => prev.filter((item) => item !== imageName));
      toast.success("Image Deleted Successfully");
      setImageDelete("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something went wrong");
    }
  };

  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}projects/${
          location.pathname.split("/")[1]
        }`,
        {
          headers: {
            authorization: `JWT ${token}`,
          },
        },
      );
      toast.success("Product Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="py-12 font-medium">
      <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="name">
            product Name
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <input
              type="text"
              id="name"
              name="name"
              {...formik.getFieldProps("name")}
              className=" w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
            />
            <div className="h-2">
              {formik.touched.name && formik.errors.name ? (
                <p className="text-xs capitalize text-red-500">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row">
          <label className="basis-[20%] capitalize" htmlFor="description">
            product details
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <textarea
              type="text"
              id="description"
              name="description"
              {...formik.getFieldProps("description")}
              className="min-h-[8rem] w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-3/4"
            />
            <div className="h-2">
              {formik.touched.description && formik.errors.description ? (
                <p className="text-xs capitalize text-red-500">
                  {formik.errors.description}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row">
          <label className="basis-[20%] capitalize" htmlFor="description">
            Project Service
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            {listOfServices.map((service) => {
              return (
                <div key={service.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={service.value}
                    name={service.value}
                    value={service.value}
                    checked={services.includes(service.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setServices([...services, service.value]);
                      } else {
                        setServices(
                          services.filter((item) => item !== service.value),
                        );
                      }
                    }}
                    className="h-4 w-4"
                  />
                  <label htmlFor={service.value}>{service.name}</label>
                </div>
              );
            })}
          </div>
        </section>
        <section className="flex w-full items-end justify-end gap-4">
          <button
            type="button"
            disabled={formik.isSubmitting}
            onClick={handleDeleteProduct}
            className={`rounded bg-red-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            Delete
          </button>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`rounded bg-green-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            Edit Details
          </button>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            Add more Images
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <AddImages
              fileList={fileList}
              setImages={setImages}
              images={images}
              id={location.pathname.split("/")[1]}
            />
          </section>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            Delete Product Images
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <div className="flex flex-wrap items-center gap-4">
              {images.map((file, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-2 `}
                  >
                    {imageDelete === file ? (
                      <div className="flex h-32 w-32 items-center justify-center border border-asisDark/20 bg-asisDark/20 object-cover">
                        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-t-asisDark"></div>
                      </div>
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_BLOB_URL}${file}`}
                        alt="product"
                        className="h-32 w-32 object-cover"
                      />
                    )}

                    <button
                      disabled={imageDelete == file}
                      type="button"
                      onClick={() => {
                        handleDeleteImage(file);
                      }}
                      className={`flex w-full items-center justify-center gap-1 rounded border border-asisDark/50 py-1 text-sm  ${
                        imageDelete == file && "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <FaTrash className="text-red-500" /> Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </form>
    </main>
  );
};

export default EditProduct;
