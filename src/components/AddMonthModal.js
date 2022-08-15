import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePickerCustom } from "./AccountStyled";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMonthModal = ({ setIsAddMonthModalVisible }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
  };

  const monthAddedSuccessfully = (month, year) =>
    toast.success(`${month} in ${year} Added Successfully!`);
  const AddedError = (msg) => toast.error(msg);

  const addMonthHandler = async () => {
    setIsSubmitting(true);
    console.log(
      "selectedDate",
      `${moment(selectedDate).format("MM")}-${moment(selectedDate).format(
        "yyyy"
      )}`
    );
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
    });
    try {
      const yearRef = await setDoc(
        doc(
          db,
          "management",
          `${moment(selectedDate).format("MM")}-${moment(selectedDate).format(
            "yyyy"
          )}`
        ),
        {
          data: [...data],
        },
        { merge: true }
      );
      monthAddedSuccessfully(
        moment(selectedDate).format("MMMM"),
        moment(selectedDate).format("yyyy")
      );
    } catch (e) {
      AddedError(e);
      console.log("error", e);
    }
    setIsSubmitting(false);
  };
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
                onClick={() => setIsAddMonthModalVisible(false)}
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
              <div role="alert">
                <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Danger
                </div>
                <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>Selected month's all user's data will be unpaid!</p>
                </div>
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  variant="inline"
                  openTo="year"
                  views={["year", "month"]}
                  label="Year and Month"
                  helperText="Start from year selection"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <MobileDatePickerCustom {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>

            <div className="flex p-4 items-center pt-4 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <LoadingButton
                disabled={!selectedDate}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                variant="contained"
                color="success"
                data-modal-toggle="small-modal"
                type="submit"
                loading={isSubmitting}
                onClick={addMonthHandler}
              >
                Add
              </LoadingButton>
              <LoadingButton
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  setIsAddMonthModalVisible(false);
                }}
                variant="outlined"
                color="success"
              >
                close
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMonthModal;
