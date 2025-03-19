"use client";

const AccessCode = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-black border-2 p-6 rounded-md">
        <div className="flex flex-col justify-center items-center">
          <label
            htmlFor="accessCode"
            className="block text-lg font-medium mb-2"
          >
            Please Enter the Access Code...
          </label>
          <input
            type="text"
            id="accessCode"
            name="accessCode"
            className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            minLength={1}
            maxLength={50}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
