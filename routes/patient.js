const Router = require("express");
const {patientModel} = require("../db")
const patientRouter = Router();
const {patientSchema} = require("../inputValidation/patientSchema")
const {userMiddleware} = require("../middleware/user")
patientRouter.post("/add-patient", userMiddleware, async (req, res) => {
   try {
        const userId = req.userId;
        const parsedData = patientSchema.safeParse(req.body)
        
        if (!parsedData.success) {
            return res.status(403).json({
                message: "Invalid input is send",
                errors: parsedData.error.errors
            });
        }
       
        const {name, age, gender, medicalHistory, contactNumber} = parsedData.data;
        
        // Ensure medicalHistory is an array
   
        
        const patient = await patientModel.create({
            name,
            age,
            gender,
            medicalHistory,
            contactNumber,
            userId
        });

        return res.status(200).json({
            message: "Patient added successfully",
            patient
        });
   } catch(error) {
        console.error("Error creating patient:", error);
        return res.status(500).json({message: "Internal Server Error"});
   }
});

   patientRouter.delete('/delete-patient/:id',userMiddleware,async(req,res)=>{
        try{
            const userId = req.userId;
            const patientId = req.params.id;
            if(!userId)  
            {
                res.status(401).json({message:'Not Authorised'});
                return;
            }
            
            if(!patientId)
            {
                res.status(403).json({
                    message: 'Patient id is requried'
                })
                return;
            }

            const patient = await patientModel.findOneAndDelete({
                _id:patientId,
                userId
            })
            if(!patient)
            {
                res.status(404).json({
                    message:'Patient not found'
                })
            }
            res.status(200).json({
                message: 'Patient deleted successfully'
            })
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:'Internal Server Error'});

        }
   })

   module.exports = {patientRouter}