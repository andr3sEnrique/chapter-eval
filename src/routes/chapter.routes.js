const { Router } = require("express");
const { getChapters, createChapter, getChapterById, searchChapter, deleteChapter } = require("../controllers/chapters.controllers");

const router = Router();

router.get('/', getChapters);
router.post('/', createChapter);
router.get('/:id', getChapterById);
router.delete('/:id', deleteChapter);
router.get('/search/:value', searchChapter);

module.exports = router;