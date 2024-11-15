const { Chapter } = require('../database/models/Chapter.model');


module.exports.getChapters = async (req, res, next) => {
    const chapters = await Chapter.find({});
    return res.jsonSuccess(chapters, 200);
}

module.exports.createChapter = async (req, res, next) => {
    const body = req.body;

    const existingChapter = await Chapter.findOne({title: body.title});
    if(existingChapter) return res.jsonError(
        `A chapter is existing with the same title: ${body.title}`, 409);

    const newChapter = new Chapter({
        ...body
    });
    await newChapter.save();
    return res.jsonSuccess(newChapter, 201);
}

module.exports.getChapterById = async (req, res, next) => {
    const { id } = req.params;
    const chapter = await Chapter.findById(id);
    if (!chapter) return res.jsonError(`No restaurant available with id ${id}`, 404);
    return res.jsonSuccess(chapter, 200);
}

module.exports.searchChapter = async (req, res, next) => {
    const { value } = req.params;
    const chapterFounded = await Chapter.find({ title: {$regex: value, $options: 'i'}}).limit(5);
    if (!chapterFounded) return res.jsonError(`No chapter found`, 404);
    return res.jsonSuccess(chapterFounded, 200);
}

module.exports.deleteChapter = async (req, res, next) => {
    const { id } = req.params;
    const chapter = await Chapter.deleteOne({ _id: id});
    console.log(chapter);
    if (chapter.deletedCount === 0) return res.jsonError(`No chapter available with id ${id}`, 404);
    return res.jsonSuccess(chapter, 200);
}