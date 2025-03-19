"use client";
import { useEffect, useState } from "react";
import { useUserData } from "../../context/userdatacontext";
import { useRouter } from "next/navigation";

const Confirmation = () => {
  const router = useRouter();

  const { currentUser, resetUpdateSuccess, updateSuccess } = useUserData();
  const [regionName, setRegionName] = useState<string>("");
  const [provinceName, setProvinceName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [barangayName, setBarangayName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Redirect to register page if the user has not register
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser =
        currentUser ||
        JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!storedUser) {
        alert("Please Register first!!");
        router.push("/user/register");
      }
    }
  }, [currentUser, router]);

  // Fetching the Province, City, Barangay names
  useEffect(() => {
    if (currentUser) {
      const regionCode = currentUser.region;
      const provinceCode = currentUser.province;
      const cityCode = currentUser.city;
      const barangayCode = currentUser.barangay;

      const fetchLocationNames = async () => {
        try {
          const [regions, provinces, cities, barangays] = await Promise.all([
            fetch("https://psgc.gitlab.io/api/regions").then((res) =>
              res.json()
            ),
            fetch("https://psgc.gitlab.io/api/provinces").then((res) =>
              res.json()
            ),
            fetch("https://psgc.gitlab.io/api/cities-municipalities").then(
              (res) => res.json()
            ),
            fetch("https://psgc.gitlab.io/api/barangays").then((res) =>
              res.json()
            ),
          ]);

          const region = regions.find((r) => r.code === regionCode);
          const province = provinces.find((p) => p.code === provinceCode);
          const city = cities.find((c) => c.code === cityCode);
          const barangay = barangays.find((b) => b.code === barangayCode);

          setRegionName(region?.name || "Unknown Region");
          setProvinceName(province?.name || "Unknown Province");
          setCityName(city?.name || "Unknown City");
          setBarangayName(barangay?.name || "Unknown Barangay");
        } catch (error) {
          setError("Failed to fetch location names.");
          console.error("Error fetching location names: ", error);
        }
      };

      fetchLocationNames();
    }
  }, [currentUser]);

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/user/confirmation/success/");
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (updateSuccess) {
      resetUpdateSuccess();
      router.push("/user/update/");
    } else {
      router.push("/user/update/");
    }
  };

  return (
    <main className="m-5 w-auto h-screen space-y-2">
      <div className=" p-5 h-full">
        <h1 className="text-[25px]">Confirmation</h1>
        <hr className="" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold pt-2">User Information</h1>
              <div className="flex flex-col justify-start space-y-2">
                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Name:</h1>
                  <p className="text-base">
                    {`${currentUser?.firstname || ""} ${
                      currentUser?.middlename || ""
                    } ${currentUser?.lastname || ""}`}
                  </p>
                </div>

                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Age:</h1>
                  <p className="text-base">{`${currentUser?.age || ""}`}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Birthdate:</h1>
                  <p className="text-base">{`${
                    currentUser?.birthdate || ""
                  }`}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Sex:</h1>
                  <p className="text-base">{`${currentUser?.sex || ""}`}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Username:</h1>
                  <p className="text-base">{`${
                    currentUser?.username || ""
                  }`}</p>
                </div>

                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Email:</h1>
                  <p className="text-base">{`${
                    currentUser?.emailaddress || ""
                  }`}</p>
                </div>
              </div>

              <h1 className="text-2xl font-bold">Place </h1>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Region:</h1>
                  <p className="text-base">{`${regionName || ""}`}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <h1 className="text-base">{`${
                    currentUser?.province ? "Province: " : ""
                  }`}</h1>
                  <p className="text-base">{`${
                    currentUser?.province ? provinceName : ""
                  }`}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <h1 className="text-base">City:</h1>
                  <p className="text-base">{`${cityName || ""}`}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <h1 className="text-base">Barangay:</h1>
                  <p className="text-base">{`${barangayName || ""}`}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <h1 className="text-base">{`${
                    currentUser?.address1 ? "Address:" : ""
                  }`}</h1>
                  <p className="text-base">{`${
                    currentUser?.address1 || ""
                  }`}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-center space-x-2">
              <button
                className="p-2 border-1 rounded-md"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="p-2 border-1 rounded-md"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>

          <div className="">
            {/* <UpdateConfirmation /> */}
            {/* Only Show this when Update is pressed */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Confirmation;
