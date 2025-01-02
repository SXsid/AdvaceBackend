import z from "zod"
export const authReq = z.object({
    name:z.string(),
    password:z.string().min(4),
    role:z.enum(["admin","manager","user"])
})

export type authReqType = z.infer<typeof authReq>