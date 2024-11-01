
import { ErrorOutline } from "@mui/icons-material";
import "./../Styles/popup.css";
import ListPage from "../Components/ListPage"
import Image from "next/image";
import { TableAction } from "../Components/TableAction";
import { getChannels } from "../api/LiveData";

async function Channels() {
  const channelData = await getChannels();


  
  

  const ChannelsTable = () => {
   

    return (
      <>
        {" "}
        <table>
          <thead>
            <tr>
              <th>Channel Id</th>
              <th>Channel Title</th>
              <th>Thumbnail</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {channelData.map((channel, i) => {
              return (
                <tr key={i}>
                  <td>
                    <p className="maincolor">#</p>
                    {channel.id}
                  </td>
                  <td>{channel.title}</td>
                  <td>
                   {channel.thumbnail?
                    <Image src={channel.thumbnail}
                     alt="" 
                     width={50}
                     height={50} 
                     />
                    :<ErrorOutline/>}
                  </td>
                  <td>{channel.position}</td>
                  <td>{channel.published === 1 ? "🟢" : "🔴"}</td>
                  <td>
                  <TableAction
                    href={`/channels/${channel.id}`}
                    type={"channel"}
                    id={channel.id}
                    page={"channels"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  return (
   <ListPage
   path="/channels/new">
     <ChannelsTable/>
   </ListPage>
  );
}
export default Channels;
