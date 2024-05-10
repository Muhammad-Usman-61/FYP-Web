import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  // const [name, setnewName] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleChange = (event: any) => {
    setName(event.target.value);
  };
  const handleSubmit = () => {
    if (!imageFile || !name) {
      alert("Please select an image and enter a name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("nm", name);

    axios
      .post("http://127.0.0.1:5000/data", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://127.0.0.1:5000/data", { nm })
  //     .then((res) => {
  //       console.log(res.data);
  //       setnewName(res.data.name);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
