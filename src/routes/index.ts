import { Router } from "express";
import myListRoute from "./myList.route";
const router = Router();
router.use("/mylist", myListRoute);
export default router;
