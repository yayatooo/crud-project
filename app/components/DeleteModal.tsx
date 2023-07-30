import React, { Dispatch } from "react";
import axios from "axios";
import itemReducer from "../store/itemReducer";

type Product = {
  id: number;
  image: string;
  name: string;
  sellingPrice: number;
  purchasedPrice: number;
  stock: number;
};

const DeleteModal = ({
  setOpenModalDelete,
  getDataProduct,
}: {
  setOpenModalDelete: Dispatch<React.SetStateAction<boolean>>;
  getDataProduct: any;
}) => {
  const product: any = itemReducer.getItem();
  const confirmDelete = async () => {
    await axios.delete(`./api/item/${product?.id}`);
    getDataProduct();
    setOpenModalDelete(false);
  };
  const cancelDelete = () => {
    setOpenModalDelete(false);
  };

  return (
    <main className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500 bg-opacity-90 backdrop-blur-sm">
      <section className="w-5/12 bg-white p-10 rounded-lg">
        <h1 className="pb-8">Are you sure to delete {product?.name} ?</h1>
        <div className="flex gap-x-4 justify-end">
          <button
            onClick={confirmDelete}
            type="submit"
            className="bg-sky-600 px-3 py-1 rounded-md font-semibold w-20 text-white"
          >
            Yes
          </button>
          <button
            onClick={cancelDelete}
            className="bg-red-600 px-3 py-1 rounded-md font-semibold w-20 text-white"
          >
            No
          </button>
        </div>
      </section>
    </main>
  );
};

export default DeleteModal;
