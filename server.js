const express = require ("express");
const mongoose = require ("mongoose")
const PORT =  2050;
const data = express();
data.use(express.json());


const dataschema=new mongoose.Schema(
 {
        
    data:{
        name:String,
        class:String, 
        course:String, 
        designation:String, },
        score:{
        html:Number, 
        css:Number, 
        javaScript:Number, 
        node:Number, }
    }
)

const user =mongoose.model("Blog", dataschema)
 
// blog.get("/",(req,res)=>{
//     res.status(200).json("welcome to my page")
//     // res.send("welcome to my page")
// })



//creating a data in database

data.post("/createdata", async (req,res)=>{
    const newResult = await new user (req.body);
    newResult.save()
    
    res.status(200).json(newResult)
    
})

// get all data

data.get("/getallstudent", async(req,res)=>{
    const  all  = await user.find();
    
    res.status(200).json({
        message:"the available user are" + all.length, data:all
    })
})

//get one
data.get("/getone/:id" , async(req, res)=>{
    const id =req.params.id
    const getone = await user.findById(id)
    
    res.status(200).json(
        {message:`kindly find the infomation of the user with the id of ${id}`, 
        data:getone}
    )

})

// delete a user
data.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    const deleteUser = await user.findByIdAndDelete((id))

    res.status(200).json(
       { message:`this infomation of the user with the id of ${id} has been delete`,
            data:deleteUser
    
            }
    )
})

data.put("/editstudent/:id", async (req, res)=>{
    const id = req.params.id;
    const edittask = await user.findByIdAndUpdate((id))
    res.status(201).json( {
        message: "update successful",
        title :edittask
    }
        
    )
    
})



mongoose.connect("mongodb+srv://oghenedemartin:eQX78GsvMNFP2p44@cluster0.rivgmxb.mongodb.net/")
.then(()=>{
   console.log("connection successful")
}) 
data.listen(PORT , ()=>{
    console.log(`server is listening to ${PORT}`)
})
