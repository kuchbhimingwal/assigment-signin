import NextAuth from "next-auth"
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials';
const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
          const res = await prisma.user.findUnique({
            where:{
              email: credentials.email,
              password: credentials.password
            }
          });
          if(!res){
            return null
          }else{
              return {
                id: res.id,
                name: res.name,
                email: res.email
              };
          }
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // pages:{
  //   signIn:"/signin"
  // }
})

export const GET = handler;
export const POST = handler;