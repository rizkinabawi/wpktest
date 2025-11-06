"use client";

export default function useDownloadFile() {
  const handleDownload = async ( apiEndpoint: string, fileName: string) => {
    try {
      const res = await fetch(apiEndpoint, { method: "GET" });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return { handleDownload };
}
