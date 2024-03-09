const express=require("express")
const cors=require("cors")
const multer=require('multer');
const storage=multer.memoryStorage();
const upload=multer({storage:storage});




const app=new express();
const catemodel=require('./model/Categorydetails')
const subcatemodel=require('./model/Subcategorydetails')
const User=require("./model/Usrsignup") 
const data2model=require("./model/Adminlogin")
const CartItem=require("./model/Cart")

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());


app.listen(3005,(request,response)=>{
    console.log("port is running in 3005")

})





app.get('/',(request,response)=>{
    response.send("hai")

})

app.post('/cnew',(request,response)=>{
    console.log(request.body)
    new subcatemodel(request.body).save();
    response.send("Record Successfully Saved")

})
app.get("/categoryview",async(request,response)=>{
    var data=await catemodel.find();
    response.send(data);
});

app.get("/subview",async(request,response)=>{
    var data=await subcatemodel.find();
    response.send(data);
});


app.get('/view',async(request,response)=>{
    var data=await catemodel.find();
    console.log(data)
    response.send(data)
});
app.get('/views',async(request,response)=>{
    var data=await subcatemodel.find();
    response.send(data)
});

app.put('/edit/:id',async(request,response)=>{
    let id=request.params.id
    await catemodel.findByIdAndUpdate(id,request.body)
    response.send("Data uploaded")
});
app.put('/edits/:id',async(request,response)=>{
    let id=request.params.id
    await subcatemodel.findByIdAndUpdate(id,request.body)
    response.send("Data uploaded")
})
app.post('/new',upload.single('image1'),async (request,response) => {
    try {
        const { name,offer_price,MRP,category} = request.body
        const newdata = new catemodel({
            name,offer_price,MRP,category,
            image1: {
                data:request.file.buffer,
                contentType: request.file.mimetype,}
        })
        console.log(newdata);
        await newdata.save();
        response.status(200).json({ message: 'Record saved' });

    }
    catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });

    }

})


  app.post('/register', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered. Please login.' });
      }
  
      // If the email doesn't exist, proceed with registration
      User.create(req.body)
        .then(register => res.status(201).json({ message: 'Registration successful.', data: register }))
        .catch(err => res.status(500).json({ message: 'Internal server error.', error: err }));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  })


  app.post('/Loginsearch',async(request,response)=>{
    const {username,password}=request.body;
    try{ const user=await data2model.findOne({username,password});
    if(user)
    {response.json({success: true,message:'Login Successfully'});}
    else
    {response.json({success: false,message:'Invalid Username and email'});}
    }
    catch(error)
    {
    response.status(500).json({sucess: false,message:'Error'})
    }
    })



    app.post('/addtocart/:productId', async (req, res) => {
      try {
        const productId = req.params.productId;
        
        // Check if the product is already in the cart
        let cartItem = await CartItem.findOne({ productId });
        
        // if (cartItem) {
        //   // If the product is already in the cart, increase its quantity
        //   cartItem.quantity += 1;
        // } else
         {
          // If the product is not in the cart, create a new cart item
          cartItem = new CartItem({ productId });
        }
        
        // Save the cart item
        await cartItem.save();
        
        res.status(200).json({ message: `Product added to cart: ${productId}` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });


    // app.get('/cart', async (req, res) => {
    //   try {
    //     const cartItems = await CartItem.find();
    //     res.json(cartItems);
    //   } catch (err) {
    //     res.status(500).json({ message: err.message });
    //   }
    // });
    
    // // Delete a cart item
    // app.delete('/cart/:id', async (req, res) => {
    //   try {
    //     await CartItem.findByIdAndRemove(req.params.id);
    //     res.json({ message: 'CartItem deleted' });
    //   } catch (err) {
    //     res.status(500).json({ message: err.message });
    //   }
    // });
    


    // Get cart items
    app.get('/cart', async (req, res) => {
      try {
        const result = await CartItem.aggregate([
          {
            $lookup: {
              from: "cats",
              localField: "productId",
              foreignField: "_id",
              as: "subc",
            },
          }
        ]);
        
        res.send(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

// Add to cart
app.post('/cart', async (req, res) => {
  const cartItem = new CartItem({
    productId: req.body.productId,
    quantity: req.body.quantity
  });
  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove from cart
app.delete('/cart/:id', async (req, res) => {
  console.log(req.body)
  try {
    await CartItem.findByIdAndRemove(req.params.id);
    res.json({ message: 'CartItem removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 