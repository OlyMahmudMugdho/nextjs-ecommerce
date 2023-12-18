import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";


type Props = {};

type Name = {name : string}

async function AddProduct(formData : FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const imageUrl = formData.get("imageUrl")?.toString();

  if(!name || !description || !price || !imageUrl){ 
    throw new Error("Empty fields");
  }

  await prisma.products.create({
    data : {name,description,imageUrl,price,}
  });

  redirect("/");
}

function page({}: Props) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center px-2 md:px-4 lg:px-8 py-8">
      <div className="w-full flex flex-col justify-center items-center py-5 lg:py-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl">Add Product</h1>
      </div>
      <form
        action={AddProduct}
        className="w-full flex flex-col justify-center items-center gap-2"
      >
        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <div className="w-full py-2">
            <label htmlFor="name" className="label-text">Name</label>
          </div>
          <input type="text" className="w-full input input-bordered" name="name" required />
        </div>


        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <div className="w-full py-2">
            <label htmlFor="description" className="label-text">Description</label>
          </div>
          <input type="text" className="w-full input input-bordered" name="description"required />
        </div>


        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <div className="w-full py-2">
            <label htmlFor="price" className="label-text">Price</label>
          </div>
          <input type="text" className="w-full input input-bordered" name="price" required/>
        </div>

        

        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <div className="w-full py-2">
            <label htmlFor="imageUrl" className="label-text">Image URL</label>
          </div>
          <input type="text" className="w-full input input-bordered" name="imageUrl" required/>
        </div>
        
        <div className="w-10/12 md:w-8/12 lg:w-6/12">
          <div className="w-full py-2">
          <FormSubmitButton>
          Add Product
          </FormSubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default page;
