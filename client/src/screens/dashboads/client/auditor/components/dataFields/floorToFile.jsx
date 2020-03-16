import React, { Fragment } from "react";
import { TextareaAutosize } from "@material-ui/core";

const UploadInvoiceDataFields = ({ onSubmit, onChange }) => {
  return (
    <Fragment>
      <TextareaAutosize
        rowsMin={5}
        required
        name="floorToFileDescription"
        onChange={onChange}
        placeholder="Enter the description of found asset..."
        style={{
          padding: "10px",
          backgroundColor: "#fff",
          borderColor: "#999999",
          borderRadius: "5px",
          outline: "none",
          resize: "none",
          width: "100%",
          fontSize: "16px"
        }}
      />
    </Fragment>
  );
};

export default UploadInvoiceDataFields;
