import axios from "axios";

export default async function getServerSideProps() {
    console.log("trying to get config data");
    const res = await axios.get("http://localhost:5000/config", { withCredentials: true });
    const configData = res.data;
  
    return {
      props: {
        configData, // Pass the data to the page as props
      },
    };
  }