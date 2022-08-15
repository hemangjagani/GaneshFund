import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAccountModal from "./AddAccountModal";
import MUIDataTable from "mui-datatables";
import DataTable from "./DataTable";
import AddMonthModal from "./AddMonthModal";
import { Alert, Collapse, IconButton } from "@mui/material";

const Account = () => {
  const { user, logout } = UserAuth();
  const [isAddPersonModalVisible, setIsAddPersonModalVisible] = useState(false);
  const [isAddMonthModalVisible, setIsAddMonthModalVisible] = useState(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isAddPersonModalVisible && (
        <AddAccountModal
          setIsAddPersonModalVisible={setIsAddPersonModalVisible}
        />
      )}
      {isAddMonthModalVisible && (
        <AddMonthModal setIsAddMonthModalVisible={setIsAddMonthModalVisible} />
      )}
      <div
        style={{
          filter:
            (isAddPersonModalVisible || isAddMonthModalVisible) &&
            "blur(0.8px)",
        }}
        onClick={() => console.log("red")}
      >
        <Header />
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Ganpati Bappa Moriya!
          </Alert>
        </Collapse>
        <div className="flex">
          <div
            onClick={() => setIsAddPersonModalVisible(true)}
            className="flex flex-auto justify-between p-6 max-w-sm mt-3 mx-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add Person
            </h5>
            <button className="font-normal text-gray-700 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div
            onClick={() => setIsAddMonthModalVisible(true)}
            className="flex flex-auto justify-between p-6 max-w-sm mt-3 mx-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add New Month
            </h5>
            <button className="font-normal text-gray-700 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <DataTable />
        <div className="max-w-[600px] mx-auto my-16 p-4">
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default Account;
