"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface UserData {
  id: string;
  honorific: string;
  firstname: string;
  middlename: string;
  lastname: string;
  sex: string;
  suffixes: string;
  username: string;
  emailaddress: string;
  address1: string;
  barangay: string;
  city: string;
  province: string;
  country: string;
  password: string;
  confirmpassword: string;
}

interface UserDataContextType {
  currentUser: UserData | null;
  userInformation: UserData[];
  errors: Record<string, string>;
  register: (user: UserData) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [userInformation, setUserInformation] = useState<UserData[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("userInformation");
      if (storedUsers) {
        setUserInformation(JSON.parse(storedUsers));
      } else {
        setUserInformation([]);
      }
    }
  }, []);

  const isUsernameTaken = (username: string) => {
    return userInformation.some((user) => user.username === username);
  };

  const isEmailTaken = (emailaddress: string) => {
    return userInformation.some((user) => user.emailaddress === emailaddress);
  };

  const validateUserData = (user: UserData) => {
    const validationError: Record<string, string> = {};
    let passwordError = "";

    if (!user.honorific) validationError.honorific = "Honorific is required.";
    if (!user.firstname) validationError.firstname = "First name is required.";
    if (!user.lastname) validationError.lastname = "Last name is required.";
    if (!user.username) validationError.username = "Username is required.";
    if (!user.emailaddress)
      validationError.emailaddress = "Email address is required.";
    if (!user.sex) validationError.sex = "Sex is required.";
    if (!user.province) validationError.province = "Province is required.";
    if (!user.city) validationError.city = "City is required.";
    if (!user.barangay) validationError.barangay = "Barangay is required.";
    if (!user.password) validationError.password = "Password is required.";
    if (!user.confirmpassword)
      validationError.confirmpassword = "Confirm password is required.";

    // Password and Confirm Password Match Check
    if (user.password !== user.confirmpassword) {
      validationError.confirmpassword = "Passwords do not match.";
    }

    // Check if Username or Email is already taken
    if (isUsernameTaken(user.username)) {
      validationError.username = "Username is already taken.";
    }
    if (isEmailTaken(user.emailaddress)) {
      validationError.emailaddress = "Email is already registered.";
    }

    // Additional Validation

    // Username must be at least 8 character long
    if (
      (user.username.length < 8 && user.username,
      length > 0 || user.username.length > 20)
    ) {
      validationError.emailaddress =
        "Username must be at least 8 character long.";
    }

    // Password Length
    if (
      (user.password.length < 8 && user.password,
      length > 0 || user.password.length > 20)
    ) {
      validationError.emailaddress =
        "Password must be at least 8 character long.";
    }

    if (user.password) {
      // Password Uppercase, Numerical, SpecialCharacter required
      if (!/[A-Z]/.test(user.password)) {
        passwordError += "Password must contain at least one uppercase letter.";
      }
      if (!/[0-9]/.test(user.password)) {
        passwordError += "Password must contain at least one numericals.";
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(user.password)) {
        passwordError +=
          "Password must contain at least one special character.";
      }

      if (passwordError) {
        validationError.password = passwordError.trim();
      }
    }

    // First name, Middle Name and Last Name Special Character Validation
    const namePattern = /^[a-zA-z\s'-]+$/;
    if (user.firstname && !namePattern.test(user.firstname)) {
      validationError.firstname =
        "First Name can only contains letters and spaces.";
    }
    if (user.middlename && !namePattern.test(user.middlename)) {
      validationError.middlename =
        "Middle Name can only contains letters and spaces.";
    }
    if (user.lastname && !namePattern.test(user.lastname)) {
      validationError.lastname =
        "Last Name can only contains letters and spaces.";
    }

    // Email Format Check
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (user.emailaddress && !emailPattern.test(user.emailaddress)) {
      validationError.emailaddress = "Please enter a valid email address.";
    }

    return validationError;
  };

  const register = (user: UserData) => {
    const validationError = validateUserData(user);

    if (Object.keys(validationError).length > 0) {
      setErrors(validationError);
      console.log(validationError);
      return;
    }

    // Add new user
    const newUsers = [...userInformation, user];

    setUserInformation(newUsers);

    localStorage.setItem("userInformation", JSON.stringify(newUsers));

    setCurrentUser(user);
    alert("User Registered Successfully");
  };

  return (
    <UserDataContext.Provider
      value={{
        currentUser,
        userInformation,
        errors,
        register,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
};
