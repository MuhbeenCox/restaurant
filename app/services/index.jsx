import axios from "axios";
import toast from "react-hot-toast";

const url = process.env.NEXT_PUBLIC_API_URL;
export const updateData = async (currentTab, formData) => {
  try {
    const { data } = await axios.put(
      `${url}/api/${currentTab}/update`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data;
  } catch (error) {
    console.log("updated req error", error);
  }
};

export const getData = async (currentTab) => {
  try {
    const { data } = await axios.get(`${url}/api/${currentTab}/get`);
    return data;
  } catch (error) {
    console.log("get req error", error.message);
  }
};
export const getParticularData = async (currentTab, label, value) => {
  try {
    const { data } = await axios.get(
      `${url}/api/${currentTab}/get?${label}=${value}`
    );
    console.log(data, "check request data s");
    return data;
  } catch (error) {
    console.log("get req error", error.message);
  }
};

export const getSingleData = async (currentTab, id) => {
  try {
    const { data } = await axios.get(`${url}/api/${currentTab}/get/${id}`);
    return data;
  } catch (error) {
    console.log("get req error", error.message);
  }
};

export const addData = async (currentTab, formData) => {
  try {
    const { data } = await axios.post(
      `${url}/api/${currentTab}/post`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data;
  } catch (error) {
    console.log("post req error", error.message);
  }
};

export const deleteData = async (currentTab, id) => {
  try {
    const { data } = await axios.delete(`${url}/api/${currentTab}/delete`, {
      data: { _id: id },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data?.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
