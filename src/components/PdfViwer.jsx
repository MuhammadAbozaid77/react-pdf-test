import useGetPdfCanva from "./useGetPdfCanva";

export default function PdfViwer() {
  const { pages, loading } = useGetPdfCanva();

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{ overflowY: "scroll", height: "600px", padding: "20px" , border  : 'solid 1px black' }}
    >
      {loading && <div>لا تغلق الصفحة. الملف قيد التحميل للعرض...</div>}
      {pages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Page ${index + 1}`}
          style={{ width: "100%" }}
        />
      ))}
    </div>
  );
}
