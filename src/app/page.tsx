"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const GoToRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push("/user/register/");
  };

  return (
    <div className="container mx-auto p-5 my-5">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
            width={500}
            height={500}
          />
        </div>

        <form className="w-full md:w-1/2">
          <h1 className="text-center text-2xl font-bold">SIGN IN!</h1>
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

          <div className="flex justify-between items-center mx-4 mb-4">
            <div>
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-sm">
                Remember me
              </label>
            </div>
            <a className="text-blue-600 text-sm" type="submit">
              Forgot password?
            </a>
          </div>

          <button
            className="mb-4 w-full py-2 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700"
            type="submit"
          >
            Sign in
          </button>

          <div className="flex justify-center">
            <span className="text-sm">No Account? </span>
            <button
              className="text-blue-600 text-sm hover:text-bg-red-800"
              onClick={GoToRegister}
            >
              Sign Up
            </button>
          </div>

          {/* <div className="flex items-center my-4">
            <div className="border-t w-full"></div>
            <p className="text-center text-lg font-bold mx-3">OR</p>
            <div className="border-t w-full"></div>
          </div>

          <button
            className="mb-4 w-full py-2 text-lg bg-blue-600 text-white rounded-md flex justify-center items-center hover:bg-blue-700"
          >
            <span className="mr-2">
              <i className="fab fa-facebook-f"></i>
            </span>
            Continue with Facebook
          </button>

          <button
            className="mb-4 w-full py-2 text-lg bg-blue-400 text-white rounded-md flex justify-center items-center hover:bg-blue-500"
          >
            <span className="mr-2">
              <i className="fab fa-twitter"></i>
            </span>
            Continue with Twitter
          </button> */}
        </form>
      </div>
    </div>
  );
}
