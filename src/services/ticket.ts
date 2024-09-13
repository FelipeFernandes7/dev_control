import { api } from "@/lib/api";
import toast from "react-hot-toast";

export async function changeStatus(id: string) {
  const response = await api.patch("api/ticket/", {
    id: id,
  });
  try {
    toast.success(response.data.message);
  } catch (error) {
    console.error(error);
    toast.error(response.data.error);
  }

  return response.data;
}

export async function createTicket(
  name: string,
  description: string,
  customerId: string,
) {
  const response = await api.post("api/ticket/", {
    name,
    description,
    customerId,
  });
  try {
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(response.data.error);
  }
}
