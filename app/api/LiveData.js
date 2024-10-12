"use server"
import axios from "axios";

export  async function getLive() {
    const res = await axios.get("http://localhost:5000/lives", { withCredentials: true });
    return res.data.lives;
}
export async function getConfig(){
    const res = await axios.get("http://localhost:5000/config", { withCredentials: true });
    return res.data;
}