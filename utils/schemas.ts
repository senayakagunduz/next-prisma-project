import { z, ZodSchema } from 'zod';

export const productSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).max(100, { message: 'Name must be at most 100 characters long' }),
    company: z.string().min(4, { message: 'Company must be at least 4 characters long' }),
    price: z.coerce.number().int().min(0),
    description: z.string().refine((description) => {
        const wordCount = description.split(' ').length;
        return wordCount >= 10 && wordCount <= 1000;
    },{
        message: 'Description must be between 10 and 1000 words',
    }),
    featured: z.coerce.boolean(),
});

// coerce: Gelen değeri otomatik number'a çevirir (örneğin, formdan gelen string "100" → 100).
// refine: Özel bir doğrulama kuralı ekler.

export function validateWidthZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);
    if(!result.success){
        const errors=result.error.errors.map((error: any)=>error.message);
        throw new Error(errors.join(','))
    }
   return result.data;
}

export const imageSchema=z.object({
    image:validateImageFile()
})

function validateImageFile() {
    const maxUploadSize = 1024 * 1024;
    const acceptedFileTypes = ['image/'];
    return z
      .instanceof(File)
      .refine((file) => {
        return !file || file.size <= maxUploadSize;
      }, `File size must be less than 1 MB`)
      .refine((file) => {
        return (
          !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        );
      }, 'File must be an image');
  }