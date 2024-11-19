import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Note } from "./models/Note.js";

dotenv.config();
console.log("Mongodb URI:", process.env.MONGODB_URI);
const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://mongodb:27017/note-app";
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

app.get("/api/notes", async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

app.post("/api/notes", async (req, res, next) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
});

app.put("/api/notes/:id", async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true, runValidators: true },
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/notes/:id", async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
