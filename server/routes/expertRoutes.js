import express from "express";
import {
  getExperts,
  getExpertById,
  createExpert,
} from "../controllers/expertController.js";

const router = express.Router();

router.get("/", getExperts);
router.get("/:id", getExpertById);
router.post("/", createExpert);

export default router;
