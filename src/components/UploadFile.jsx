import axios from "axios"; // تأكد من كتابة الاستيراد بهذا الشكل
import { useEffect, useState } from "react";
import ViewPdfFile from "./ViewPdfFile";

export default function UploadFile() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://pdfshow.runasp.net/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
    } catch (error) {
      alert("File upload failed");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <div style={{ margin: "20px" }}>
        <ViewPdfFile />
      </div>
    </div>
  );
}
