import express from "express";
import { createNotes, getNotes, updateNotes, deleteNotes } from "../controller/NotesController.js";
import { getUsers ,Register, Login, refreshToken, logout } from "../controller/UsersController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);
router.get("/getusers", getUsers);

router.get("/notes", verifyToken, getNotes);
router.post("/notes", verifyToken, createNotes);
router.put("/notes/:id", verifyToken, updateNotes);
router.delete("/notes/:id", verifyToken, deleteNotes);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;

