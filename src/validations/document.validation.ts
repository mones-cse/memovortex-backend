import { z } from 'zod'

export const documentCreateSchema = z.object({
    fileName: z.string().min(1).max(255),
    fileType: z.string().min(1).max(50),
    mimeType: z.string().min(1).max(100),
    fileSize: z.string().transform((val) => BigInt(val)),
    fileS3key: z.string().min(3).max(255),
    isDirectory: z.literal<boolean>(false),
    parentId: z.union([z.string().uuid(), z.null()]).optional(),
})

export const folderCreateSchema = z.object({
    fileName: z.string().min(1).max(255),
    isDirectory: z.literal<boolean>(true),
    parentId: z.union([z.string().uuid(), z.null()]).optional(),
})
