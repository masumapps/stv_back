"use server"
import axios from "axios";

export  async function getLive() {
    const res = await axios.get(`${process.env.BASE_URL}/lives`, 
      {
         withCredentials: true,
         headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
     });
    return res.data.lives;
}
export async function getConfig(){
    const res = await axios.get(`${process.env.BASE_URL}/config`, 
      {
         withCredentials: true,
         headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
     });
    return res.data;
}

export async function getChannels(){
  const res = await axios.get(`${process.env.BASE_URL}/channels`,
    {
       withCredentials: true,
       headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
   });
  return res.data.channels;
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