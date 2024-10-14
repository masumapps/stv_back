"use server"
import axios from "axios";

export  async function getLive() {
    const res = await axios.get(`${process.env.BASE_URL}/lives`, { withCredentials: true });
    return res.data.lives;
}
export async function getConfig(){
    const res = await axios.get(`${process.env.BASE_URL}/config`, { withCredentials: true });
    return res.data;
}