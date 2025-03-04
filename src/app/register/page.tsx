"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Location {
  code: string;
  name: string;
}

const Register = () => {
  const router = useRouter();

  // Options for the honorifics
  const honorifics = [
    "Mr.",
    "Ms.",
    "Dr.",
    "Prof.",
    "Mrs.",
    "Prefer not to say",
  ];

  // Main Information Data
  const [informationdata, setInformationData] = useState({
    honorific: "",
    firstname: "",
    middlename: "",
    lastname: "",
    sex: "",
    suffixes: "",
    username: "",
    emailaddress: "",
    address1: "",
    baranggay: "",
    city: "",
    province: "",
    country: "Phillipines",
    password: "",
    confirmpassword: "",
  });

  // States for Province, City and Baranggays
  const [Provinces, setProvinces] = useState<Location[]>([]);
  const [City, setCity] = useState<Location[]>([]);
  const [Barangay, setBarangay] = useState<Location[]>([]);

  // Visibility of passwords
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    useState(false);

  // Handling Changes when typing
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInformationData((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Fetching the Province, City, Baranggay
  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await fetch("https://psgc.gitlab.io/api/provinces");
        const data: Location[] = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error Fetching Provinces.", error);
      }
    };

    fetchProvince();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch("https://psgc.gitlab.io/api/cities");
        const data: Location[] = await response.json();
        setCity(data);
      } catch (error) {
        console.log("Error fetching Cities.", error);
      }
    };

    fetchCity();
  }, []);

  useEffect(() => {
    const fetchBarangay = async () => {
      try {
        const response = await fetch("https://psgc.gitlab.io/api/barangays");
        const data: Location[] = await response.json();
        setBarangay(data);
      } catch (error) {
        console.log("Error fetching Barangay.", error);
      }
    };
    fetchBarangay();
  }, []);

  // console.log(informationdata);

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
              <label htmlFor="honorifics" className="block text-lg font-medium">
                <div className="flex">
                  <p>Prefixes</p>
                  {informationdata.honorific === "" && (
                    <p className="text-red-600">*</p>
                  )}
                </div>
              </label>
              <select
                name="honorific"
                value={informationdata.honorific}
                className="border rounded-md h-10 px-4 py-2"
              >
                <option value="">-</option>
                {honorifics.map((honorific, index) => (
                  <option key={index} value={honorific}>
                    {honorific}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between space-x-5">
              <div className="flex flex-col justify-evenly">
                <label
                  htmlFor="firstname"
                  className="block text-lg font-medium"
                >
                  <div className="flex">
                    <p>First Name</p>
                    {informationdata.firstname === "" && (
                      <p className="text-red-600">*</p>
                    )}
                  </div>
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={informationdata.firstname}
                  onChange={handleChange}
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
                  value={informationdata.middlename}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-evenly">
                <label htmlFor="lastname" className="block text-lg font-medium">
                  <div className="flex">
                    <p>Last Name</p>
                    {informationdata.lastname === "" && (
                      <p className="text-red-600">*</p>
                    )}
                  </div>
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={informationdata.lastname}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-evenly">
                <label htmlFor="suffixes" className="block text-lg font-medium">
                  Suffixes
                </label>
                <input
                  type="text"
                  id="suffixes"
                  name="suffixes"
                  value={informationdata.suffixes}
                  onChange={handleChange}
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
                  {informationdata.username === "" && (
                    <p className="text-red-600">*</p>
                  )}
                </div>
              </label>
              <input
                type="username"
                id="username"
                name="username"
                value={informationdata.username}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="emailaddress"
                className="block text-lg font-medium"
              >
                <div className="flex">
                  <p>Email Address</p>
                  <p className="text-red-600">*</p>
                </div>
              </label>
              <input
                type="emailaddress"
                id="emailaddress"
                name="emailaddress"
                value={informationdata.emailaddress}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <hr className="my-5" />

          {/* Whole Address Form */}
          <div className="flex flex-col-reverse justify-evenly space-y-5">
            {/* Address 1 */}
            <div className="mb-4">
              <label htmlFor="address1" className="block text-lg font-medium">
                <div className="flex">
                  <p>Blk, Lot, Street, Subdivision</p>
                  <p className="text-red-600">*</p>
                </div>
              </label>
              <input
                type="address1"
                id="address1"
                name="address1"
                value={informationdata.address1}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Province, Cities, and Barangays */}
            <div className="flex justify-between space-x-5">
              {/* Provinces */}
              <div className="flex flex-col justify-evenly space-y-5">
                <label htmlFor="province" className="block text-lg font-medium">
                  <div className="flex">
                    <p>Province</p>
                    <p className="text-red-600">*</p>
                  </div>
                </label>
                <select
                  id="province"
                  name="province"
                  value={informationdata.province}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Province</option>
                  {Provinces.map((province) => (
                    <option key={province.code} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cities */}
              <div className="flex flex-col justify-evenly space-y-5">
                <label htmlFor="city" className="block text-lg font-medium">
                  <div className="flex">
                    <p>City</p>
                    <p className="text-red-600">*</p>
                  </div>
                </label>
                <select
                  id="city"
                  name="city"
                  value={informationdata.city}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Cities</option>
                  {City.map((cities) => (
                    <option key={cities.code} value={cities.name}>
                      {cities.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* barangays */}
              <div className="flex flex-col justify-evenly space-y-5">
                <label
                  htmlFor="baranggay"
                  className="block text-lg font-medium"
                >
                  Baranggay
                </label>
                <select
                  id="baranggay"
                  name="baranggay"
                  value={informationdata.baranggay}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Barangay</option>
                  {Barangay.map((barangays) => (
                    <option key={barangays.code} value={barangays.name}>
                      {barangays.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Country */}
            <div className="flex flex-col justify-evenly space-y-5">
              <label htmlFor="country" className="block text-lg font-medium">
                Country
              </label>
              <input
                type="country"
                id="country"
                name="country"
                placeholder="Philippines"
                readOnly
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <hr className="my-5" />

          <div className="flex flex-col justify-evenly">
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-medium">
                <div className="flex">
                  <p>Password: </p>
                  {informationdata.password === "" && (
                    <p className="text-red-600">*</p>
                  )}
                </div>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={informationdata.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex justify-center items-center px-4"
                  onClick={() =>
                    setisPasswordVisible((prevState) => !prevState)
                  }
                >
                  {isPasswordVisible ? (
                    <Image
                      src="/images/show.svg"
                      alt="Phone image"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image
                      src="/images/hide.svg"
                      alt="Phone image"
                      width={50}
                      height={50}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmpass"
                className="block text-lg font-medium"
              >
                <div className="flex">
                  <p>Confirm Password: </p>
                  {informationdata.confirmpassword === "" && (
                    <p className="text-red-600">*</p>
                  )}
                </div>
              </label>
              <div className="relative">
                <div className="relative">
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    value={informationdata.confirmpassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex justify-center items-center px-4"
                    onClick={() =>
                      setisConfirmPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <Image
                        src="/images/show.svg"
                        alt="Phone image"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/images/hide.svg"
                        alt="Phone image"
                        width={50}
                        height={50}
                      />
                    )}
                  </button>
                </div>

                <hr className="my-5" />

                {/* Do this when the project is done */}
                {/* <div className="">
                  <div className="flex flex wrap">
                    {informationdata.username.length < 8 &&
                    informationdata.username.length > 0 ? (
                      <div className="flex justify-evenly">
                        <div className="w-1 h-1 bg-red-500 rounded-full px-1 py-1" />
                        <p>Username is at least 8 Characters</p>
                      </div>
                    ) : informationdata.username.length === 0 ? (
                      <div className="flex">
                        <div className="w-1 h-1 bg-gray-500 rounded-full" />
                        <p>Username is empty</p>
                      </div>
                    ) : (
                      <div className="w-1 h-1 bg-green-500 rounded-full" />
                    )}
                  </div>
                </div> */}

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
