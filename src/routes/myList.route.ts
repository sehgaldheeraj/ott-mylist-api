import { Router } from "express";
import { myListController } from "../controllers";

const router = Router();

router.post("/add", myListController.addToMyList);
router.get("/get/:userId", myListController.getMyList);
router.delete("/remove/:userId/:contentId", myListController.removeFromMyList);

export default router;
