const mongoose=require('mongoose');

const url='mongodb+srv://pvr:QweRdfg123@cluster1.iyfq9.mongodb.net/video-library?retryWrites=true&w=majority'
const InitaliseDataBaseConnection=async function(){
  try{
    const response=await  mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true, 
    })
  }
  catch(error){
    console.log(error)
  }

console.log('Connected to dataBase')
}
module.exports={InitaliseDataBaseConnection}