"use server"

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function signup(email: string, name:string, password: string) {
    // should add zod validation here
    const user = await prisma.user.create({
        data: {
            email: email,
            name:name,
            password: password,
        }
    });

    console.log(user.id);

    return "Signed up!"
}