import { Router } from "express";
import { myListController } from "../controllers";

const router = Router();

router.post("", myListController.addToMyList);
router.get("/:userId", myListController.getMyList);
router.delete("/:userId/:contentId", myListController.removeFromMyList);

export default router;
