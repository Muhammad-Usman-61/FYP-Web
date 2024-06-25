import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

interface Result {
  predicted_class_custom: string;
  accuracy_custom: number;
  predicted_class_lenet: string;
  accuracy_lenet: number;
  predicted_class_resNet: string;
  accuracy_resNet: number;
  predicted_class_inception: string;
  accuracy_inception: number;
  predicted_class_mobileNet: string;
  accuracy_mobileNet: number;
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
        window.scrollTo({ top: 100, behavior: "smooth" });
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

  const diseases = [
    "Non Demented",
    "Mild Demented",
    "Moderate Demented",
    "Very Mild Demented",
  ];

  const data = [
    result?.predicted_class_custom,
    result?.predicted_class_lenet,
    result?.predicted_class_resNet,
    result?.predicted_class_inception,
    result?.predicted_class_mobileNet,
  ].map((predictedClass) => {
    // Compare predicted disease class with predefined diseases
    const index = diseases.findIndex((disease) => disease === predictedClass);
    // If predicted class matches, return its index; otherwise, return -1
    return index !== -1 ? index + 1 : null;
  });
  return (
    <>
      <div className="px-4 max-lg:p-3">
        <div className="flex justify-center gap-16 mx-auto max-w-screen-xl my-8">
          <p className="mt-16 max-w-64 font-medium text-xl">
            <FaQuoteLeft fill="#1d4ed8" />
            Predict disease from MRI images with a simple upload.
          </p>
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
                <div id="upload-caption">
                  Drop image here or click to select
                </div>
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
        </div>
      </div>
      <div className="flex justify-center gap-64">
        <div className="relative">
          {loading && (
            <CircularProgress className="absolute w-32 h-32 m-auto left-0 right-0 top-0 bottom-0" />
          )}
          <p className="text-center font-bold mt-2">Predicted Class</p>
          <Bar
            width="450px"
            height="350px"
            data={{
              labels: [
                "Our Model",
                "LeNet",
                "ResNet50",
                "InceptionV3",
                "MobileNetV2",
              ],
              datasets: [
                {
                  label: "Predicted Disease",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                  ],
                  borderRadius: 5,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: false,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let value = context.parsed.y - 1;
                      let disease = diseases[value];
                      return "Disease: " + disease;
                    },
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    stepSize: 1,
                    callback: function (value) {
                      // Convert numerical labels to corresponding categories
                      switch (value) {
                        case 0:
                          return "";
                        case 1:
                          return "Non Demented";
                        case 2:
                          return "Mild Demented";
                        case 3:
                          return "Moderate Demented";
                        case 4:
                          return "Very Mild Demented";
                        default:
                          return value;
                      }
                    },
                  },
                },
              },
            }}
          />
        </div>
        <div className="relative">
          {loading && (
            <CircularProgress className="absolute w-32 h-32 m-auto left-0 right-0 top-0 bottom-0" />
          )}
          <p className="text-center font-bold mt-2">Confidence Level</p>
          <Bar
            width="350px"
            height="350px"
            data={{
              labels: [
                "Our Model",
                "LeNet",
                "ResNet50",
                "InceptionV3",
                "MobileNetV2",
              ],
              datasets: [
                {
                  label: "Models Accuracy",
                  data: [
                    result?.accuracy_custom,
                    result?.accuracy_lenet,
                    result?.accuracy_resNet,
                    result?.accuracy_inception,
                    result?.accuracy_mobileNet,
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              responsive: false,
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Upload;
