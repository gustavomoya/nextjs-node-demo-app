import { z } from 'zod';


const FormSchema = z.object({
    id: z.number().min(1),
    filename: z.string()
        .min(1, "Name is required")
        .max(255, "Name too long"),
    size: z.number(),
    created_at: z.string(),
    content: z
        .instanceof(File)
        .refine((file) => file.size > 0, "File is required")
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "File must be <= 5MB"
        ),
    user_id: z.number(),
});

export const CreateFile = FormSchema.omit({ id: true, size: true,  created_at: true, user_id: true});

export const UpdateFile = FormSchema.omit({size: true,  created_at: true, content: true, user_id: true});