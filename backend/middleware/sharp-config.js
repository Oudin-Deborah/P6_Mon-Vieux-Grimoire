const sharp = require("sharp");
const fs = require("fs");

exports.sharp = (req, res, next) => {
  if (!req.file) return next();
  const outputPath = `images/${req.file.filename.split(".")[0]}.webp`;
  sharp(req.file.path)
    .resize({ width: 200 })
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      fs.unlinkSync(req.file.path);
      req.file.filename = outputPath.split("/")[1];
      next();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error });
    });
};
