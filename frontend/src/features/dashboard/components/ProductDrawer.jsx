import { X } from "lucide-react";
import { useState } from "react";

export default function ProductDrawer({
  open,
  onClose,
  onSave
}) {

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });


  if (!open) return null;


  const handleChange = (e)=>{
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };


  const submitHandler=(e)=>{
    e.preventDefault();

    onSave(product);

    setProduct({
      name:"",
      category:"",
      price:"",
      stock:""
    });

    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="
        flex-1
        bg-black/40
        backdrop-blur-sm
        "
      />


      {/* Drawer */}

      <div
      className="
      w-[420px]
      bg-white
      h-full
      shadow-2xl
      p-6
      animate-slide-in
      "
      >


        <div className="
        flex
        justify-between
        items-center
        mb-6
        ">

          <h2 className="
          text-xl
          font-bold
          ">
            Add Product
          </h2>


          <button
          onClick={onClose}
          >
            <X/>
          </button>


        </div>



        <form
        onSubmit={submitHandler}
        className="space-y-4"
        >


          <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          "
          />



          <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          "
          />



          <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          "
          />


          <input
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          "
          />


          <button
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-lg
          hover:bg-blue-700
          "
          >
            Save Product
          </button>


        </form>


      </div>

    </div>
  );
}