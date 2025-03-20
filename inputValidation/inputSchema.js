const zod = require("zod");
const emailSchema = zod.string().email();
const passwordSchema  = zod.string()
.min(8, { message: "Password must be at least 8 characters long" })
.max(20, { message: "Password must be at least 8 characters long" })
.refine((password) => /[A-Z]/.test(password), {
  message: "Password must contain at least one uppercase letter",
})
.refine((password) => /[a-z]/.test(password), {
  message: 'Password must contain at least one lowercase letter',
})
.refine((password) => /[0-9]/.test(password), { message: 'Password must contain at least one number' })
.refine((password) => /[!@#$%^&*]/.test(password), {
  message: 'Password must contain at least one special character (!@#$%^&*)',
});

const registerNumberData = ['IN34334987','IN89371647','IN78939123','IN78348902']

const firstnameSchema = zod.string();
const lastnameSchema = zod.string();

const requiredBody = zod.object({
    firstname:firstnameSchema,
    lastname: lastnameSchema,
    email: emailSchema,
    password: passwordSchema,
    registerNumber : zod.enum(registerNumberData,{message:"Incorrect Registration Number"})
});



module.exports = {requiredBody};