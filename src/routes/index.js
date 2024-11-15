const { Router } = require("express");
const ChapterRoute = require('./chapter.routes');

const router = Router();

router.use('/chapter', ChapterRoute);

module.exports = router;