const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')

const { NotesModel } = require('../Models/notes.model')

router.use(bodyParser.json())


const findNotesOfUser = async (req, res, next) => {

  try {
    const userId = req.userId;
    const { videoId } = req.params;
    const findNotesByUserId = await NotesModel.findOne({ userId, videoId });
    if (!findNotesByUserId) {
      let notesHolder = await NotesModel({
        userId: userId,
        videoId: videoId,
        notes: []
      })
      notesHolder = await notesHolder.save();
      req.notesFolder = notesHolder
    } else {
      req.notesFolder = findNotesByUserId
    }
    next()
  } catch (error) {
    console.log(error)
    res.json({ response: false, message: 'Something went wrong' })
  }
}
router.route('/:videoId')

  .get(findNotesOfUser, (req, res) => {
    const { notesFolder } = req
    res.json({ response: true, notesFolder })
  })

  .post(findNotesOfUser, async (req, res) => {
    try {
      let { notesFolder } = req
      const { note,flag } = req.body;
      if (flag === 'DELETE') {
        notesFolder.notes = notesFolder.notes.pull(note)
      } else {
        await notesFolder.notes.push(note);
         
      }
      notesFolder = await notesFolder.save();
      res.json({ response: true, notesFolder })
    } catch (error) {
      console.log(error);
      res.json({ response: false, message: error.message })
    }
  })


module.exports = router