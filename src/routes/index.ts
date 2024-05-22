import { Router } from "express";
import myListRoute from "./myList.route";
const router = Router();
router.use("/myList", myListRoute);
export default router;
