import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Blobupload.css'

export default function Blobupload() {
    const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
    const dateObj = new Date(selectedDate);
    const fileName = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}.pdf`;
    formData.append('fileName', fileName);
    console.log('File Name:', fileName);

    axios
      .post(`${process.env.REACT_APP_IPCONFIG}upload`, formData)
      .then((response) => {
        toast.success('File uploaded successfully.');
        console.log(response.data);
      })
      .catch((error) => {
        toast.error('Error uploading file.');
        console.error(error);
      });
  };

  return (
    <div className="Blob_Appupload">
      <div className="Blob_container">
        <h1 className="title">Vetrikodi Upload</h1>
        <div className="form-container">
          <input type="date" onChange={handleDateChange} />
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button className="upload-btn" onClick={handleFileUpload}>
            Upload
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
