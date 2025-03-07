"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUserData, UserData } from "../context/userdatacontext";

interface Location {
  code: string;
  name: string;
}

const Register = () => {
  const router = useRouter();
  const { register, userInformation, errors } = useUserData();

  // Options for the honorifics and suffixes
  const honorifics = [
    "Mr.",
    "Ms.",
    "Dr.",
    "Prof.",
    "Mrs.",
    "Prefer not to say",
  ];

  const suffixes = ["Jr.", "Sr.", "III", "IV", "V"];

  const sex = ["Male", "Female"];

  // Main Information Data
  const [informationdata, setInformationData] = useState({
    id: "",
    honorific: "",
    firstname: "",
    middlename: "",
    lastname: "",
    sex: "",
    suffixes: "",
    username: "",
    emailaddress: "",
    address1: "",
    barangay: "",
    city: "",
    province: "",
    country: "Phillipines",
    password: "",
    confirmpassword: "",
  });

  // States for Province, City and barangays
  const [Provinces, setProvinces] = useState<Location[]>([]);
  const [City, setCity] = useState<Location[]>([]);
  const [Barangay, setBarangay] = useState<Location[]>([]);

  // Selected States for Province, City and Barangays
  const [SelectedProvinces, setSelectedProvinces] = useState("");
  const [SelectedCities, setSelectedCities] = useState("");
  const [SelectedBarangays, setSelectedBarangays] = useState("");

  // Visibility of passwords
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    useState(false);

  // Errors
  const [validerrors, setvaliderrors] = useState<{ [key: string]: string }>({});
  const [visibleErrors, setVisibleErrors] = useState<{ [key: string]: string }>(
    {}
  );

  // Generating a unique ID for each register
  const GenerateUniqueID = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");

    const uniqueID = `${year}${month}${uuidv4().split("-")[0]}`;

    return uniqueID;
  };

  // Handling Changes when typing (Only For Required)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const { name, value } = e.target;

    setInformationData((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    // Province, City, Baranggay - Auto Clear if selected change
    if (name === "province") {
      setSelectedProvinces(value);
      setSelectedCities("");
      setSelectedBarangays("");
    }

    if (name === "city") {
      setSelectedCities(value);
      setSelectedBarangays("");
    }

    if (name === "barangay") {
      setSelectedBarangays(value);
    }

    // Initial Real-Time Validation
    switch (field) {
      case "honorific":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            honorific: "Honorific is required",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            honorific: "",
          }));
        }
        break;

      case "firstname":
        if (value.length <= 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            firstname: "First Name is required",
          }));
        } else if (!/^[a-zA-z\s'-]+$/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            firstname: "First name should only contain letters",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            firstname: "",
          }));
        }
        break;

      case "middlename":
        if (!/^[a-zA-z\s'-]+$/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            middlename: "First name should only contain letters",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            middlename: "",
          }));
        }
        break;

      case "lastname":
        if (value.length <= 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            lastname: "Last Name is required",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            lastname: "",
          }));
        }
        break;

      case "sex":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            sex: "Please select your sex",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            sex: "",
          }));
        }
        break;

      case "username":
        if (value.length < 8 || value.length > 20) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            username: "Username must be 8 to 20 characters",
          }));
        } else if (
          Array.isArray(userInformation) &&
          userInformation.some((user: UserData) => user.username === value)
        ) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            username: "Username is taken",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            username: "",
          }));
        }

        break;
      case "emailaddress":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "Email is required",
          }));
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "Please Enter a valid email address!",
          }));
        } else if (
          Array.isArray(userInformation) &&
          userInformation.some((user: UserData) => user.emailaddress === value)
        ) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailadress: "Email is taken",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "",
          }));
        }
        break;

      case "province":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            province: "Please select a province",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            province: "",
          }));
        }
        break;
      case "city":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            city: "Please select a city",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            city: "",
          }));
        }
        break;

      case "barangay":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            barangay: "Please select a barangay",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            barangay: "",
          }));
        }
        break;

      case "password":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password is Required",
          }));
        } else if (
          (value.length < 8 && value.length > 0) ||
          value.length > 50
        ) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must be at least 8 to 50 characters",
          }));
        } else if (!/[A-Z]/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must contain at least one uppercase letter",
          }));
        } else if (!/[0-9]/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must contain at least one numerical",
          }));
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must contain at least special character",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "",
          }));
        }
        break;
      case "confirmpassword":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            confirmpassword: "Password is Required",
          }));
        } else if (value !== informationdata.password) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            confirmpassword: "Password must be the same",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "",
          }));
        }
        break;
    }
  };

  // Blur
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    const { value } = e.target;

    // Validating on blur
    switch (field) {
      case "honorific":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            honorific: "Honorific is required",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            honorific: "",
          }));
        }
        break;

      case "firstname":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            firstname: "First name is Required",
          }));
        } else if (!/^[a-zA-z\s'-]+$/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            firstname: "First name should only contain letters",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            firstname: "",
          }));
        }
        break;

      case "middlename":
        if (!/^[a-zA-z\s'-]+$/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            middlename: "Middle name should only contain letters",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            middlename: "",
          }));
        }
        break;

      case "lastname":
        if (value.length <= 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            lastname: "Last Name is required",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            lastname: "",
          }));
        }
        break;

      case "sex":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            sex: "Please select your sex",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            sex: "",
          }));
        }
        break;

      case "username":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            username: "Username is Required",
          }));
        } else if (
          (value.length < 8 && value.length > 0) ||
          value.length > 20
        ) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            username: "Username must be 8 to 20 characters",
          }));
        } else if (
          Array.isArray(userInformation) &&
          userInformation.some((user: UserData) => user.username === value)
        ) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            username: "Username is taken",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            username: "",
          }));
        }
        break;

      case "emailaddress":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "Email is required",
          }));
        } else if (
          Array.isArray(userInformation) &&
          userInformation.some((user: UserData) => user.emailaddress === value)
        ) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "Email is taken",
          }));
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "Please Enter a valid email address!",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "",
          }));
        }
        break;

      case "province":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            province: "Please select a province",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            province: "",
          }));
        }
        break;

      case "city":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            city: "Please select a city",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            city: "",
          }));
        }
        break;

      case "barangay":
        if (value === "default" || value === "") {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            barangay: "Please select a barangay",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            barangay: "",
          }));
        }
        break;
      case "password":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password is Required",
          }));
        } else if (
          (value.length < 8 && value.length > 0) ||
          value.length > 50
        ) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must be at least 8 to 50 characters",
          }));
        } else if (!/[A-Z]/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must contain at least one uppercase letter",
          }));
        } else if (!/[0-9]/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must contain at least one numerical",
          }));
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must contain at least special character",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "",
          }));
        }
        break;

      case "confirmpassword":
        if (value.length === 0) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            confirmpassword: "Password is Required",
          }));
          return;
        } else if (value !== informationdata.password) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            confirmpassword: "Password do not match",
          }));
          return;
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            password: "",
          }));
          return;
        }
        break;
    }
  };

  // Fetching the Province, City, barangay
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
      if (!SelectedProvinces) {
        setCity([]);
        setBarangay([]);
        return;
      }

      try {
        const response = await fetch(
          `https://psgc.gitlab.io/api/provinces/${SelectedProvinces}/cities-municipalities/`
        );
        const data: Location[] = await response.json();
        setCity(data);
      } catch (error) {
        console.log("Error fetching Cities.", error);
      }
    };

    fetchCity();
  }, [SelectedProvinces]);

  useEffect(() => {
    if (!SelectedCities) {
      setBarangay([]);
      return;
    }

    const fetchBarangay = async () => {
      try {
        const response = await fetch(
          `https://psgc.gitlab.io/api/cities-municipalities/${SelectedCities}/barangays/`
        );
        const data: Location[] = await response.json();
        setBarangay(data);
      } catch (error) {
        console.log("Error fetching Barangay.", error);
      }
    };
    fetchBarangay();
  }, [SelectedCities]);

  // Timeout for Errors
  useEffect(() => {
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        setVisibleErrors((prevErrors) => ({
          ...prevErrors,
          [key]: errors[key],
        }));

        // Setting a timer of the text before disappearing
        setTimeout(() => {
          setVisibleErrors((prevErrors) => {
            const { [key]: removed, ...rest } = prevErrors;
            return rest;
          });
        }, 3000);
      }
    });
  }, [errors]);

  // Go to Login
  const GotoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
  };

  // Registering the Information
  const HandleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newID = GenerateUniqueID();

    setInformationData((prevData) => {
      const UpdatedInformationData = { ...prevData, id: newID };
      console.log(UpdatedInformationData);
      return UpdatedInformationData;
    });

    register(informationdata);
    // router.push("/confirmation/");
  };

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
                onChange={(e) => handleChange(e, "honorific")}
                onBlur={(e) => handleBlur(e, "honorific")}
              >
                <option value="">-</option>
                {honorifics.map((honorific, index) => (
                  <option key={index} value={honorific}>
                    {honorific}
                  </option>
                ))}
              </select>
              {validerrors.honorific && (
                <p className="text-red-600 text-[10px]">
                  * {validerrors.honorific}
                </p>
              )}
              {visibleErrors.honorific && (
                <p className="text-red-600 text-[10px]">
                  * {visibleErrors.honorific}
                </p>
              )}
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
                  onChange={(e) => handleChange(e, "firstname")}
                  onBlur={(e) => handleBlur(e, "firstname")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  minLength={1}
                  maxLength={50}
                  required
                />
                {validerrors.firstname && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.firstname}
                  </p>
                )}
                {visibleErrors.firstname && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.firstname}
                  </p>
                )}
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
                  onChange={(e) => handleChange(e, "middlename")}
                  onBlur={(e) => handleBlur(e, "middlename")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {validerrors.middlename && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.middlename}
                  </p>
                )}
                {visibleErrors.middlename && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.middlename}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between space-x-5">
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
                  onChange={(e) => handleChange(e, "lastname")}
                  onBlur={(e) => handleBlur(e, "lastname")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {validerrors.lastname && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.lastname}
                  </p>
                )}
                {visibleErrors.lastname && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.lastname}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-evenly">
                <label htmlFor="sex" className="block text-lg font-medium">
                  <div className="flex">
                    <p>Sex</p>
                    {informationdata.sex === "" && (
                      <p className="text-red-600">*</p>
                    )}
                  </div>
                </label>
                <select
                  name="sex"
                  value={informationdata.sex}
                  className="border rounded-md h-10 px-4 py-2"
                  onChange={(e) => handleChange(e, "sex")}
                  onBlur={(e) => handleBlur(e, "sex")}
                  required
                >
                  <option value="">-</option>
                  {sex.map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
                {validerrors.sex && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.sex}
                  </p>
                )}
                {visibleErrors.sex && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.sex}
                  </p>
                )}
              </div>

              <div className="flex flex-col justify-evenly">
                <label htmlFor="suffixes" className="block text-lg font-medium">
                  Suffixes
                </label>
                <select
                  name="suffixes"
                  value={informationdata.suffixes}
                  className="border rounded-md h-10 px-4 py-2"
                  onChange={(e) => handleChange(e, "honorific")}
                  onBlur={(e) => handleBlur(e, "honorific")}
                >
                  <option value="">-</option>
                  {suffixes.map((suffix, index) => (
                    <option key={index} value={suffix}>
                      {suffix}
                    </option>
                  ))}
                </select>
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
                onChange={(e) => handleChange(e, "username")}
                onBlur={(e) => handleBlur(e, "username")}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                minLength={8}
                maxLength={20}
                required
              />
              {validerrors.username && (
                <p className="text-red-600 text-[10px]">
                  * {validerrors.username}
                </p>
              )}
              {visibleErrors.username && (
                <p className="text-red-600 text-[10px]">
                  * {visibleErrors.username}
                </p>
              )}
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
                onChange={(e) => handleChange(e, "emailaddress")}
                onBlur={(e) => handleBlur(e, "emailaddress")}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                minLength={6}
                maxLength={254}
                required
              />
              {validerrors.emailaddress && (
                <p className="text-red-600 text-[10px]">
                  * {validerrors.emailaddress}
                </p>
              )}
              {visibleErrors.emailaddress && (
                <p className="text-red-600 text-[10px]">
                  * {visibleErrors.emailaddress}
                </p>
              )}
            </div>
          </div>

          <hr className="my-5" />

          {/* Whole Address Form */}
          <div className="flex flex-col-reverse justify-evenly space-y-5">
            {/* Address 1 */}
            <div className="mb-4">
              <label htmlFor="address1" className="block text-lg font-medium">
                Blk, Lot, Street, Subdivision
              </label>
              <input
                type="address1"
                id="address1"
                name="address1"
                value={informationdata.address1}
                onChange={(e) => handleChange(e, "")}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Province, Cities, and Barangays */}
            <div className="flex flex-col justify-between space-y-5 pt-5">
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
                  value={SelectedProvinces}
                  onChange={(e) => handleChange(e, "province")}
                  onBlur={(e) => handleBlur(e, "province")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Province</option>
                  {Provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {validerrors.province && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.province}
                  </p>
                )}
                {visibleErrors.province && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.province}
                  </p>
                )}
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
                  value={SelectedCities}
                  onChange={(e) => handleChange(e, "city")}
                  onBlur={(e) => handleBlur(e, "city")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={!SelectedProvinces}
                  required
                >
                  <option value="">Select Cities</option>
                  {City.map((cities) => (
                    <option key={cities.code} value={cities.code}>
                      {cities.name}
                    </option>
                  ))}
                </select>
                {validerrors.city && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.city}
                  </p>
                )}
                {visibleErrors.city && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.city}
                  </p>
                )}
              </div>

              {/* barangays */}
              <div className="flex flex-col justify-evenly space-y-5">
                <label htmlFor="barangay" className="block text-lg font-medium">
                  <div className="flex">
                    <p>Barangay</p>
                    <p className="text-red-600">*</p>
                  </div>
                </label>
                <select
                  id="barangay"
                  name="barangay"
                  value={SelectedBarangays}
                  onChange={(e) => handleChange(e, "barangay")}
                  onBlur={(e) => handleBlur(e, "barangay")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={!SelectedCities}
                  required
                >
                  <option value="">Select Barangay</option>
                  {Barangay.map((barangays) => (
                    <option key={barangays.code} value={barangays.code}>
                      {barangays.name}
                    </option>
                  ))}
                </select>
                {validerrors.barangay && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.barangay}
                  </p>
                )}
                {visibleErrors.barangay && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.barangay}
                  </p>
                )}
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
                  onChange={(e) => handleChange(e, "password")}
                  onBlur={(e) => handleBlur(e, "password")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  minLength={8}
                  maxLength={50}
                  required
                />
                {validerrors.password && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.password}
                  </p>
                )}
                {visibleErrors.password && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.password}
                  </p>
                )}
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
                      className="opacity-5"
                    />
                  ) : (
                    <Image
                      src="/images/hide.svg"
                      alt="Phone image"
                      width={50}
                      height={50}
                      className="opacity-5"
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
                    onChange={(e) => handleChange(e, "confirmpassword")}
                    onBlur={(e) => handleBlur(e, "confirmpassword")}
                    className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  {validerrors.confirmpassword && (
                    <p className="text-red-600 text-[10px]">
                      * {validerrors.confirmpassword}
                    </p>
                  )}
                  {visibleErrors.confirmpassword && (
                    <p className="text-red-600 text-[10px]">
                      * {visibleErrors.confirmpassword}
                    </p>
                  )}
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
                        className="opacity-5"
                      />
                    ) : (
                      <Image
                        src="/images/hide.svg"
                        alt="Phone image"
                        width={50}
                        height={50}
                        className="opacity-5"
                      />
                    )}
                  </button>
                </div>

                <hr className="my-5" />

                {/* Showing where the errors */}
                <div className="m-5">
                  <div className="border-1 border-black p-5">
                    <h1 className="">Checklist: </h1>
                    <hr className="" />
                  </div>
                </div>

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
            onClick={HandleRegister}
          >
            REGISTER
          </button>

          <div className="flex justify-center">
            <span className="text-sm">Have An Account? </span>
            <button
              className="text-blue-600 text-sm hover:text-amber-950"
              onClick={GotoLogin}
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
