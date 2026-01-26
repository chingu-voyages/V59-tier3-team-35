import bcrypt from "bcrypt";
import fs from 'fs';
import { Account } from './types';
import { PrismaClient } from "@prisma/client/extension";

// this is actually supposed to be imported from a json file
const items: any[] = [] 

const prisma = new PrismaClient()

// Accounts
const createPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

const seedAccount = async (item: Account, hashPassword = false) => {
    const existing = await prisma.account.findFirst({
        where: { id: item.id }
    })
    if (!existing) {
        const created = await prisma.account.create({
            data: {
                ...item,
                createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
                updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
            }
        })
        console.log("created", created.id)
        return created
    }
}

const seedData = async () => {
    const createdItems: any[] = []
    console.log("Creating items ...")
    for (const item of items) {
        const created = await seedAccount(item)
        if (created) {
            createdItems.push(created)
        }
    }
    console.log("List of created items: \n", createdItems.length)
}


const writeToFile = (fileName: string, object: any) => {
    fs.writeFile(fileName, JSON.stringify(object), 'utf8', () => { });
}


seedData()
