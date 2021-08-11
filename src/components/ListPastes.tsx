import React, { useState, useEffect } from "react";
import { TextToLinkProps } from "../interface";
import Comments from "./Comments";

const ListPastes = () => {
  const [textToLink, setTextToLink] = useState<TextToLinkProps[]>([]);

  const allTextToPaste = async () => {
    const response = await fetch("http://localhost:4000/text");
    const jsonData: TextToLinkProps[] = await response.json();
    setTextToLink(jsonData);
  };

  useEffect(() => {
    allTextToPaste();
  }, []);

  return (
    <div className="App">
      <h3>HISTORY</h3>
      {textToLink.map((element) => (
        <div key={element.paste_id}>
          <div className="paste">
            <p>Title: {element.title}</p>
            <p>Text: {element.text}</p>
            <p>
              Link:{" "}
              <a
                target="blank"
                href={`http://localhost:4000/text/${element.paste_id}`}
              >
                http://localhost:4000/text/{element.paste_id}
              </a>
            </p>
            <p>
              Information:{" "}
              <a
                href={`http://localhost:4000/text/${element.paste_id}`}
                target="blank"
              >
                <button>Here</button>
              </a>
            </p>
            <Comments element={element} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPastes;
