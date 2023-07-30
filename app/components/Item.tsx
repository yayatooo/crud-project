"use client"
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import Loading from "./loading";
import Modals from "./Modals";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import itemReducer from "../store/itemReducer";
import { NumericFormat } from "react-number-format";



export interface PropsProducts {
    "id" : number  
    "image" : string  
    "name" : string
    "sellingPrice": number
    "purchasedPrice" : number
    "stock" : number
}

export default function Item() {

  const [products, setProducts] = useState<PropsProducts[]>([])
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const api = "./api/item"

  const getDataProduct = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      console.log(data);
      setLoading(false)
      setProducts(data.data);
      
      
    } catch (error) {
      console.log(error);
      setLoading(false)
      
    }
    
  }

  const editModal = (data:any) => {
    itemReducer.setItem(data)
    setOpenModalEdit(true)
  }

  const deleteModal = (data:any) => {
    itemReducer.setItem(data)
    setOpenModalDelete(true)
  }
 
  useEffect(() => {
    getDataProduct()
  },[])
  

  return (
<>
    <section className="w-10/12 mx-auto flex justify-between">
        <button className="bg-sky-600 px-3 py-1 rounded-md text-white" onClick={() => setOpenModal(true)}>Tambah Data</button>
    </section>
        <section className="py-12 flex flex-col gap-y-8">
            {loading ? (
                <section className="w-10/12 mx-auto text-center my-48">
                    <Loading />
                </section>
            ) : (
                <>
                {products.map((data,i) => {
                return (
                <div className="w-10/12 mx-auto flex justify-between bg-slate-100 hover:bg-slate-200 p-8 rounded-lg" key={i}>
                    <div className="flex gap-x-4">
                        <Image src={data.image} width={100} height={100} alt="fotobarang" />
                            <div className="flex flex-col w-full">
                            <h1>Nama Barang : {data.name}</h1>
                            <p>Harga Beli : <NumericFormat  value={data.purchasedPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/></p>
                            <p >Harga Jual : <span className="text-green-600"><NumericFormat  value={data.sellingPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/></span></p>
                            <p>Stok : {data.stock}</p>
                            </div>
                    </div>
                    <div className="flex flex-col gap-y-4 text-white">
                        <button className="bg-sky-600 px-3 py-1 rounded-md" onClick={() => editModal(data)}>Edit</button>
                        <button className="bg-red-600 px-3 py-1 rounded-md" onClick={() => deleteModal(data)}>Delete</button>
                    </div>
                </div>
                )
            })}
                </>
            )}
        </section>
        {openModalDelete && (
            <DeleteModal setOpenModalDelete={setOpenModalDelete} getDataProduct={getDataProduct} />
        )}
        {openModalEdit && (
            <EditModal setOpenModalEdit={setOpenModalEdit} getDataProduct={getDataProduct} />
        )}
        {openModal && (
            <Modals setOpenModal={setOpenModal} getDataProduct={getDataProduct}  />
        )}
</>

)}

