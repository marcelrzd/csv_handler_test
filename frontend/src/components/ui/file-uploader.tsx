import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../features/api/apiSlice";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type FileUploaderProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
};

interface UploaderState {
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string;
  elapsedTime: number;
}

const FileUploader = ({ file, onFileChange }: FileUploaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [uploaderState, setUploaderState] = useState<UploaderState>({
    status: "idle",
    message: "",
    elapsedTime: 0,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    onFileChange(newFile);

    setUploaderState({
      status: "idle",
      message: "",
      elapsedTime: 0,
    });
  };

  const handleUpload = async () => {
    if (file && uploaderState.status === "idle") {
      setUploaderState({
        ...uploaderState,
        status: "loading",
        message: "Processing file...",
      });
      const startTime = Date.now();

      const interval = setInterval(() => {
        setUploaderState((prevState) => ({
          ...prevState,
          elapsedTime: (Date.now() - startTime) / 1000,
        }));
      }, 1000);

      try {
        await dispatch(uploadFile(file)).unwrap();
        const uploadTime = (Date.now() - startTime) / 1000;
        setUploaderState({
          status: "succeeded",
          message: `Upload complete in ${uploadTime} seconds`,
          elapsedTime: uploadTime,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        setUploaderState({
          ...uploaderState,
          status: "failed",
          message: "Upload failed. Check the file and try again.",
          elapsedTime: 0,
        });
      } finally {
        clearInterval(interval);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Input
        className="cursor-pointer"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
        id="csv"
        type="file"
        onChange={handleFileChange}
        disabled={uploaderState.status === "loading"}
      />
      {file && (
        <section>
          <p className="pb-4 font-semibold">File details:</p>
          <ul>
            <li>
              <span className="font-semibold capitalize">Name:</span>{" "}
              {file.name}
            </li>
            <li>
              <span className="font-semibold capitalize">Type:</span>{" "}
              {file.type}
            </li>
            <li>
              <span className="font-semibold capitalize">Size:</span>{" "}
              {file.size} bytes
            </li>
          </ul>
        </section>
      )}
      <div>
        <p
          className={`font-semibold ${
            uploaderState.status === "failed" ? "text-red-600" : "text-primary"
          }`}
        >
          {uploaderState.message}
        </p>
        {uploaderState.status === "loading" && (
          <p>
            Elapsed time:{" "}
            <span className="font-semibold text-primary">
              {Math.floor(uploaderState.elapsedTime)} seconds
            </span>
          </p>
        )}
        {file && uploaderState.status === "idle" && (
          <button
            onClick={handleUpload}
            className="w-full px-4 py-2 font-semibold text-white capitalize transition-all ease-linear bg-green-800 border-none rounded-lg hover:bg-green-800/80"
          >
            Upload CSV
          </button>
        )}
      </div>
    </div>
  );
};

export { FileUploader };
