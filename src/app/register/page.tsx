import Image from "next/image";

const Register = () => {
  return (
    <div className="container mx-auto p-5 my-5">
      <div className="flex flex-wrap">
        <form className="w-full md:w-1/2">
          <h1 className="text-center text-2xl font-bold">SIGN UP!</h1>
          <div className="mb-4">
            <div className="flex justify-between space-x-5">
              <div className="flex flex-col justify-evenly">
                <label
                  htmlFor="firstname"
                  className="block text-lg font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-evenly">
                <label
                  htmlFor="middlename"
                  className="block text-lg font-medium"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middlename"
                  name="middlename"
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-evenly">
                <label htmlFor="lastname" className="block text-lg font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium">
              Password:{" "}
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-4 py-2 text-gray-500 hover:text-gray-700"
              ></button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmpass" className="block text-lg font-medium">
              Confirm Password:{" "}
            </label>
            <div className="relative">
              <input
                type="password"
                id="confirmpass"
                name="confirmpass"
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-4 py-2 text-gray-500 hover:text-gray-700"
              ></button>
            </div>
          </div>

          <button
            className="mb-4 w-full py-2 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700"
            type="submit"
          >
            REGISTER
          </button>

          <div className="flex justify-center">
            <span className="text-sm">Have An Account? </span>
            <a className="text-blue-600 text-sm">Sign In</a>
          </div>
        </form>
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
