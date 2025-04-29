"use client"
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAdminProductDetails, updateProductImageAction } from "@/utils/actions";
import React from "react";


async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProductDetails(id);
  const { name, company, description, featured, price } = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer action={updateProductImageAction} name={name} image={product.image} text='update image'>
          <FormContainer action={updateProductImageAction}>
            <input type='hidden' name='id' value={id} />
            <input type='hidden' name='url' value={product.image} />
          </FormContainer>
        </ImageInputContainer>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <Input name="id" type="hidden" value={id} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              defaultValue={name}
            />
            <PriceInput defaultValue={price}/>
          </div>
          <TextAreaInput name='description' labelText='product Description' defaultValue={description}/>
          <div className="mt-6">
            <CheckboxInput name='featured' defaultChecked={featured} label='featured'/>
          </div>
          <SubmitButton text='update product' className="mt-8"/>
        {/* </FormContainer> */}
      </div>
    </section>
  );
}

export default EditProductPage;
