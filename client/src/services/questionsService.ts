import axios from "axios";
import type { Role } from "../types/Role";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchQuestions(role: Role) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/questions/?page=1&roleKey=${role}`,
    );
    console.log("Fetched questions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}
