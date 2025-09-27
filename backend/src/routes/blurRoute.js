import express from "express";
import multer from "multer";
import sharp from "sharp";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/profile-pic", upload.single("picture"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No picture provided" });
        }

        const blurredBuffer = await sharp(req.file.buffer).blur(20).toBuffer();
        const blurredBase64 = blurredBuffer.toString("base64");

        res.json({
        success: true,
        message: "Picture blurred successfully",
        blurredImage: blurredBase64,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to blur picture" });
    }
});

export default router;
