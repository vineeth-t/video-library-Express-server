const express=require('express')
const router=express.Router();
const bodyParser=require('body-parser')

router.use(bodyParser.json())
let notesHolder=[]
router.route("/")
.get(async (req,res)=>{
  try{
  res.json({response:notesHolder})
  }catch(error){
    console.log(error)
  }

})
.post((req,res)=>{
  const body=req.body
  notesHolder=[...notesHolder,body]
  res.json({response:notesHolder})
})
router.route('/:id')
.get((req,res)=>{
    const {id}=req.params
    const body=req.body
    const notesToBeSend= notesHolder.find((notes)=>notes.videoId===id)
    res.json({response:notesToBeSend})

})
.post((req,res)=>{
  const {id}=req.params
  const body=req.body
  notesHolder.map((notes)=>{
    if( notes.videoId===id){
      Object.keys(body).forEach((key)=>{
        notes[key]=notes[key].concat(body.listOfNotes)
      })
    }
 })
 res.json({response:notesHolder})
})
router.route('/:id/:notesId')
.delete((req,res)=>{
  const{id,notesId}=req.params
 notesHolder.map((notes)=>{
      if( notes.videoId===id){
         notes.listOfNotes=notes.listOfNotes.filter((note)=>note.noteId!==notesId)
      }
    })
  res.json({response:notesHolder})
})
module.exports=router