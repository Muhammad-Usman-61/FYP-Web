import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

interface Result {
  predicted_class_custom: string;
  accuracy_custom: number;
  predicted_class_lenet: string;
  accuracy_lenet: number;
}

const Upload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [result, setResult] = useState<Result>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!imageFile) {
      alert("Please select an image and enter a name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    setLoading(true);

    axios
      .post<Result>("http://127.0.0.1:5000/data", formData)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setResult(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const fileDrag = document.getElementById("file-drag");
    const fileSelect = document.getElementById("file-upload");

    if (fileDrag && fileSelect) {
      const fileDragHover = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        fileDrag.classList.add(
          e.type === "dragover" || e.type === "change"
            ? "dragover"
            : "upload-box"
        );
      };

      const fileSelectHandler = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        var files = e.target.files || e.dataTransfer.files;
        fileDragHover(e);
        for (var i = 0, f; (f = files[i]); i++) {
          previewFile(f);
        }
      };

      fileDrag.addEventListener("dragover", fileDragHover, false);
      fileDrag.addEventListener("dragleave", fileDragHover, false);
      fileDrag.addEventListener("drop", fileSelectHandler, false);
      fileSelect.addEventListener("change", fileSelectHandler, false);

      return () => {
        fileDrag.removeEventListener("dragover", fileDragHover);
        fileDrag.removeEventListener("dragleave", fileDragHover);
        fileDrag.removeEventListener("drop", fileSelectHandler);
        fileSelect.removeEventListener("change", fileSelectHandler);
      };
    }
  }, []);

  const previewFile = (file: any) => {
    setImageFile(file);
    const preview = document.getElementById(
      "image-preview"
    ) as HTMLImageElement;
    const upload_caption = document.getElementById(
      "upload-caption"
    ) as HTMLImageElement;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (preview) {
        preview.src = fileReader.result as string;
        preview.classList.remove("hidden");
        upload_caption.classList.add("hidden");
      }
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    const preview = document.getElementById(
      "image-preview"
    ) as HTMLImageElement;
    const upload_caption = document.getElementById(
      "upload-caption"
    ) as HTMLImageElement;

    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    const fileDrag = document.getElementById("file-drag");
    if (preview) {
      preview.src = "";
      preview.classList.add("hidden");
      upload_caption.classList.remove("hidden");
      fileDrag?.classList.remove("dragover");
    }
  };
  return (
    <>
      <div>
        <img className="object-cover h-full w-full" src="" alt="image" />
      </div>
      <div className="flex flex-col items-center">
        <div className="panel">
          <input
            id="file-upload"
            className="hidden"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            required
          />
          <label
            htmlFor="file-upload"
            id="file-drag"
            className="upload-box text-xs text-gray-600 cursor-pointer w-64 h-40 bg-white border-2 border-dashed border-gray-500 hover:border-blue-500 rounded-md flex justify-center items-center flex-col my-4"
          >
            <div id="upload-caption">Drop image here or click to select</div>
            <img
              id="image-preview"
              className="hidden object-contain text-xs text-gray-600 cursor-pointer w-64 h-40 bg-white rounded-md flex justify-center items-center flex-col my-4 max-w-56 max-h-32 shadow-md"
            />
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-blue-500/50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center m-2"
          >
            Submit
          </button>
          {imageFile && (
            <button
              type="button"
              onClick={clearImage}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-blue-500/50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center m-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <div>
        {loading && <CircularProgress />}
        <p>
          {result?.predicted_class_custom} - {result?.accuracy_custom}
        </p>
        <p>
          {result?.predicted_class_lenet} - {result?.accuracy_lenet}
        </p>
      </div>
    </>
  );
};

export default Upload;
