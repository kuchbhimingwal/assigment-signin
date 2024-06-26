
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from 'next-auth/providers/credentials';
const prisma = new PrismaClient();

export const NEXT_AUTH = {
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
      }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
          token.uid = user.id;
      }
      return token;
    },
  session: ({ session, token, user }: any) => {
      if (session.user) {
          session.user.id = token.uid
      }
      return session
  }
},
  // pages:{
  //   signIn:"/signin"
  // }
}