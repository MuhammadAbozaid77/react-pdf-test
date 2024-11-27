import * as pdfjsLib from "pdfjs-dist";
import { useEffect, useState } from "react";

export default function useGetPdfCanva() {
  const pdfUrl =
    "https://www.dropbox.com/scl/fi/27cex9r7w6gmo03swqwbo/5fcc1a22-bf39-4c88-8554-52b0c0c86480.pdf?rlkey=wk3rd8953ta7q2vu3k6m8j4ow&raw=1";
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  pdfjsLib.GlobalWorkerOptions.workerSrc = "/public/pdf.worker.mjs";

  const base = "https://comfgtafwebapi.azhar-edu.org/";
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${base}Dropbox/FetchPdf?sharedLink=${pdfUrl}`
        );
        if (!response.ok) throw new Error("Failed to fetch PDF");

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const pdf = await pdfjsLib.getDocument(objectUrl).promise;

        const renderPage = async (i) => {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport }).promise;
          return canvas.toDataURL();
        };

        const pagesArray = await Promise.all(
          Array.from({ length: pdf.numPages }, (_, i) => renderPage(i + 1))
        );

        setLoading(false);
        setPages(pagesArray);
        URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    loadPdf();
  }, [pdfUrl]);

  return { pages, loading };
}
