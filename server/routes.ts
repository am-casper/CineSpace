import { Router } from "https://deno.land/x/oak@v12.6.1/router.ts";
import { addVideo, getVideo, getVideos, updateVideo } from "./Controllers/cinespace.ts";

const router = new Router();

router.post("/video", addVideo);
router.get("/videos", getVideos);
router.get("/video/:id", getVideo);
router.put("/video/:id", updateVideo);


// router.put()

export default router;
