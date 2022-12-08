import React, { useState, useRef } from "react";
import styled from 'styled-components';

const ImageInput = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-items :center;
    font-size: inherit;
    cursor: pointer;
    background: ${(props) =>props.uploadedFileName ? '#ffcd00' : 'white'}; ;
	border: 1px solid #ffcd00;
    font-weight: bold;
    /* width: ${(props) =>props.uploadedFileName ? '20vh' : '15vh'}; */
    min-width : 10vh;
    height: 5vh;
    color: ${(props) =>props.uploadedFileName ? 'white' : '#ffcd00'};
    cursor: pointer;
    border-radius: 5px;
  }

`


function UploadButton() {
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const inputRef = useRef(null);
    const handleUpload = () => {
        inputRef.current?.click();
      };
      const handleDisplayFileDetails = () => {
        inputRef.current?.files &&
          setUploadedFileName(inputRef.current.files[0].name);
      };

    return (
      <ImageInput uploadedFileName={uploadedFileName}>
      <input
        ref={inputRef}
        onChange={handleDisplayFileDetails}
        className="d-none"
        type="file"
      />
      <button
        onClick={handleUpload}
        // className={`btn btn-outline-${
        //   uploadedFileName ? "success" : "primary"
        // }`}
      >
        {uploadedFileName ? uploadedFileName : "사진선택"}
      </button>
      </ImageInput>
    );
}
export default UploadButton;