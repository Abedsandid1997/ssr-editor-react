import { url } from "@/utilits";
import axios from "axios";

const apiClient = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default apiClient;
