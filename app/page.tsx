import { Suspense } from "react";
import Loading from "./utils/loading";
import Item from "./components/Item";


export default function Home() {

  return (
    <main className="w-full font-poopins font-semibold">
      <nav className="w-5/12 mx-auto text-center py-20">
        <h1 className="text-3xl">Data Barang 📦</h1>
      </nav>
      <Suspense fallback={<Loading/>}>
        <Item />
      </Suspense>
    </main>
  )
}
