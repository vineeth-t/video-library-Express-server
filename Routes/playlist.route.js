const express =require('express')
const router=express.Router();
const bodyParser=require('body-parser')
const {PlaylistModel} =require('../Models/playlist.model')
let playlists=[{
                   playListName:'WatchLater',        playListId:'1',
                   listOfVideos:[]
  }]
router.use(bodyParser.json())


router.route('/')
.get((req,res)=>{
       res.status(200).json({response:playlists})
})
.post((req,res)=>{
        const body=req.body
        if(playlists.some((playlist)=>playlist.playListName===body.playListName)){
          playlists=[...playlists]
        res.status(201).json({response:playlists,msg:'Playlist Exists'})
        }else{
        playlists=[...playlists,body]
        res.status(201).json({response:playlists,msg:'playlist created'})
        }
})
router.route('/:id')
.get((req,res)=>{
  const {id}=req.params
  playlists.map((playlist)=>{
    if(playlist.playListId===id){
      res.status(201).json({response:playlist.listOfVideos})      
      }
  })
})
.delete((req,res)=>{
   const{id}=req.params
   console.log(id)
  playlists=[ ...playlists.filter((playlist)=>playlist.playListId!==id)]
  console.log(playlists)
  res.status(201).json({response:playlists})
 })

//adding video to playlist
router.route('/:id/videos')
.post((req,res)=>{
  const{id}=req.params;
  const body=req.body
  // playlists.map((playlist)=>(playlist.playListId===id && (playlist.listOfVideos.some((video)=>video.id===body.listOfVideos))?{
  //    ...playlist,listOfVideos:listOfVideos.filter((video)=>video.id!==body.listOfVideos)
  // }:{
  //   ...playlist,listOfVideos:[...listOfVideos,body.listOfVideos]
  // }))
  playlists.map((playlist)=>{
  if(playlist.playListId===id && (playlist.listOfVideos.some((video)=>video.id===body.listOfVideos))){
      Object.keys(body).forEach((key)=>{
      
        if(key in playlist){
          playlist[key]=playlist[key].filter((video)=>video.id!==body.listOfVideos)
        }
      })
  }else if(playlist.playListId===id){
  
    Object.keys(body).forEach((key)=>{
      if(key in playlist){
        playlist[key]=playlist[key].concat(body[key])
      }
    })
  }
  }
  )
  res.status(201).json({response:playlists,msg:'Added to playlist'})
})

module.exports=router