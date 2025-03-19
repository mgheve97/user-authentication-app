"use client";

import { useRouter } from "next/navigation";

const SuccessRegister = () => {
  const router = useRouter();

  const GotoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push("/");
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <label className="block text-lg font-medium mb-2">
          Register Successfuly
        </label>
        <button
          type="submit"
          className="mb-4 w-full py-2 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700"
          onClick={GotoLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SuccessRegister;
