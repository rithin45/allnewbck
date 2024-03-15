const express=require("express")
const cors=require("cors")
const multer=require('multer');
const storage=multer.memoryStorage();
const upload=multer({storage:storage});




const app=new express();
const catemodel=require('./model/Categorydetails')
const subcatemodel=require('./model/Subcategorydetails')
// const User=require("./model/Usrsignup") 
const data2model=require("./model/Adminlogin")
const CartItem=require("./model/Cart")
const shippingmodel=require("./model/Shipping")
const ordermodel=require("./model/Orderhis")
const FormDataModel=require('./model/Usrsignup')

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

// app.put('/edit/:id',async(request,response)=>{
//     let id=request.params.id
//     await catemodel.findByIdAndUpdate(id,request.body)
//     response.send("Data uploaded")
// });
app.put('/edits/:id',async(request,response)=>{
    let id=request.params.id
    await subcatemodel.findByIdAndUpdate(id,request.body)
    response.send("Data uploaded")
})
// app.post('/new',upload.single('image1'),async (request,response) => {
//     try {
//         const { name,offer_price,MRP,category} = request.body
//         const newdata = new catemodel({
//             name,offer_price,MRP,category,
//             image1: {
//                 data:request.file.buffer,
//                 contentType: request.file.mimetype,}
//         })
//         console.log(newdata);
//         await newdata.save();
//         response.status(200).json({ message: 'Record saved' });

//     }
//     catch (error) {
//         response.status(500).json({ error: 'Internal Server Error' });

//     }

// })


 


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
  });
  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.post('/address', async (req, res) => {
  try {
    const { fullName, addressLine1, addressLine2, city, postalCode, country } = req.body;
    const shippingAddress = { fullName, addressLine1, addressLine2, city, postalCode, country };
    // Save shipping address to the database
    res.json({ success: true, message: 'Shipping address saved successfully.', shippingAddress });
  } catch (error) {
    console.error('Error saving shipping address:', error);
    res.status(500).json({ success: false, message: 'Failed to save shipping address.' });
  }
});
app.get('/address', (req, res) => {
  // Return the shipping address data
  res.json(shippingAddressData);
});





app.get('/address',async(request,response)=>{
  var data=await shippingmodel.find();
  response.send(data)
});


app.post('/register', (req, res)=>{
  // To post / insert data into database

  const {email, password} = req.body;
  FormDataModel.findOne({email: email})
  .then(user => {
      if(user){
          res.json("Already registered")
      }
      else{
          FormDataModel.create(req.body)
          .then(log_reg_form => res.json(log_reg_form))
          .catch(err => res.json(err))
      }
  })
  
})

app.post('/login', (req, res)=>{
  // To find record from the database
  const {email, password} = req.body;
  FormDataModel.findOne({email: email})
  .then(user => {
      if(user){
          // If user found then these 2 cases
          if(user.password === password) {
              res.json("Success");
          }
          else{
              res.json("Wrong password");
          }
      }
      // If user not found then 
      else{
          res.json("No records found! ");
      }
  })
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







  app.post('/new', upload.single('image1'), async (request, response) => {
    try {
        const {name,offer_price,MRP,category } = request.body
        const newdata = new catemodel({
          name,offer_price, MRP,category,
            image1: {
                data: request.file.buffer,
                contentType: request.file.mimetype,}
        })
        console.log(newdata);
        await newdata.save();
        response.status(200).json({ message: 'Record saved' });
       
        }
    catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.put('/edit/:id', upload.single('image1'), async (request, response) => {
    try {
        const id = request.params.id;
        const { name,offer_price,MRP,category} = request.body;
        let result = null;
        if (request.file) {
            console.log("hi")
            const updatedData = {
                name,
                offer_price,
                MRP,
                category,
                image1: {
                    data: request.file.buffer,
                    contentType: request.file.contentType,
                }

            };
            result = await catemodel.findByIdAndUpdate(id.updatedData);

        }
        else {
            const updatedData = {
              name,
              offer_price,
              MRP,
              category,
            }
            result = await catemodel.findByIdAndUpdate(id, updatedData);

        }
        if (!result) {
            return response.status(404).json({ message: 'Item not found' });
        }
        response.status(200).json({ message: 'Item updates successfully', data: result });


    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/order', async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingAddressId, codInfo } = req.body;
    const newOrder = new ordermodel({ cartItems, totalAmount, shippingAddress: shippingAddressId, codInfo });
    await newOrder.save();
    res.json({ success: true, message: 'Order placed successfully.', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order.' });
  }
});

app.get('/order', async (req, res) => {
  try {
    // Retrieve orders from the database
    const orders = await ordermodel.find();
    res.json({ success: true, orders: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
});
