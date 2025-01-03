import z from "zod"

export const LoginSchema = z.object({
    email:z.string(),
    password:z.string(),
    role:z.enum(["admin","user"])
})

export type loginType = z.infer<typeof LoginSchema>