import z from "zod"

export const LoginSchema = z.object({
    email:z.string(),
    password:z.string(),
    role:z.enum(["admin","user"])
})
export const verifiySchema =z.object({
    otp:z.string().min(6)
})
export type loginType = z.infer<typeof LoginSchema>
export type verifiyType = z.infer<typeof verifiySchema>