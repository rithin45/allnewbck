const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://rithinroy27:rithinroy27@cluster0.kod0pin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("DB Connected Login")})
.catch(err=>console.log(err));
const logschema=new mongoose.Schema({
username:String,
password:String,
}
);
var data2model=mongoose.model("Log",logschema)
module.exports=data2model