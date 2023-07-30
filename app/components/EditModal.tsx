"use client"
import {useState} from 'react'
import Image from "next/image";
import axios from 'axios'
import itemReducer from '../store/itemReducer';


// { setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> },{product} : {product:PropsProducts[]}

type Product = {
  "id" : number  
  "image" : string  
  "name" : string
  "sellingPrice": number
  "purchasedPrice" : number
  "stock" : number
}

const EditModal = ({ setOpenModalEdit, getDataProduct }: { setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>, getDataProduct: any}) => {

        const product: any = itemReducer.getItem()
        const [imageItem, setImageItem] = useState<any>(null)
        const [nameItem, setNameItem] = useState(product.name)
        const [purchasedPrice, setPurchasedPrice] = useState(product.purchasedPrice)
        const [sellingPrice, setSellingPrice] = useState(product.sellingPrice)
        const [stock, setStock] = useState(product.stock)

        const handleSubmit = async (e:any) => {
                e.preventDefault();
                let data = new FormData();
                if (imageItem) {
                  data.append('image', imageItem);
                }
                data.append('name', nameItem);
                data.append('sellingPrice', sellingPrice.toString());
                data.append('purchasedPrice', purchasedPrice.toString());
                data.append('stock', stock.toString());
                await axios.put(`./api/item/${product.id}`, data, {
                  headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data`,
                  }
                })
                setImageItem(null)
                setNameItem("")
                setPurchasedPrice(0)
                setSellingPrice(0)
                getDataProduct()
                setOpenModalEdit(false)
        }

        function handleImage(event: any) {
          setImageItem(event.target.files[0])
        }

  return (
    <main className="fixed inset-0 z-40 flex items-center justify-center bg-gray-500 bg-opacity-90 backdrop-blur-sm" >
        <section className='w-10/12'>
            <form onSubmit={handleSubmit} className='flex flex-col w-full mx-auto gap-y-6 items-center py-12 rounded-lg shadow-xl bg-white'>
                <h1 className='text-2xl'>Isi Form Data Barang 📦</h1>
                <input 
                type='file'
                onChange={(e) => handleImage(e)} 
                // value={imageItem}
                placeholder='Gambar Barang'
                className=' w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg' 
                />
                <Image src={product.image} width={400} height={400} alt="fotobarang" />
                <input 
                type='text'
                onChange={(e) => setNameItem(e.target.value)} 
                value={nameItem} 
                placeholder='Nama Barang'
                className=' w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg' 
                />
                <input 
                type='number' 
                onChange={(e) => setPurchasedPrice(parseInt(e.target.value))} 
                value={purchasedPrice}
                placeholder='Harga Barang'
                className=' w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg' 
                />
                <input 
                type='number'
                onChange={(e) => setSellingPrice(parseInt(e.target.value))} 
                value={sellingPrice} 
                placeholder='Harga Jual'
                className=' w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg' 
                />
                <input 
                type='number' 
                onChange={(e) => setStock(parseInt(e.target.value))} 
                value={stock}
                placeholder='Stock'
                className=' w-10/12 mx-auto py-3 px-6 bg-slate-100 rounded-lg' 
                />
                <div className='flex gap-x-4'>
                    <button type='submit' className='bg-sky-600 px-3 py-1 rounded-md font-semibold w-20 text-white'>Submit</button>
                    <button className='bg-red-600 px-3 py-1 rounded-md font-semibold w-20 text-white' onClick={() => setOpenModalEdit(false)}>Cancel</button>
                </div>
            </form>
        </section>
    </main>
  )
}

export default EditModal
