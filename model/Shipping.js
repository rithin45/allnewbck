const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://rithinroy27:rithinroy27@cluster0.lczmmd9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("DB connected shipping")})
.catch(err=>console.log(err));

let sh=mongoose.Schema;
const shipschema=new sh(
    {
        fullName: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      postalCode: String,
      country: String
    }
);
var shippingmodel=mongoose.model("ship",shipschema)
module.exports=shippingmodel;