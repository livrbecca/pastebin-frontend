import React, { useState } from "react";
import { FinalDataProps } from "../interface";

const PasteForm = () => {
  const [finalData, setFinalData] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { title, text };
    const response = await fetch("http://localhost:4000/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const linkData: FinalDataProps = await response.json();
    setFinalData(linkData.data);

  };
  return (
    <div>
      <h1>Pastebin!</h1>
      <form className="d-flex mt-5" onSubmit={(e) => handleSubmitForm(e)}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className="btn btn-success">Link me!</button>
      </form>
      <div className="link">
        <p>Your data:</p>
        <a target="blank" href={finalData}>
          {finalData}
        </a>
      </div>
    </div>
  );
};

export default PasteForm;
