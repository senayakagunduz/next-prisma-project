"use server";
import db from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { productSchema, validateWidthZodSchema } from './schemas';
import { deleteImage } from './supabase';
import { revalidatePath } from 'next/cache';

export const getAuthUser = async () => {
    try {
        const user = await currentUser();
        if (!user) redirect('/');
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        redirect('/'); // Hata alındığında ana sayfaya yönlendir
    }
};

export const fetchFeaturedProducts = async () => {
    const products = await db.product.findMany({
        where: {
            featured: true,
        },
    })
    return products
}

export const fetchAllProducts = async ({ search = '' }: { search: string }) => {
    return db.product.findMany({
        where: {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } }
            ],
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

}

export const fetchSingleProduct = async (productId: string) => {
    const product = await db.product.findUnique({
        where: {
            id: productId
        }
    })
    if (!product) redirect('/products');
    return product;
}

export const createProductAction = async (
    prevState: any,
    formData: FormData
): Promise<{ message: string }> => {
    const user = await getAuthUser();

    try {
        const rawData=Object.fromEntries(formData.entries());
        const validatedFields = validateWidthZodSchema(productSchema,rawData);
       
        await db.product.create({
            data:{
                ...validatedFields,image:'/images/product-3.jpg',clerkId:user.id,
            }
        })
        return { message: 'product created' };
    } catch (error) {
        return renderError(error);
    }
};
export const deleteProductAction = async (prevState: { productId: string }) => {
    const { productId } = prevState;
    await getAdminUser();
    try {
      const product = await db.product.delete({
        where: {
          id: productId,
        },
      });
      await deleteImage(product.image);
      revalidatePath('/admin/products');
      return { message: 'product removed' };
    } catch (error) {
      return renderError(error);
    }
  };
  const getAdminUser = async () => {
    const user = await getAuthUser();
    if (user.id !== process.env.ADMIN_USER_ID) redirect('/');
    return user;
  };
  
  const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : 'an error occurred',
    };
  };

  export const fetchAdminProducts = async () => {
    await getAdminUser();
    const products = await db.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products;
  };