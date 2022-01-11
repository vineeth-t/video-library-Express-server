const userName = process.env['userName']
const password = process.env['dataBasePassword']
const mongoose=require('mongoose');


const url=`mongodb+srv://${userName}:${password}@cluster1.iyfq9.mongodb.net/video-library?retryWrites=true&w=majority`
const InitaliseDataBaseConnection=async function(){
  try{
    const response=await  mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true, 
    })
  console.log('Connected to dataBase')
  console.log(userName,password)
  }
  catch(error){
    console.log(error)
  }
}
module.exports={InitaliseDataBaseConnection}