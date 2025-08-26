import { useEffect } from "react"

export const useServerStart = () =>{
    useEffect(()=>{
        const warmUp = async ()=>{
            try {
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/health`,{cache:"no-store"});
                console.log("Server is alive")
            } catch {
                console.log("Server crashed")
            }
        }
        warmUp();
    },[]);
}