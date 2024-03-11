const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://rithinroy27:rithinroy27@cluster0.lczmmd9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("DB Connected order")})
let or=mongoose.Schema;
const orderSchema = new or({
  cartItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'cats' },
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'ships' },
  codInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
  });
  var ordermodel=mongoose.model("order",orderSchema)
module.exports=ordermodel;