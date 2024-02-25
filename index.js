const express=require("express")
const cors=require("cors")
const multer=require('multer');
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
// const bodyParser = require('body-parser');

// const CategoryRouter = require('./routes/Categoryroutes')
// const SubcateRouter = require('./Routes/Subcateroutes')
// const db = require("./Connection/Database")
// const username = 'admin';
// const password = 'password';



const app=new express();
const catemodel=require('./model/Categorydetails')
const subcatemodel=require('./model/Subcategorydetails')
const Product=require("./model/Addproduct")
// const Signupp=require("./routes/Signupp")
// const Db=require("./connection/Db")
const User=require("./model/Usrsignup") 

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

app.listen(3005,(request,response)=>{
    console.log("port is running in 3005")

})
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Specify the directory where files will be uploaded
//     },
//     filename: function (req, file, cb) {
//       const ext = file.originalname.split('.').pop();
//       cb(null, Date.now() + '.' + ext); // Generate unique filename
//     }
//   });

//   const upload = multer({ storage: storage });


// app.use("/c", CategoryRouter)

// app.use("/s", SubcateRouter)

// app.use("/register", Signupp)




app.get('/',(request,response)=>{
    response.send("hai")

})
// app.post('/new',(request,response)=>{
//     console.log(request.body)
//     new catemodel(request.body).save();
//     response.send("Record Successfully Saved")

// })
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
// app.post('/Loginsearch', async (request, response) => {
//     const { username, password } = request.body;
//     console.log(request.body)
//     try {
//         const user = await data2model.findOne({ username,password });
      
//         if (user === validUsername && user=== validPassword) {
//           response.json({ success: true, message: 'Login successful' });
//         }
//          else {
//           response.json({ success: false, message: 'Invalid Password and email' });
//         }
//       } catch (error) {
//         response.status(500).json({ success: false, message: 'Error during login' });
//       }
  
// })
// app.post('/Loginsearch', async (request, response) => {
//     const { username, password } = request.body;
//     try {
//         // Query the database to find the user
//         const user = await data2model.findOne({ username, password });
//         if (user) {
//             response.json({ success: true, message: 'Login successful' });
//         } else {
//             response.json({ success: false, message: 'Invalid username or password' });
//         }
//     } catch (error) {
//         response.status(500).json({ success: false, message: 'Error during login' });
//     }
// });
// app.listen(5005, (request, response) => {
//     console.log("Port ok")
// })

// app.post('/addToCart', (req, res) => {
//     const { name, offer_price, MRP, category, quantity } = req.body;
//     const product = new addpro({ name, offer_price, MRP, category, quantity });
//     product.save()
//       .then(() => {
//         res.status(200).json({ message: 'Record saved' });
//       })
//       .catch(err => {
//         console.error(err);
//         res.status(500).send("Error adding product to cart");
//       });
//   });

//   app.get('/cart', async (req, res) => {
//     try {
//       const cartItems = await vewmodel.find(); // Assuming all products are in the cart
//       res.status(200).json(cartItems);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   app.delete('/cart/:productId', async (req, res) => {
//     try {
//       const { productId } = req.params;
//       await vewmodel.findByIdAndDelete(productId);
//       res.status(200).json({ message: 'Product removed from cart' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

app.post('/addtocart', upload.single('image1'), async (req, res) => {
    try {
      const { name, offer_price, MRP, category,quantity } = req.body;
    
      
      const product = new Product({
        name,
        offer_price,
        MRP,
        category,
        quantity,
        image1: {
            data:request.file.buffer,
            contentType: request.file.mimetype,}
      });
  
      await product.save();
      res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 
  
  // Route to handle user registration
//   app.post('/register', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const newUser = new User({ email, password });
//       await newUser.save();
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
  
//   // Route to handle user login
//   app.post('/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user || user.password !== password) {
//         throw new Error('Invalid email or password');
//       }
//       res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//       res.status(401).json({ error: error.message });
//     }
//   });
  
  // Start the server
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });


// app.post('/register', async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       // Check if the email is already registered
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Email already registered' });
//       }
//       // Create a new user
//       const newUser = new User({ name, email, password });
//       await newUser.save();
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
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