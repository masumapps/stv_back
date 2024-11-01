"use server"
import axios from "axios";
export  async function getLive() {
    const data = await fetch(`${process.env.BASE_URL}/lives`, {
      cache: "no-cache",
      method: "GET",
    })

    const res = await data.json();
    
    return await res.lives;
}
export async function getConfig(){
    const data = await fetch(`${process.env.BASE_URL}/config`, {
      cache: "no-cache"
    })
    return await await data.json();
}

export async function getChannels(){
  const data = await fetch(`${process.env.BASE_URL}/channels`, {
    cache: "no-cache"
  })
  const res = await data.json();
 
  return await res.channels;
}



export async function getServerSideProps(context) {
    let livesData = [];
  
    try {
      const res = await axios.get(`${process.env.BASE_URL}/lives`, {
        withCredentials: true,
      });
      livesData = res.data?.lives || [];
    } catch (error) {
      console.error("Failed to fetch lives:", error);
    }
  
    return {
      props: {
        livesData,
      },
    };
  }