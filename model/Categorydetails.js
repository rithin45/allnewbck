const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://rithinroy27:rithinroy27@cluster0.kod0pin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));

let ca=mongoose.Schema;
const cateschema=new ca(
    {
        name:String,
        offer_price:String,
        MRP:String,
        category:String,
        image1:{
            data:Buffer,
            contentType:String,
        }
    }
);
var catemodel=mongoose.model("cat",cateschema)
module.exports=catemodel;