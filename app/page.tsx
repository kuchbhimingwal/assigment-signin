"use client"
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react"
export default function Home() {
  const session = useSession();
  return (
    <div>
      <button onClick={() => signIn()}>Signin</button>
{JSON.stringify(session.data?.user)}

<button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
