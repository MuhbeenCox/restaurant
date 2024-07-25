import { getData } from "@app/services";
import { useEffect, useState } from "react";

export function userProfile() {
  const [userData, setUserData] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserProfileInfo = async () => {
    try {
      setLoading(true);
      const data = await getData("profile");

      setLoading(false);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserProfileInfo();
  }, []);

  return { pageLoading: loading, userData };
}
