import React from "react";
import { useState } from "react";
import "./design.css"

function Form({ onAddData }) {
  const [formData, setFormData] = useState({ title: "", contents: ""});

  const handleInput = (event) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch("/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => { 
            onAddData(formData)
          }
        )
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <div className="m-3">
            <label className="form-label form-text">Title:</label>
            <input
              className="form-control"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInput}
            />
          </div>
          <div className="m-3">
            <label className="form-label form-text">Content:</label>
            <textarea
              className="form-control"
              name="contents"
              id="contents"
              value={formData.contents}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center form-text">
          <button className="button-t" type="submit">
            Enter
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
