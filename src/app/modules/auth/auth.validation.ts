import z from 'zod'



const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Id is required' }).email({ message: 'invalied email' }),
        password: z.string({ required_error: 'Password is required' })
    })
})


export default loginValidationSchema;
