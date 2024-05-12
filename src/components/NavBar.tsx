import { useState } from "react";

interface Props {
  currentTask: (task: string) => void;
}

const NavBar = ({ currentTask }: Props) => {
  const tasks = [
    {
      name: "Home",
      url: "src/assets/home.png",
    },
    {
      name: "Models",
      url: "src/assets/dataset.png",
    },
    {
      name: "How It Works",
      url: "src/assets/how_it_works.png",
    },
    {
      name: "Task 4",
      url: "src/assets/dataset.png",
    },
    {
      name: "Contact Us",
      url: "src/assets/conatact.png",
    },
  ];
  const [task1, setTask] = useState("Home");
  const [hamberger, setHamberger] = useState(false);
  const handleHamberger = () => {
    setHamberger(!hamberger);
  };

  return (
    <header>
      <nav className="px-4 lg:bg-white max-lg:p-3 shadow">
        <div className="relative flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img
              src="src\assets\MEDWISE.png"
              className="medwise_logo mr-1 h-16"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
              Med
              <span className="text-[#1d4ed8]">Wise</span>
            </span>
          </div>
          <div className="flex items-center gap-4 lg:order-2 ">
            <div
              className={
                task1 === "Contact Us"
                  ? "hidden lg:flex items-center gap-2 shadow-lg shadow-blue-500/50 border-2 px-[0.4rem] py-[.35rem] reborder-2 font-medium rounded-3xl border text-sm text-center cursor-pointer"
                  : "hidden lg:flex items-center gap-2 border-2 px-[0.4rem] py-[.35rem] reborder-2 font-medium rounded-3xl border text-sm text-center cursor-pointer"
              }
              aria-current="page"
              onClick={() => {
                currentTask("Contact Us");
                setTask("Contact Us");
              }}
            >
              <span className="bg-[#1d4ed8] rounded-3xl">
                <img
                  src="src/assets/conatact.png"
                  className="w-[32px] p-[5px]"
                  alt="home"
                />
              </span>
              Contact Us
            </div>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center bg-[#1d4ed8] p-2 ml-1 text-sm rounded-lg lg:hidden focus:outline-none focus:ring-2 text-white"
              onClick={handleHamberger}
            >
              {hamberger ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <div
            className={`lg:flex justify-end items-center w-full flex lg:w-auto lg:order-1 max-lg:absolute max-lg:top-[50px] ${
              hamberger ? "" : "hidden"
            }`}
          >
            <ul className="flex lg:flex-row font-medium gap-4 flex-col items-end bg-white p-3 my-1 rounded-xl w-fit max-lg:border">
              {tasks.map((task, index) => (
                <li
                  key={task.name}
                  className={
                    index === tasks.length - 1
                      ? "lg:hidden max-lg:w-full"
                      : "max-lg:w-full"
                  }
                >
                  <div
                    className={
                      task1 === task.name
                        ? "flex items-center gap-2 shadow-lg shadow-blue-500/50 border-2 pr-[0.5rem] pl-[0.4rem] py-[.35rem] reborder-2 font-medium rounded-3xl border text-sm text-center cursor-pointer"
                        : "flex items-center gap-2 border-2 pr-[0.5rem] pl-[0.4rem] py-[.35rem] reborder-2 font-medium rounded-3xl border text-sm text-center cursor-pointer"
                    }
                    aria-current="page"
                    onClick={() => {
                      currentTask(task.name);
                      setTask(task.name);
                      setHamberger(!hamberger);
                    }}
                  >
                    <span className="bg-[#1d4ed8] rounded-3xl">
                      <img
                        src={task.url}
                        className="w-[32px] p-[5px]"
                        alt="home"
                      />
                    </span>
                    {task.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
