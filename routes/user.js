const {Router} = require("express");
const  userRouter = Router();
const {userModel,courseModel,adminModel, purchaseModel} = require("../db");
const {requiredBody} = require("../inputValidation/inputSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;
const {JWT_USER_PASSWORD} = require("../config");
const{userMiddleware} = require("../middleware/user")
 


userRouter.post("/signup",async(req,res)=>{
        console.log(req.body)
        const parseData = requiredBody.safeParse(req.body);
        
        if(!parseData.success)
        {
                const errorMessages = parseData.error.errors.map(error => ({
                        field: error.path.join('.'),
                        message: error.message
                    }));
                    
                    return res.status(400).json({
                        success: false,
                        errors: errorMessages
                    });
        }

        else{
                const email = req.body.email;
                const password = req.body.password;
                const firstname = req.body.firstname;
                const lastname = req.body.lastname;
                console.log(email)
                try
                {
                        const existingUser = await userModel.findOne({ email });
                        if (existingUser) {
                            return res.status(400).json({
                                success: false,
                                message: "User already exists"
                            });
                        }
                const hashPassword = bcrypt.hashSync(password,saltRound);

                await userModel.create({
                        email:email,
                        password:hashPassword,
                        firstname:firstname,
                        lastname:lastname

                }) ;
                res.json({message:"Sign-up successfully."})
                }
                catch(err){
                        console.log(err);
                        res.status(500).json({
                                message: "Internal server error"
                        })
                }
        }
});

userRouter.post("/signin",async(req,res)=>{
       try {
        const {email,password} = req.body;
        
        const user = await userModel.findOne({email});
        console.log(user)
        if(!user)
        {
                res.json({message:"User doesn't exsist"});
        }

        const isValid = await bcrypt.compare(password,user.password);

        if(email!==user.email||!isValid)
                res.json({message:"Incorret email or password"})

        const token = jwt.sign({id:user._id},JWT_USER_PASSWORD,{expiresIn:'24h'});

        res.json({message:"Sign-in successfully",
                token
        })
        
       } catch (error) {
                res.json({message:"Internal Server Error"});
       }
})

userRouter.get("/profile", userMiddleware, async (req, res) => {
        try {
            const userId = req.userId;
            const user = await userModel.findById(userId).select('-password');
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.json(user);
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
module.exports = {
        userRouter
}