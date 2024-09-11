import { api } from "@/lib/api";
import toast from "react-hot-toast";

type Customer = {
  name: string;
  email: string;
  phone: string;
  address?: string;
};

export async function createCustomer({
  name,
  email,
  phone,
  address,
}: Customer) {
  const response = await api.post("/api/customer", {
    name,
    email,
    phone,
    address,
  });
  try {
    toast.success(response.data.message);
  } catch (error) {
    console.error(error);
    toast.error(response.data.message);
  }

  return response.data;
}

export async function deleteCustomer(id: string) {
  const response = await api.delete("/api/customer", {
    params: {
      id,
    },
  });
  try {
    toast.success(response.data.message);
  } catch (error) {
    console.error(error);
    toast.error(response.data.message);
  }

  return response.data;
}
