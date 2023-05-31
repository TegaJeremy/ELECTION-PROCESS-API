const express = require ("express");
const mongoose = require ("mongoose")
const PORT =  2053;
const data = express();
data.use(express.json());


const communityschema=new mongoose.Schema(
 {
         state:String,
         parties:[String],
         result:{
            apc: Number,  
            lp:Number,
            pdp:Number,
            apaga:Number,
            nnpp: Number
           },
         collectionOfficer:String,
         isRigged:Boolean, 
         totalLG:Number,
         }
    
)

const user =mongoose.model("universe", communityschema)
 
//creating a state in database

data.post("/createdata", async (req,res)=>{
    const newResult = await new user (req.body);
    newResult.save()
    
    res.status(200).json(newResult)
    
})

// get all state

data.get("/getallstate", async(req,res)=>{
    const  all  = await user.find();
    
    res.status(200).json({
        message:"the available user are:" + all.length, data:all
    })
})

//get one  state
data.get("/getonestate/:id" , async(req, res)=>{
    const id =req.params.id
    const getone = await user.findById(id)
    
    res.status(200).json(
        {message:`the infomations of this ${id} is:`, 
        data:getone}
    )

})

// delete a state
data.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id;
    const deleteUser = await user.findByIdAndDelete((id))

    res.status(200).json(
       { message:`this infomation of the user with the id of ${id} has been delete`,
            data:deleteUser
    
            }
    )
})



data.put( "/updatestate/:Id", async ( req, res ) => {
    try {
        const stateId = req.params.Id;
        const data = await user.findById( stateId );
        
        const bodyData = {
        state: req.body.state || data.state,
        parties: req.body.parties || data.parties,
        result: {
            apc: req.body.apc || data.result.apc,
            lp: req.body.lp || data.result.lp,
            pdp: req.body.pdp || data.result.pdp,
            apaga: req.body.apaga || data.result.apaga,
            nnpp: req.body.nnpp || data.result.nnpp
            },
            collectionOfficer: req.body.collectionOfficer || data.collectionOfficer,
            isRiggedr: req.body.isRigged || data.isRigged,
            totalLG:req.body.totalLG|| data.totalLG,
        }

        await user.updateOne( bodyData );
        if ( bodyData ) {
            res.status(200).json(bodyData);
        } else {
            res.status( 400 ).json( {
                Error: 'Error updating id.'
            })
        }
    } catch ( e ) {
        res.status( 400 ).json( {
            Message: e.message
        })
    }
} )


        

mongoose.connect("mongodb+srv://oghenedemartin:eQX78GsvMNFP2p44@cluster0.rivgmxb.mongodb.net/")
.then(()=>{
   console.log("connection successful")
}) 
data.listen(PORT , ()=>{
    console.log(`server is listening to ${PORT}`)
})
