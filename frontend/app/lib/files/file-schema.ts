import { z } from 'zod';


const FormSchema = z.object({
    id: z.number().min(1),
    filename: z.string()
        .min(1, "Name is required")
        .max(255, "Name too long"),
    size: z.number(),
    created: z.string(),
    content: z
        .instanceof(File)
        .refine((file) => file.size > 0, "File is required")
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "File must be <= 5MB"
        ),
    user_id: z.number(),
});

export const CreateFile = FormSchema.omit({ id: true, size: true,  created: true, user_id: true});

export const UpdateFile = FormSchema.omit({ id: true, size: true,  created: true, content: true, user_id: true});


// export const UpdateFileSchema = z.object({
//     id: z.number().min(1),
//     filename: z
//         .string()
//         .min(1, "Name is required")
//         .max(255)
//         .optional(),
//     file: z
//         .instanceof(File)
//         .refine((f) => f.size > 0, "Invalid file")
//         .refine((f) => f.size <= 5 * 1024 * 1024, "Max 5MB")
//         .optional(),
// });
