const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://rithinroy27:rithinroy27@cluster0.kod0pin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));

let ad=mongoose.Schema;
const productSchema=new ad(
    {
  name: String,
  offer_price: Number,
  MRP: Number,
  category: String,
  quantity: Number,
  image1:{
    data:Buffer,
    contentType:String,
}


    }
);
var Product = mongoose.model("Product", productSchema);
module.exports=Product;

// const Product = mongoose.model("Product", productSchema);
