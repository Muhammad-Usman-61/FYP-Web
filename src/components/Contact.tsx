import { IoIosSend } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import contact_us_img_1 from "../assets/contact_us_img_1.jpg";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpeg";
import pic3 from "../assets/pic3.jpeg";
import contact_us_img from "../assets/contact_us_img.jpg";
import community from "../assets/community.jpg";

const Contact = () => {
  return (
    <>
      <div className="flex gap-8 mx-16 my-8 flex-col max-lg:mx-4">
        <div className="rounded-2xl shadow h-48 border border-gray-200 overflow-hidden">
          <img
            src={contact_us_img_1}
            alt="image"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex gap-8 justify-center max-lg:flex-col">
          <div className="w-full bg-white rounded-2xl border border-gray-200 shadow flex flex-col items-center p-8 border border-gray-200">
            <div className="mb-5 w-full">
              <h1 className="text-xl font-semibold text-gray-900">
                Get in touch
              </h1>
              <p className="font-medium text-sm">
                We are here for you! How can we help?
              </p>
            </div>
            <form
              className="w-full"
              action="https://formspree.io/f/xeqydgnq"
              method="POST"
            >
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g Usman"
                  className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#1d4ed8] block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#1d4ed8] block w-full p-2.5"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 outline-none border-gray-300 focus:border-[#1d4ed8]"
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center gap-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-blue-500/50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
              >
                <IoIosSend size={20} />
                Send
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <div className="h-1/2 bg-white shadow rounded-2xl p-8">
              <h1 className="text-xl font-semibold text-gray-900 text-center mb-4">
                Meet the team
              </h1>

              <div className="grid gap-8 lg:gap-16 grid-cols-2 md:grid-cols-3">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto w-24 h-24 rounded-full"
                    src={pic1}
                    alt="Muhammad Usman"
                  />
                  <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900">
                    <a href="#">Muhammad Usman</a>
                  </h3>
                  <ul className="flex justify-center mt-2 space-x-4">
                    <li>
                      <a
                        href="#"
                        target="_blank"
                        className="text-[#39569c] hover:text-gray-900"
                      >
                        <IoLogoGithub size={24} className="mt-0.5" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        target="_blank"
                        className="text-blue-500 hover:text-gray-900"
                      >
                        <FaLinkedin size={24} className="mt-0.5" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:muhammad196usman@gmail.com"
                        target="_blank"
                        className="text-[#00acee] hover:text-gray-900"
                      >
                        <IoMdMail size={28} />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-center text-gray-500">
                  <img
                    className="mx-auto w-24 h-24 rounded-full"
                    src={pic3}
                    alt="Abid Khan"
                  />
                  <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900">
                    <a href="#">Abid Khan</a>
                  </h3>
                  <ul className="flex justify-center mt-2 space-x-4">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/muhammad-usman-794205247/"
                        target="_blank"
                        className="text-[#39569c] hover:text-gray-900"
                      >
                        <IoLogoGithub size={24} className="mt-0.5" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/muhammad-abid-khan-a07a881b5/"
                        target="_blank"
                        className="text-blue-500 hover:text-gray-900 "
                      >
                        <FaLinkedin size={24} className="mt-0.5" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:mohammadabid1978004@gmail.com"
                        target="_blank"
                        className="text-[#00acee] hover:text-gray-900"
                      >
                        <IoMdMail size={28} />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-center text-gray-500">
                  <img
                    className="mx-auto w-24 h-24 rounded-full"
                    src={pic2}
                    alt="Mutee Abdullah"
                  />
                  <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900">
                    <a href="https://www.linkedin.com/in/mutee-abdullah-b27b64246/">
                      Mutee Abdullah
                    </a>
                  </h3>
                  <ul className="flex justify-center mt-2 space-x-4">
                    <li>
                      <a
                        href="#"
                        target="_blank"
                        className="text-[#39569c] hover:text-gray-900"
                      >
                        <IoLogoGithub size={24} className="mt-0.5" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/mutee-abdullah-b27b64246/"
                        target="_blank"
                        className="text-blue-500 hover:text-gray-900"
                      >
                        <FaLinkedin size={24} className="mt-0.5" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:muteeabdullah.02@gmail.com"
                        target="_blank"
                        className="text-[#00acee] hover:text-gray-900"
                      >
                        <IoMdMail size={28} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-6 justify-between max-sm:flex-col">
              <div className="shadow rounded-2xl border border-gray-200 overflow-hidden">
                <img src={contact_us_img} alt="image" />
              </div>
              <div className="shadow rounded-2xl relative border border-gray-200 overflow-hidden">
                <div className="absolute top-1/4 left-4 w-48 text-white font-medium text-xl">
                  <p>Helping Hands for Community</p>
                  <p>Detecting Alzheimer's Together</p>
                </div>

                <img src={community} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
