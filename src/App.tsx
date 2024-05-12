import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Upload from "./components/Upload";
import Contact from "./components/Contact";
import Home from "./components/Home";

function App() {
  const [task, setTask] = useState("Home");

  return (
    <>
      <NavBar currentTask={(selectedTask) => setTask(selectedTask)} />
      {task === "Home" ? <Home /> : null}
      {task === "Check Disease" ? <Upload /> : null}
      {task === "Contact Us" ? <Contact /> : null}

      <div className="absolute bottom-0 left-0 top-0 z-[-1] opacity-20 h-screen w-screen hidden">
        <img
          className="object-cover h-full w-full"
          src="src\assets\20013909_8483352630167.svg"
          alt="image"
        />
      </div>
    </>
  );
}

export default App;
