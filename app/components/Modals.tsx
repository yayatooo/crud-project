"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// { setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> },{product} : {product:PropsProducts[]}

const Modals = ({
  setOpenModal,
  getDataProduct,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  getDataProduct: any;
}) => {
  const [imageItem, setImageItem] = useState<any>(null);
  const [nameItem, setNameItem] = useState("");
  const [purchasedPrice, setPurchasedPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const router = useRouter();

  // {
  //         nameItem: nameItem,
  //         purchasedPrice : purchasedPrice,
  //         sellingPrice : sellingPrice,
  //         stock: stock
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = new FormData();
    data.append("image", imageItem);
    data.append("name", nameItem);
    data.append("sellingPrice", sellingPrice.toString());
    data.append("purchasedPrice", purchasedPrice.toString());
    data.append("stock", stock.toString());
    await axios.post("./api/item", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        //   'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        "Content-Type": `multipart/form-data`,
      },
    });
    setImageItem(null);
    setNameItem("");
    setPurchasedPrice(0);
    setSellingPrice(0);
    // router.push("/")
    getDataProduct();
    setOpenModal(false);
  };

  function handleImage(event: any) {
    setImageItem(event.target.files[0]);
  }

  return (
    <main className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500 bg-opacity-90 backdrop-blur-sm">
      <section className="w-10/12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6 py-12 rounded-lg shadow-xl bg-white"
        >
          <h1 className="text-2xl text-center py-6">Isi Form Data Barang 📦</h1>
          <div className="flex flex-col">
            <label className="w-10/12 mx-auto">input Gambar</label>
            <input
              type="file"
              onChange={(e) => handleImage(e)}
              // value={imageItem}
              placeholder="Gambar Barang"
              className=" w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="w-10/12 mx-auto">Nama Barang</label>
            <input
              type="text"
              onChange={(e) => setNameItem(e.target.value)}
              value={nameItem}
              placeholder="Nama Barang"
              className=" w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="w-10/12 mx-auto">Harga Barang</label>
            <input
              type="number"
              onChange={(e) => setPurchasedPrice(parseInt(e.target.value))}
              value={purchasedPrice}
              placeholder="Harga Barang"
              className=" w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="w-10/12 mx-auto">Harga Jual</label>
            <input
              type="number"
              onChange={(e) => setSellingPrice(parseInt(e.target.value))}
              value={sellingPrice}
              placeholder="Harga Jual"
              className=" w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="w-10/12 mx-auto">Stock</label>
            <input
              type="number"
              onChange={(e) => setStock(parseInt(e.target.value))}
              value={stock}
              placeholder="Stock"
              className=" w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg"
            />
          </div>
          <div className="w-10/12 mx-auto flex gap-x-4 justify-end">
            <button
              type="submit"
              className="bg-sky-600 px-3 py-1 rounded-md font-semibold w-20 text-white"
            >
              Submit
            </button>
            <button
              className="bg-red-600 px-3 py-1 rounded-md font-semibold w-20 text-white"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Modals;
