const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://rithinroy27:rithinroy27@cluster0.lczmmd9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("DB Connected cart")})
.catch(err=>console.log(err));

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cats',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

var CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
