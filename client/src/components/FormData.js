import React from "react";
import { useState, useEffect } from "react";
import Form from "./Form.js";

export default function FormData() {
  const [backendData, setBackendData] = useState([]);

  const fetchData = () => {
    fetch("/notes")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.map(o => {
          o.new = false;
          return o;
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAdd = (newTask) => {
    newTask.new = true
    setBackendData([...backendData, newTask])
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {backendData.map((notes, i) => {
        let classCheck = notes.new  ? 'show' : null
        return (
          <>
            <div className={`d-flex card col-md-2 m-3 flex-column ${classCheck}`}>
              <ul className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="card-title text-break" key={`title-${i}`}>
                    {notes.title}
                  </h5>
                </div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    let index = backendData[i].id;
                    fetch("/", {
                      method: "DELETE",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify({ id: index }),
                    })
                      .then(() => {
                        setBackendData((prevState) =>
                          prevState.filter((item) => item.id !== index)
                        );
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                  className="btn close-btn rounded-circle position-absolute top-0 start-100 translate-middle "
                >
                  X
                </button>
                <p className="card-text" key={notes.contents}>
                  {notes.contents}
                </p>
              </ul>
            </div>
          </>
        );
      })}
      <Form onAddData={handleAdd}></Form>
    </>
  );
}
