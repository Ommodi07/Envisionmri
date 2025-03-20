const z = require("zod")


const patientSchema = z.object({
    name:z.string().max(10,{message:'Name should not be greater than 10 characters'}),
    age:z.number().min(15,{message:'Patient age should be greater than 15.'}).max(90,{message:'Patient age should less than 90'}),
    gender: z.enum(["male","female"]),
    medicalHistory: z.string(),
    contactNumber: z.string()
})
  

module.exports = {patientSchema}