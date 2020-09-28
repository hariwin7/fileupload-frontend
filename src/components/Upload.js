import React, { useState, useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import { uploadFile } from "../Api/AuthApi";
import { globalContext } from "../context/globalContext";

import "../css/Upload.css";
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const {
    globalState: { token },
  } = useContext(globalContext);

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    if (!selectedFile) {
      setMessage("Choose a file before uploading");
      setMessageType("warning");
      return;
    }
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedFile);

    // Details of the uploaded file
    console.log(selectedFile, formData);

    // Request made to the backend api
    // Send formData object
    uploadFile(token, formData)
      .then((res) => {
        console.log(res);
        setMessage("Uploaded " + res.fileName);
        setMessageType("success");
      })
      .catch((err) => {
        setMessage("Upload failed");
        setMessageType("error");
      });
  };

  return (
    <div className="container">
      {message && (
        <Alert severity={messageType} className="message">
          {message}!
        </Alert>
      )}
      <h3 className="upload-head">Upload Your File</h3>
      <div className="upload-main">
        <input
          type="file"
          className="custom-file-input"
          onChange={onFileChange}
          // style={{ display: "none" }}
        />

        <button className="signup-button " onClick={onFileUpload}>
          Upload!
        </button>
      </div>
    </div>
  );
};

export default Upload;
