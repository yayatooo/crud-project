import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface ItemInterface {  
    "image" : string
    "name" : string
    "sellingPrice": number
    "purchasedPrice" : number
    "stock" : number
}

export const getProducts = async () => {
    const res = await prisma.item.findMany()
    return res
}

export const getProduct = async (id:number) => {
    const res = await prisma.item.findFirst({
            where: { id: id },
    })
    return res
}

export const createProduct = async (params:ItemInterface) => {
    const res = await prisma.item.create({
        data: { 
            "image" : params.image,
            "name" : params.name,
            "sellingPrice": params.sellingPrice,
            "purchasedPrice" : params.purchasedPrice,
            "stock" : params.stock,
        }
    })
    return res
}

export const updateProduct = async (id:number, data:any) => {
    const res = await prisma.item.update({
        where: {
            id: id
        },
        data: { 
            "image" : data.image,
            "name" : data.name,
            "sellingPrice": data.sellingPrice,
            "purchasedPrice" : data.purchasedPrice,
            "stock" : data.stock,
        }
    })
    return res
}

export const deleteProduct = async (id:number) => {
    const res = await prisma.item.delete({
        where: {
            id: id
        },
    })
    return res
}