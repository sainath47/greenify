import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { StyledDataGrid } from "../../data/StyledDataGrid ";
import { CustomPagination } from "../../data/StyledDataGrid ";

const City = ({ state }) => {
  const ids = state.map((o) => o.stateName);
  let cites = state.filter(
    ({ stateName }, index) => !ids.includes(stateName, index + 1)
  );
  const [area, setArea] = useState({
    stateName: state[0].stateName,
    cityName: "",
  });
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      width: 60,
      hideable: false,
      valueGetter: (params) => params.row.id,
    },
    {
      field: "cityName",
      headerName: "City",
      width: 150,
    },
    {
      field: "stateName",
      headerName: "State",
      width: 150,
    },
    // {
    //   field: "country",
    //   headerName: "Country",
    //   width: 150,
    // },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <p
            className="edit-button"
            style={{
              background: params.row.status == "Active" ? "#6ad699" : "red",
            }}
          >
            {params.row.status}
          </p>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 10px",
            }}
          >
            <div className="edit-button">
              <TbEdit />
              Edit
            </div>
            <div
              className="edit-button"
              style={{
                backgroundColor: "#ff5269",
              }}
            >
              {" "}
              <RiDeleteBin6Line /> Delete
            </div>
          </div>
        );
      },
    },
  ];

  const city = state.map((o) => o.cityName);
  const data = state.filter(
    ({ cityName, stateName }, index) =>
      !city.includes(cityName, index + 1) &&
      !city.includes(stateName, index + 1)
  );
  const rows = data.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  const handelSubmit = async () => {
    try {
      const url = "http://localhost:8000/area/add-area";

      await axios.post(url, {
        stateName: area.stateName,
        cityName: area.cityName,
      });
      toggleModal();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div style={{ paddingBottom: 50 }}>
      <div
        style={{ background: "#fff", width: "95%", border: "1px solid silver" }}
      >
        <p className="summary">City Summary</p>
        <div style={{ display: "flex" }}>
          <div className="total">
            <h2 style={{ padding: "20px 0" }}>2</h2>
            <p style={{ padding: "20px 0" }}>Total City</p>
          </div>
          <div className="total">
            <h2 style={{ padding: "20px 0" }}>1</h2>
            <p style={{ padding: "20px 0" }}>Active City</p>
          </div>
          <div className="total">
            <h2 style={{ padding: "20px 0" }}>1</h2>
            <p style={{ padding: "20px 0" }}>Inactive City</p>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "15px",
          width: "95%",
          background: "#fff",
          border: "1px solid silver",
          padding: "0 20px 20px",
        }}
      >
        <p style={{ padding: "20px 0", borderBottom: "1px solid silver" }}>
          States
        </p>
        <div
          style={{
            padding: "20px 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div className="button" onClick={toggleModal}>
            Add City
          </div>
        </div>
        <div style={{ height: 350, width: "100%" }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            sx={{}}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            components={{
              Pagination: CustomPagination,
            }}
          />
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Add City</h4>

              <RxCross2 onClick={toggleModal} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className="input-style"
                style={{ width: 250, marginRight: 20 }}
              >
                <p>Country</p>
                <select
                  onChange={(e) =>
                    setArea({ ...area, country: e.target.value })
                  }
                >
                  {cites.map((item, index) => (
                    <option key={index} value={item.country}>
                      {item.country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-style" style={{ width: 250 }}>
                <p>State</p>
                <select
                  onChange={(e) =>
                    setArea({ ...area, stateName: e.target.value })
                  }
                >
                  {cites.map((item, index) => (
                    <option value={item.stateName} key={index}>
                      {item.stateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-style" style={{ width: 250 }}>
              <p>City</p>
              <input
                onChange={(e) => setArea({ ...area, cityName: e.target.value })}
              />
            </div>
            <div
              style={{ display: "flex", paddingTop: 10, alignItems: "center" }}
            >
              <div
                style={{
                  padding: "5px 10px",
                  background: "#ff4a00",
                  color: "#fff",
                  marginRight: 5,
                  cursor: "pointer",
                }}
                onClick={handelSubmit}
              >
                Save
              </div>
              <div
                style={{
                  padding: "5px 10px",
                  background: "#ff4a00",
                  color: "#fff",
                  marginRight: 5,
                }}
              >
                Exit
              </div>
              OR
              <div
                style={{
                  padding: "5px 10px",
                  background: "#ff4a00",
                  color: "#fff",
                }}
              >
                Add City
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default City;
