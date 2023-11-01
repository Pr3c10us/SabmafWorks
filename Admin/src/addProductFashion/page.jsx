import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AddImages from "./components/addImages";
import Loading from "../loading";

const AddProduct = () => {
  const navigate = useNavigate();
  const [fileList, setFileLIst] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [services, setServices] = React.useState([]);

  const listOfServices = [
    { name: "Construction", value: "Construction" },
    { name: "Interior Design", value: "Interior Design" },
    { name: "Designs and Modelling", value: "Designs and Modelling" },
    { name: "Estate Management", value: "Estate Management" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      if (services.length === 0) {
        toast.error("Please Select at least one service");
        setSubmitting(false);
        return;
      }
      if (fileList.length === 0) {
        toast.error("Please Upload atleast one image");
        setSubmitting(false);
        return;
      }
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      services.forEach((service) => {
        data.append("services", service);
      });
      fileList.forEach((file) => {
        data.append("images", file);
      });

      const token = localStorage.getItem("token");

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}projects/`, data, {
          headers: {
            authorization: `JWT ${token}`,
          },
        })
        .then((res) => {
          toast.success("Product Added Successfully");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.response.data.msg || "Something went wrong");
          setSubmitting(false);
        });
    },

    validationSchema: Yup.object({
      name: Yup.string().required("name is Required"),
      description: Yup.string().required("description is Required"),
    }),
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="space-y-12 font-medium">
      <h1 className="text-lg font-semibold">Add Project</h1>
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
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            Image Upload & Preview
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <AddImages fileList={fileList} setFileLIst={setFileLIst} />
          </section>
        </section>
        <section className="flex w-full items-end justify-end gap-4">
          <button
            type="button"
            disabled={formik.isSubmitting}
            onClick={() => navigate("/")}
            className={`rounded bg-red-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            cancel
          </button>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`rounded bg-green-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            Add Product
          </button>
        </section>
      </form>
    </main>
  );
};

export default AddProduct;
