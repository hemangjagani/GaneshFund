import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { MonthPicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePickerCustom } from "./AccountStyled";
import moment from "moment";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataTable = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [userData, setUserData] = useState([]);

  const paidSuccessfully = (name) => toast.success(`${name} Paid!`);
  const unPaidSuccessfully = (name) => toast.success(`${name} UnPaid!`);
  const AddedError = (msg) => toast.error(msg);

  useEffect(() => {
    const getData = async () => {
      const dataRef = doc(
        db,
        "management",
        `${moment(new Date()).format("MM")}-${moment(new Date()).format(
          "yyyy"
        )}`
      );
      const docSnap = await getDoc(dataRef);
      const d = [];
      if (docSnap.exists()) {
        setUserData(docSnap.data()?.data);
      }
    };
    getData();
  }, []);

  const handleDateChange = async (date) => {
    const dataRef = doc(
      db,
      "management",
      `${moment(date).format("MM")}-${moment(date).format("yyyy")}`
    );
    const docSnap = await getDoc(dataRef);
    if (docSnap.exists()) {
      const data = docSnap.data().data || [];
      setUserData(data);
    } else {
      setUserData([]);
    }
    setSelectedDate(date);
  };

  const paidHandler = async (id, name) => {
    try {
      const tempUserData = [...userData];
      const getSelectedIndex = tempUserData.findIndex((data) => data.id === id);
      tempUserData[getSelectedIndex] = {
        ...tempUserData[getSelectedIndex],
        status: true,
      };
      await setDoc(
        doc(
          db,
          "management",
          `${moment(selectedDate).format("MM")}-${moment(selectedDate).format(
            "yyyy"
          )}`
        ),
        {
          data: [...tempUserData],
        },
        { merge: true }
      );
      paidSuccessfully(name);
    } catch (e) {
      AddedError(e);
    }
  };

  const unPaidHandler = async (id, name) => {
    try {
      const tempUserData = [...userData];
      const getSelectedIndex = tempUserData.findIndex((data) => data.id === id);
      tempUserData[getSelectedIndex] = {
        ...tempUserData[getSelectedIndex],
        status: false,
      };
      await setDoc(
        doc(
          db,
          "management",
          `${moment(selectedDate).format("MM")}-${moment(selectedDate).format(
            "yyyy"
          )}`
        ),
        {
          data: [...tempUserData],
        },
        { merge: true }
      );
      unPaidSuccessfully(name);
    } catch (e) {
      AddedError(e);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(
      doc(
        db,
        "management",
        `${moment(selectedDate).format("MM")}-${moment(selectedDate).format(
          "yyyy"
        )}`
      ),
      (doc) => {
        setUserData(doc.data()?.data);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
        align: "center",
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
        align: "center",
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: true,
        sort: true,
        align: "center",
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
        align: "center",
        customBodyRender: (value, tableMeta, updateValue) => {
          return value || "Not Available";
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        align: "center",
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            <p className="text-green-600">Paid</p>
          ) : (
            <p className="text-red-600">Pending</p>
          );
        },
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: true,
        align: "center",
      },
    },
    {
      name: "Actions",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Button
                variant="outlined"
                color="success"
                sx={{ mr: 2 }}
                disabled={tableMeta?.rowData[5]}
                onClick={() =>
                  paidHandler(
                    tableMeta?.rowData[0],
                    tableMeta?.rowData[1] + " " + tableMeta?.rowData[2]
                  )
                }
              >
                Pay
              </Button>
              <Button
                variant="outlined"
                color="success"
                disabled={!tableMeta?.rowData[5]}
                onClick={() =>
                  unPaidHandler(
                    tableMeta?.rowData[0],
                    tableMeta?.rowData[1] + " " + tableMeta?.rowData[2]
                  )
                }
              >
                UnPaid
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    selectableRows: false,
    responsive: "scroll",
  };

  return (
    <div className="mt-5 mx-3">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          variant="inline"
          openTo="year"
          views={["year", "month"]}
          label="Year and Month"
          helperText="Start from year selection"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <MobileDatePickerCustom {...params} />}
        />
      </LocalizationProvider>
      <MUIDataTable
        title={"Status List"}
        data={userData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTable;
