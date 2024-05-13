import heroBanner from "../assets/hero_banner.jpg";
interface Props {
  currentTask: (task: string) => void;
}

const Home = ({ currentTask }: Props) => {
  return (
    <>
      <div className="xl:mx-auto max-w-screen-2xl">
        <div className="m-4 rounded-2xl overflow-hidden relative ">
          <div className="absolute top-0 max-w-xl p-16 flex flex-col gap-6">
            <h2 className="font-bold text-3xl">
              Empowering Early Detection: Welcome to{" "}
              <span className="text-[#1d4ed8]">MedWise</span>
            </h2>
            <p className="text-xl">
              Join us in the fight against Alzheimer's disease with MedWise,
              your powerful tool for early detection. Detecting Alzheimer's
              early can make all the difference. Start your journey towards
              cognitive wellness today.
            </p>
            <button
              type="button"
              onClick={() => {
                currentTask("Check Disease");
              }}
              className="text-white w-fit bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-blue-500/50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
            >
              Check Disease
            </button>
          </div>
          <img src={heroBanner} alt="hero banner" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
