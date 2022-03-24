import "./styles.css";
import React, { useEffect, useState } from "react";
import { users } from "./userData";
import { v4 as uuidv4 } from "uuid";
// HAndle unique id for each user

function UserModal({ data, toggle }) {
  function handleClick() {
    toggle((modal) => !modal);
  }
  console.log(data);
  return (
    <div className={"modal_container"}>
      <div className={"close_container"}>
        <button className={"close"} onClick={handleClick}>
          X
        </button>
      </div>

      <div>
        <p> name: {data.name}</p>
        <p> location: {data.location}</p>
      </div>
    </div>
  );
}

function TableComponent({ data, setUserData }) {
  const [selectedRow, setSelectedRow] = useState();
  const [modal, setModal] = useState(false);

  function handleClick(row_id) {
    setSelectedRow(row_id);
    setModal(!modal);
  }

  function handleDelete(e, id) {
    let newObj = Object.keys(data)
      .filter((key) => key !== id)
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    setUserData(newObj);
    e.preventDefault();
  }

  return (
    <>
      <table className={"table_container"}>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
        {Object.keys(data).map((id, index) => {
          return (
            <tr>
              <td
                onClick={() => {
                  handleClick(id);
                }}
              >
                {data[id].name}
              </td>
              <td
                onClick={() => {
                  handleClick(id);
                }}
              >
                {data[id].location}
              </td>
              <td onClick={(e) => handleDelete(e, id)}></td>
            </tr>
          );
        })}
      </table>
      {modal && <UserModal data={data[selectedRow]} toggle={setModal} />}
    </>
  );
}

function FormComponent({ setUserData, dataLength }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }
  function handleSubmit(e) {
    setUserData((data) => {
      return { ...data, [uuidv4()]: { name, location } };
    });
    setName("");
    setLocation("");
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={handleNameChange}
        placeholder="Enter Name"
        required
      />
      <input
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter Location"
        required
      />
      <button type="submit"> Add </button>
    </form>
  );
}

export default function App() {
  const [userData, setUserData] = useState(users);
  return (
    <div className="App">
      <FormComponent setUserData={setUserData} />
      <TableComponent data={userData} setUserData={setUserData} />
    </div>
  );
}
