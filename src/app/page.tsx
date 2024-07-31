"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || !session.user) {return;}
    else{
      router.replace('/dashboard');
    }
  }, [router, session]);


  return (
    <div>
      
    </div>
  );
}
