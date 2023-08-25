import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import VowelItalicizer from "./vowelItalicizer";

const Contact = ({ setCursorType }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      company: "",
      email: "",
      message: "",
    },

    onSubmit: async (values) => {
      try {
        const info = {
          fullName: values.fullName,
          company: values.company,
          email: values.email,
          message: values.message,
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}mail/contactForm`,
          info,
        );
        const message = response.data.msg;
        toast.success(message);
      } catch (error) {
        if (error.response) {
          const errorMsg = error.response.data.msg;
          toast.error(errorMsg);
        }
      }
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Please fill out your name"),
      company: Yup.string().required("Please fill out your company's name"),
      email: Yup.string()
        .email()
        .required("Please fill out your Email Address"),
      message: Yup.string().required(
        "Please fill out your message to send to us",
      ),
    }),
  });
  return (
    <section
      id="contact"
      className="relative z-10 flex snap-end flex-col items-center gap-[10vh] bg-white px-6 py-28 md:gap-16  md:px-14 "
    >
      <div className="flex w-full items-center gap-4 ">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[6vw] font-semibold  uppercase text-text md:text-5xl"
        >
          <VowelItalicizer text={"Contact us"} />
        </motion.h1>
        <div className="h-[1px] flex-1 bg-primary"></div>
      </div>{" "}
      <div className="grid w-full place-items-center gap-y-12 sm:grid-cols-2">
        <form
          onSubmit={formik.handleSubmit}
          onMouseEnter={() => {
            setCursorType("form");
          }}
          onMouseLeave={() => {
            setCursorType(null);
          }}
          className="flex w-full max-w-xl flex-col gap-y-4"
        >
          <section className="flex w-full flex-col gap-x-4 gap-y-2 sm:grid md:grid-cols-2">
            <div className="flex h-full w-full flex-col">
              <label className="text-sm font-semibold" htmlFor="fullName">
                FullName
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`rounded-md border-2 px-2 py-2 text-lg transition-all duration-200 focus:ring-0 ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "border-red-500 focus:outline-red-500"
                    : "focus:border-primary focus:outline-primary"
                }`}
                onChange={formik.handleChange}
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
              />
              <p className="h-2 px-2 text-xs font-medium text-red-600 sm:h-4">
                {formik.touched.fullName && formik.errors.fullName
                  ? formik.errors.fullName
                  : ""}
              </p>
            </div>
            <div className="flex h-full w-full flex-col">
              <label className="text-sm font-semibold" htmlFor="company">
                Company Name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className={`rounded-md border-2 px-2 py-2 text-lg transition-all duration-200 focus:ring-0 ${
                  formik.touched.company && formik.errors.company
                    ? "border-red-500 focus:outline-red-500"
                    : "focus:border-primary focus:outline-primary"
                }`}
                onChange={formik.handleChange}
                value={formik.values.company}
                onBlur={formik.handleBlur}
              />
              <p className="h-2 px-2 text-xs font-medium text-red-600 sm:h-4">
                {formik.touched.company && formik.errors.company
                  ? formik.errors.company
                  : ""}
              </p>
            </div>
            <div className="flex h-full w-full flex-col md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className={`rounded-md border-2 px-2 py-2 text-lg transition-all duration-200 focus:ring-0 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:outline-red-500"
                    : "focus:border-primary focus:outline-primary"
                }`}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              <p className="h-2 px-2 text-xs font-medium text-red-600 sm:h-4">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </p>
            </div>
            <div className="flex h-full w-full flex-col md:col-span-2">
              <label className="text-sm font-semibold" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                type="text"
                className={`h-32 rounded-md border-2 px-2 py-2 text-lg transition-all duration-200 focus:ring-0 ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500 focus:outline-red-500"
                    : "focus:border-primary focus:outline-primary"
                }`}
                onChange={formik.handleChange}
                value={formik.values.message}
                onBlur={formik.handleBlur}
              />
              <p className="h-2 px-2 text-xs font-medium text-red-600 sm:h-4">
                {formik.touched.message && formik.errors.message
                  ? formik.errors.message
                  : ""}
              </p>
            </div>
          </section>
          <div className="flex w-full items-center justify-end">
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className={`rounded bg-primary px-8 py-1.5 text-white ${
                formik.isSubmitting && "bg-opacity-40"
              } `}
            >
              Submit
            </button>
          </div>
        </form>
        <article className="flex h-full w-full flex-col items-end justify-end gap-y-4">
          <div className="flex flex-col items-end ">
            <h2 className="text-2xl font-semibold text-primary">
              Email Address
            </h2>
            <p className="text-lg italic ">mafworkarchitects@yahoo.com</p>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="text-2xl font-semibold text-primary">
              Phone Number
            </h2>
            <p className="text-lg italic ">08033318458</p>
            <p className="text-lg italic ">09055964332</p>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="text-2xl font-semibold text-primary">
              Office Address
            </h2>
            <p className="flex flex-col items-end text-lg italic">
              <span>Metrofix Shopping Complex,</span>
              <span>290 Sagamu Rd.,</span>
              <span>Odoguyan, Ikd, LG.</span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Contact;
