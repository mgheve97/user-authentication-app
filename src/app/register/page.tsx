"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-5 my-5">
      <div className="flex flex-wrap justify-center items-center">
        <form className="w-full md:w-1/2">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-center text-2xl font-bold">SIGN UP!</h1>
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
              width={150}
              height={150}
            />
          </div>
          <div className="mb-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">
                Pronouns
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-between space-x-5">
              <div className="flex flex-col justify-evenly">
                <label
                  htmlFor="firstname"
                  className="block text-lg font-medium"
                >
                  <div className="flex">
                    <p>First Name</p>
                    <p className="text-red-600">*</p>
                  </div>
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
                  <div className="flex">
                    <p>Last Name</p>
                    <p className="text-red-600">*</p>
                  </div>
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

          <div className="flex flex-wrap justify-between">
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg font-medium">
                <div className="flex">
                  <p>Username</p>
                  <p className="text-red-600">*</p>
                </div>
              </label>
              <input
                type="username"
                id="username"
                name="username"
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium">
                <div className="flex">
                  <p>Email Address</p>
                  <p className="text-red-600">*</p>
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <hr className="my-5" />

          <div className="flex flex-col justify-evenly space-y-5">
            <div className="mb-4">
              <label htmlFor="address" className="block text-lg font-medium">
                <div className="flex">
                  <p>Blk, Lot, Street.</p>
                  <p className="text-red-600">*</p>
                </div>
              </label>
              <input
                type="address"
                id="address"
                name="address"
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-between space-x-5">
              <div className="flex flex-col justify-evenly space-y-5">
                <label
                  htmlFor="municipality"
                  className="block text-lg font-medium"
                >
                  Municipality
                </label>
                <input
                  type="municipality"
                  id="municipality"
                  name="municipality"
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-evenly space-y-5">
                <label htmlFor="city" className="block text-lg font-medium">
                  <div className="flex">
                    <p>City</p>
                    <p className="text-red-600">*</p>
                  </div>
                </label>
                <input
                  type="city"
                  id="city"
                  name="city"
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-evenly space-y-5">
                <label htmlFor="province" className="block text-lg font-medium">
                  <div className="flex">
                    <p>Province</p>
                    <p className="text-red-600">*</p>
                  </div>
                </label>
                <input
                  type="province"
                  id="province"
                  name="province"
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex flex-col justify-evenly space-y-5">
              <label htmlFor="country" className="block text-lg font-medium">
                Country
              </label>
              <input
                type="country"
                id="country"
                name="country"
                placeholder="Philippines"
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <hr className="my-5" />

          <div className="flex space-x-5">
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-medium">
                <div className="flex">
                  <p>Password: </p>
                  <p className="text-red-600">*</p>
                </div>
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
              <label
                htmlFor="confirmpass"
                className="block text-lg font-medium"
              >
                <div className="flex">
                  <p>Confirm Password: </p>
                  <p className="text-red-600">*</p>
                </div>
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
          </div>

          <button
            className="mb-4 w-full py-2 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700"
            type="submit"
          >
            REGISTER
          </button>

          <div className="flex justify-center">
            <span className="text-sm">Have An Account? </span>
            <button
              className="text-blue-600 text-sm hover:text-amber-950"
              onClick={() => router.push("/")}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
