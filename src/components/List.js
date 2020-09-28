import React, { useEffect, useContext, useState } from "react";
import { saveAs } from "file-saver";
import Alert from "@material-ui/lab/Alert";
import { getFiles, getPdf } from "../Api/AuthApi";
import { globalContext } from "../context/globalContext";
import "../css/List.css";
const List = () => {
  const {
    globalState: { token },
  } = useContext(globalContext);

  const [allFiles, setAllFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  useEffect(() => {
    if (token)
      getFiles(token)
        .then((res) => {
          console.log(res);
          setAllFiles(res.files);
        })
        .catch((err) => {
          console.log(err);
          setMessage("Could not get any files");
          setMessageType("error");
        });
  }, [token]);

  const handleClick = (fileid, name) => {
    console.log(fileid);
    getPdf(token, { id: fileid })
      .then((res) => {
        console.log(res);
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, name);
        setMessage("Downloaded file");
        setMessageType("success");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Download failed");
        setMessageType("error");
      });
  };
  return (
    <div>
      <ul>
        {allFiles &&
          allFiles.map((file) => {
            return (
              <li className="file-item">
                <div className="margin-auto">Name : {file.fileName}</div>
                <div className="margin-auto">Username : {file.User.email}</div>
                <button
                  className="download"
                  onClick={(e) => handleClick(file.id, file.fileName)}
                >
                  Download
                </button>
              </li>
            );
          })}
      </ul>
      {message && (
        <Alert severity={messageType} className="message">
          {message}!
        </Alert>
      )}
    </div>
  );
};

export default List;
