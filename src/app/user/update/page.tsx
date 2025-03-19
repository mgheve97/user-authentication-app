"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUserData } from "../../context/userdatacontext";

interface Location {
  code: string;
  name: string;
}

type FieldNames =
  | "honorific"
  | "firstname"
  | "middlename"
  | "lastname"
  | "sex"
  | "username"
  | "emailaddress"
  | "province"
  | "city"
  | "barangay"
  | "password"
  | "confirmpassword"
  | "birthdate"
  | "age"
  | "address1"
  | "region";

const UpdateConfirmation = () => {
  const router = useRouter();
  const { updateUser, userInformation, errors, updateSuccess, currentUser } =
    useUserData();

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
  const [updateData, setUpdateData] = useState(
    currentUser || {
      id: "",
      honorific: "",
      firstname: "",
      middlename: "",
      lastname: "",
      sex: "",
      suffixes: "",
      birthdate: "",
      age: 0,
      username: "",
      emailaddress: "",
      address1: "",
      region: "",
      barangay: "",
      city: "",
      province: "",
      country: "Phillipines",
      password: "",
      confirmpassword: "",
    }
  );

  // States for Province, City and barangays
  const [Regions, setRegions] = useState<Location[]>([]);
  const [Provinces, setProvinces] = useState<Location[]>([]);
  const [City, setCity] = useState<Location[]>([]);
  const [Barangay, setBarangay] = useState<Location[]>([]);

  // Selected States for Province, City and Barangays
  const [SelectedRegions, setSelectedRegions] = useState("");
  const [SelectedProvinces, setSelectedProvinces] = useState("");
  const [SelectedCities, setSelectedCities] = useState("");
  const [SelectedBarangays, setSelectedBarangays] = useState("");

  // Errors
  const [validerrors, setvaliderrors] = useState<{ [key: string]: string }>({});
  const [visibleErrors, setVisibleErrors] = useState<{ [key: string]: string }>(
    {}
  );

  // Restricting Futures Dates
  const [maxDate, setMaxDate] = useState("");

  // Calculating the Age based on the birthdate
  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Handling Validation Logics
  const validateField = (field: FieldNames, value: string): void => {
    const isUsernameTaken = userInformation.some(
      (user) => user.username === value
    );
    const isEmailTaken = userInformation.some(
      (user) => user.emailaddress === value
    );
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
        } else if (isUsernameTaken) {
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
        } else if (isEmailTaken) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailadress: "Email is taken",
          }));
        } else if (isEmailTaken) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            emailaddress: "Email is taken",
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
        } else if (!/[!@#$%^&*(),.?":{}|<>_]/.test(value)) {
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
        } else if (value !== updateData.password) {
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
      case "birthdate":
        if (!value) {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            birthdate: "Please select your birth date",
          }));
        } else {
          setvaliderrors((prevErrors) => ({
            ...prevErrors,
            birthdate: "",
          }));
        }
        break;
    }
  };

  // Handling Changes when typing (Only For Required)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: FieldNames
  ) => {
    const { name, value } = e.target;

    if (field === "birthdate") {
      const calculatedAge = calculateAge(value);

      setUpdateData((prevData) => ({
        ...prevData,
        age: calculatedAge,
        [name]: value,
      }));
    } else {
      setUpdateData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Region, Province, City, Baranggay - Auto Clear if selected change
    if (name === "region") {
      setSelectedRegions(value);
      setSelectedProvinces("");
      setSelectedCities("");
      setSelectedBarangays("");
    }

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

    validateField(field, value);
    console.log(updateData);
  };

  // Blur
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    field: FieldNames
  ) => {
    const { value } = e.target;

    validateField(field, value);
  };

  // Fetching the selected Region, province, city and barangay from currentUser
  useEffect(() => {
    setSelectedRegions(currentUser?.region || "");
    setSelectedProvinces(currentUser?.province || "");
    setSelectedCities(currentUser?.city || "");
    setSelectedBarangays(currentUser?.barangay || "");
  }, [currentUser]);

  // Fetching the Region, Province, City, barangay
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("https://psgc.gitlab.io/api/regions");
        const data: Location[] = await response.json();
        setRegions(data);
      } catch (error) {
        console.error("Error Fetching Provinces.", error);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        if (SelectedRegions === "130000000") {
          setProvinces([]);
        }
        const response = await fetch(
          `https://psgc.gitlab.io/api/regions/${SelectedRegions}/provinces/`
        );
        const data: Location[] = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error Fetching Provinces.", error);
      }
    };

    if (SelectedRegions) fetchProvince();
  }, [SelectedRegions]);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setCity([]);
        setBarangay([]);

        if (SelectedRegions === "130000000") {
          const response = await fetch(
            `https://psgc.gitlab.io/api/regions/${SelectedRegions}/cities-municipalities/`
          );
          const data: Location[] = await response.json();
          setCity(data);
        } else {
          if (!SelectedProvinces) {
            setCity([]);
            setBarangay([]);
            return;
          } else {
            const response = await fetch(
              `https://psgc.gitlab.io/api/provinces/${SelectedProvinces}/cities-municipalities/`
            );
            const data: Location[] = await response.json();
            setCity(data); // Clear cities if no valid selection
          }
        }
      } catch (error) {
        console.log("Error fetching Cities.", error);
      }
    };

    fetchCity();
  }, [SelectedRegions, SelectedProvinces]);

  useEffect(() => {
    setBarangay([]);

    const fetchBarangay = async () => {
      try {
        if (!SelectedCities) {
          setBarangay([]); // If no city is selected
          return;
        }

        const response = await fetch(
          `https://psgc.gitlab.io/api/cities-municipalities/${SelectedCities}/barangays/`
        );
        const data: Location[] = await response.json();
        setBarangay(data);
      } catch (error) {
        console.log("Error fetching Cities.", error);
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
          setVisibleErrors((prevErrors) => ({
            ...prevErrors,
            [key]: "",
          }));
        }, 3000);
      }
    });
  }, [errors]);

  // Effects for restricting future dates
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[-1];
    setMaxDate(formattedDate);
  }, []);

  // Checking if the data is being stored in states
  useEffect(() => {
    console.log(updateData);
  }, [updateData]);

  // Go to Login
  const GotoConfirmation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/user/confirmation/");
  };

  // Updating the Information
  const HandleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    // Call update
    updateUser(updateData);
  };

  // Handling the update if success or not
  useEffect(() => {
    // When updateSuccess state changes, handle routing
    if (updateSuccess) {
      router.push("/user/confirmation/");
    }
  }, [updateSuccess, router]);

  return (
    <div className="container mx-auto p-5 my-5">
      <div className="flex flex-wrap justify-center items-center">
        <form className="w-full md:w-1/2">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-center text-2xl font-bold">UPDATE!</h1>
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
                  {updateData.honorific === "" && (
                    <p className="text-red-600">*</p>
                  )}
                </div>
              </label>
              <select
                name="honorific"
                value={updateData.honorific}
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

            <div className="flex space-x-5">
              <div className="flex flex-col justify-evenly">
                <label
                  htmlFor="firstname"
                  className="block text-lg font-medium"
                >
                  <div className="flex">
                    <p>First Name</p>
                    {currentUser?.firstname === "" && (
                      <p className="text-red-600">*</p>
                    )}
                  </div>
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={updateData.firstname}
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
                  value={updateData.middlename}
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

            <div className="flex space-x-5 pt-4">
              <div className="flex flex-col justify-evenly">
                <label htmlFor="lastname" className="block text-lg font-medium">
                  <div className="flex">
                    <p>Last Name</p>
                    {updateData.lastname === "" && (
                      <p className="text-red-600">*</p>
                    )}
                  </div>
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={updateData.lastname}
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
                    {updateData.sex === "" && <p className="text-red-600">*</p>}
                  </div>
                </label>
                <select
                  name="sex"
                  value={updateData.sex}
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
                  value={updateData.suffixes}
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

          <div className="flex items-center space-x-5 pt-4">
            <div className="flex flex-col">
              <label htmlFor="birthdate" className="block text-lg font-medium">
                <div className="flex">
                  <p>Birthdate</p>
                  {updateData.birthdate === "" && (
                    <p className="text-red-600">*</p>
                  )}
                </div>
              </label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                value={updateData.birthdate}
                onChange={(e) => handleChange(e, "birthdate")}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                max={maxDate}
              />
              {validerrors.birthdate && (
                <p className="text-red-600 text-[10px]">
                  * {validerrors.birthdate}
                </p>
              )}
              {visibleErrors.birthdate && (
                <p className="text-red-600 text-[10px]">
                  * {visibleErrors.birthdate}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="age" className="font-bold">
                Age
              </label>
              <input
                type="text"
                name="age"
                id="age"
                value={updateData.age}
                onChange={(e) => handleChange(e, "age")}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                readOnly
              />
            </div>
          </div>

          <div className="flex flex-wrap space-x-5 pt-4">
            <div className="mb-4">
              <label htmlFor="username" className="block text-lg font-medium">
                <div className="flex">
                  <p>Username</p>
                  {updateData.username === "" && (
                    <p className="text-red-600">*</p>
                  )}
                </div>
              </label>
              <input
                type="username"
                id="username"
                name="username"
                value={updateData.username}
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
                value={updateData.emailaddress}
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
                value={updateData.address1}
                onChange={(e) => handleChange(e, "address1")}
                className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Regions, Province, Cities, and Barangays */}
            <div className="flex flex-col justify-between space-y-5 pt-5">
              {/* Regions */}
              <div className="flex flex-col justify-evenly space-y-5">
                <label htmlFor="region" className="block text-lg font-medium">
                  <div className="flex">
                    <p>Region</p>
                    <p className="text-red-600">*</p>
                  </div>
                </label>
                <select
                  id="region"
                  name="region"
                  value={SelectedRegions || updateData.region}
                  onChange={(e) => handleChange(e, "region")}
                  onBlur={(e) => handleBlur(e, "region")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Region</option>
                  {Regions.map((region) => (
                    <option key={region.code} value={region.code}>
                      {region.name}
                    </option>
                  ))}
                </select>
                {validerrors.region && (
                  <p className="text-red-600 text-[10px]">
                    * {validerrors.region}
                  </p>
                )}
                {visibleErrors.region && (
                  <p className="text-red-600 text-[10px]">
                    * {visibleErrors.region}
                  </p>
                )}
              </div>

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
                  value={SelectedProvinces || updateData.province}
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
                  value={SelectedCities || updateData.city}
                  onChange={(e) => handleChange(e, "city")}
                  onBlur={(e) => handleBlur(e, "city")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  value={SelectedBarangays || updateData.barangay}
                  onChange={(e) => handleChange(e, "barangay")}
                  onBlur={(e) => handleBlur(e, "barangay")}
                  className="block w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

          <div className="flex">
            <button
              className="mb-4 w-full py-2 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700"
              type="submit"
              onClick={GotoConfirmation}
            >
              CANCEL
            </button>

            <button
              className="mb-4 w-full py-2 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700"
              type="submit"
              onClick={HandleUpdate}
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateConfirmation;
