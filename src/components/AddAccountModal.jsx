import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePickerCustom } from "./AccountStyled";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAccountModal = ({ setIsAddPersonModalVisible }) => {
  const validationSearch = Yup.object().shape({
    firstName: Yup.string().required("*Required"),
    lastName: Yup.string().required("*Required"),
    amount: Yup.number().required("*Required"),
    description: Yup.string().notRequired(),
    status: Yup.boolean().notRequired(),
    date: Yup.string().required("*Required"),
  });

  const AddedSuccessfully = () => toast.success("Person Added!");
  const AddedInfo = () => toast.info("First Please Add Month And Year!");
  const AddedError = (msg) => toast.error(msg);

  return (
    <>
      <div
        id="small-modal"
        tabindex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add Person
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="small-modal"
                onClick={() => setIsAddPersonModalVisible(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div
              className="p-6 space-y-6 overflow-auto"
              style={{ maxHeight: "71vh" }}
            >
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  amount: "",
                  description: "",
                  status: false,
                  date: new Date(),
                }}
                validationSchema={validationSearch}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  try {
                    const monthsRef = doc(
                      db,
                      "management",
                      `${moment(values.date).format("MM")}-${moment(
                        values.date
                      ).format("yyyy")}`
                    );
                    const docSnap = await getDoc(monthsRef);
                    if (docSnap.exists() && docSnap.data()) {
                      console.log("data------->", docSnap.data());
                      const docRef = await addDoc(collection(db, "users"), {
                        ...values,
                        date: moment(values.date).format("DD-MM-yyyy"),
                      });
                      try {
                        console.log("docSnap.data()", docSnap.data());
                        const oldData = docSnap.data()?.data;
                        const yearRef = await updateDoc(
                          doc(
                            db,
                            "management",
                            `${moment(values.date).format("MM")}-${moment(
                              values.date
                            ).format("yyyy")}`
                          ),
                          {
                            data: [
                              ...oldData,
                              {
                                ...values,
                                status: values.status,
                                id: docRef.id,
                                date: moment(values.date).format("DD-MM-yyyy"),
                              },
                            ],
                          },
                          { merge: true }
                        );
                      } catch (e) {
                        console.log("error", e);
                      }
                      AddedSuccessfully();
                    } else {
                      AddedInfo();
                    }
                  } catch (e) {
                    AddedError(e);
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  setFieldTouched,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label
                          for="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          First name
                        </label>
                        <input
                          name="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          type="text"
                          id="first_name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John"
                        />
                        {errors.firstName && touched.firstName && (
                          <p
                            id="standard_error_help"
                            class="text-xs text-red-600 dark:text-red-400"
                          >
                            <span class="font-medium">{errors.firstName}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          for="last_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Last name
                        </label>
                        <input
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          type="text"
                          id="last_name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Doe"
                        />
                        {errors.lastName && touched.lastName && (
                          <p
                            id="standard_error_help"
                            class="text-xs text-red-600 dark:text-red-400"
                          >
                            <span class="font-medium">{errors.lastName}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          for="amount"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Amount
                        </label>
                        <input
                          name="amount"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.amount}
                          type="number"
                          id="amount"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Amount"
                        />
                        {errors.Amount && touched.Amount && (
                          <p
                            id="standard_error_help"
                            class="text-xs text-red-600 dark:text-red-400"
                          >
                            <span class="font-medium">{errors.Amount}</span>
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          for="description"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Description"
                        ></textarea>
                      </div>
                      <div>
                        <label
                          for="green-toggle"
                          className="inline-flex relative items-center mr-5 cursor-pointer "
                        >
                          <input
                            type="checkbox"
                            name="status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                            id="green-toggle"
                            className="sr-only peer"
                          />
                          <div className="w-11 border-2 border-white h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Paid
                          </span>
                        </label>
                      </div>
                      <div>
                        <label
                          for="first_name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Date
                        </label>
                        <div className="relative">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              name="date"
                              onChange={(value) => {
                                console.log("value", value);
                                setFieldValue("date", value, true);
                              }}
                              onBlur={() =>
                                setFieldTouched("value", true, true)
                              }
                              value={values.date}
                              renderInput={(params) => (
                                <MobileDatePickerCustom {...params} />
                              )}
                            />
                          </LocalizationProvider>
                          {errors.date && (
                            <p
                              id="standard_error_help"
                              class="text-xs text-red-600 dark:text-red-400"
                            >
                              <span class="font-medium">{errors.date}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center pt-4 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                      <LoadingButton
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        variant="contained"
                        color="success"
                        data-modal-toggle="small-modal"
                        type="submit"
                        loading={isSubmitting}
                      >
                        Add
                      </LoadingButton>
                      <LoadingButton
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                          setIsAddPersonModalVisible(false);
                        }}
                        variant="outlined"
                        color="success"
                      >
                        close
                      </LoadingButton>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAccountModal;
