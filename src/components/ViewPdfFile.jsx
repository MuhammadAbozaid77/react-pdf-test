import axios from "axios";
import { useEffect, useState } from "react";

//===================================================================
function PdfViwer() {
  return <div>PdfViwer</div>;
}
//===================================================================
export default function ViewPdfFile() {
  const [pdfList, setPdfList] = useState(null);
  console.log("pdfList", pdfList);

  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://pdfshow.runasp.net/api/file/list");
      const { data } = res;
      setPdfList(data?.files);
    }
    getData();
  }, []);

  return (
    <>
      <div
        style={{
          border: "1px solid gray",
          width: "600px",
          height: "500px",
          margin: "20px",
          padding: "5px",
        }}
      >
        <PdfViwer />
      </div>
    </>
  );
}

//   const pdfUrl =
//     "https://www.dropbox.com/scl/fi/27cex9r7w6gmo03swqwbo/5fcc1a22-bf39-4c88-8554-52b0c0c86480.pdf?rlkey=wk3rd8953ta7q2vu3k6m8j4ow&raw=1";

//   const base = "https://comfgtafwebapi.azhar-edu.org/";
/*
    const response = await fetch(
        `${base}Dropbox/FetchPdf?sharedLink=${pdfUrl}`
    );
    if (!response.ok) throw new Error("Failed to fetch PDF");
*/
