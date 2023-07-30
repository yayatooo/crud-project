import { deleteProduct, getProduct, updateProduct } from "@/app/service/itemService";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from 'fs/promises'
import { v4 } from "uuid";



export async function GET(req:NextRequest, res:any) {
    const id = res.params.id
    let item = await getProduct(id)
    return NextResponse.json({
        status: true,
        data: item
    })
}

export async function PUT(req:NextRequest, res:any) {
    const id = parseInt(res.params.id)
    const data: any = await req.formData()
    const file: File | null = data.get('image') as unknown as File

    let item:any = await getProduct(id)

    if (file) {
        await unlink(`./public/${item.image}`)

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const fileName = `${v4()}.${file.name.split('.').pop()}`

        const path = `./public/images/${fileName}`
        const result = await writeFile(path, buffer)
        item.image = path.replace("./public/", "/")
    }

    const update = {
        name: data.get('name'),
        sellingPrice: parseInt(data.get('sellingPrice')),
        purchasePrice: parseInt(data.get('purchasePrice')),
        stock: parseInt(data.get('stock')),
        image: item.image
    }
    
    await updateProduct(id, update)

    item = await getProduct(id)

    return NextResponse.json({
        status: true,
        data: item
    })
}

export async function DELETE(req:NextRequest, res:any) {
    const id = parseInt(res.params.id)
    await deleteProduct(id)
    return NextResponse.json({
        status: true,
        data: {}
    })
} 