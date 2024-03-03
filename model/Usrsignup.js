const mongoose=require("mongoose") 
mongoose.connect('mongodb+srv://rithinroy27:rithinroy27@cluster0.kod0pin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=>{console.log("DB connected Usersign")})
.catch(err=>console.log(err));
  // Define a user schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
  });
  
  // Define a user model
//   const User = mongoose.model('User', userSchema);
  var User=mongoose.model("user",userSchema)
module.exports=User;
  