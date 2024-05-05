
const WelcomePage = () => {
  return (
    <div className="w-full h-full min-h-screen py-16 md:py-28">
      <section className="relative">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-10 lg:py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-gray-700 font-extrabold mx-auto md:text-5xl">
              Lleva tu negocio de copias al siguiente nivel
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500">
              Todo lo que necesitas para tener el control total de tu negocio de
              copias en un solo lugar y de forma segura.
            </p>
            <form className="justify-center items-center gap-x-3 sm:flex">
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full px-3 py-2.5 text-gray-400 bg-gray-700 focus:bg-gray-900 duration-150 outline-none rounded-lg shadow sm:max-w-sm sm:w-auto"
              />
              <button className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto">
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <div className="flex justify-center items-center gap-x-4 text-gray-400 text-sm">
              <p>
                <span className="text-gray-100">5.0</span> by over 200 users
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="container h-[557px] bg-gray-800/10"></div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
