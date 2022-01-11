const routeNotFound= (req,res)=>{
  res.status(404).json({succes:false,message:'resource not found'})
}
module.exports={routeNotFound}