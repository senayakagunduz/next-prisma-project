import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'

const createProductAction=async(formData:FormData)=>{
  'use server'
  const name=formData.get('name') as string;
  console.log(name)
}
function EditProductPage() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create product</h1>
      <div className="border p-8 rounded-md">
        <form action={createProductAction}>
          <div className="mb-3">
            <Label htmlFor='name'>Product Name</Label>
            <Input id='name' name='name' type='text'/>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditProductPage
