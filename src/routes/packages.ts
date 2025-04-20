import { Router } from "../../deps.ts";
import {
  registerPackage,
  getPackages,
  getPackage,
  updatePackageStatus
} from "../controllers/packageController.ts";

const router = new Router();

router
  .get("/api/packages", getPackages)
  .get("/api/packages/:id", getPackage)
  .post("/api/packages", registerPackage)
  .put("/api/packages/:id/status", updatePackageStatus);


export default router;
