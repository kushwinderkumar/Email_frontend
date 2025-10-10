import axios from "axios";

export interface Email {
    id: string;
  from?: string;
  subject?: string;
  snippet?: string;
  body?: string;
  date?: string;
}

// Fetch inbox emails for a given userId
export const getInboxEmails = async (userId: string): Promise<Email[]> => {
  const response = await axios.get<Email[]>(`https://localhost:7262/api/outlook/inbox/${userId}`);
  return response.data;
};
