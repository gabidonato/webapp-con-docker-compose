import axios, { AxiosError } from "axios";
import { Note, CreateNoteData, UpdateNoteData } from "../types";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
  throw error;
};

export const getNotes = async (): Promise<Note[]> => {
  try {
    const response = await api.get<Note[]>("/notes");
    return response.data;
  } catch (error) {
    throw handleError(error);
    console.log("Error:", error);
  }
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  try {
    const response = await api.post<Note>("/notes", data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateNote = async (
  id: string,
  data: UpdateNoteData,
): Promise<Note> => {
  try {
    const response = await api.put<Note>(`/notes/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};
