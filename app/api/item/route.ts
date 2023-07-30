import { getProducts, createProduct } from "@/app/service/itemService";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v4 } from "uuid";

export const GET = async () => {
    const items = await getProducts()
    return NextResponse.json({ data:items });
}


export const POST = async (req: any) => {
    const data:any = await req.formData()
    const file: File | null = data.get('image') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false })
    }
    

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${v4()}.${file.name.split('.').pop()}`

    const path = `./public/images/${fileName}`
    const result = await writeFile(path, buffer)

    await createProduct({
        image : path.replace("./public/", "/"),
        name : data.get('name'),
        sellingPrice: parseInt(data.get('sellingPrice')),
        purchasedPrice : parseInt(data.get('purchasedPrice')),
        stock : parseInt(data.get('stock')),
    })

    return NextResponse.json({
        status: true,
        data: {}
    })
}


  