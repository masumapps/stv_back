import { EditRounded, ReadMoreRounded } from "@mui/icons-material";
import Link from "next/link";
import ListPage from "../Components/ListPage";
import "./../Styles/popup.css";
import { getLive } from "../api/LiveData";
import DeleteButton from "../Components/buttons/DeleteButton";
import { IconButton } from "@mui/material";

async function Lives() {
  const livesData = await getLive();

  const LivesTable = () => {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Live Id</th>
              <th>Team Name</th>
              <th>Opnent Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {livesData?.map((live) => {
              return (
                <tr key={live.id}>
                  <td>
                    <span className="maincolor">#</span>
                    {live.id}
                  </td>
                  <td>{live.team_a_name}</td>
                  <td>{live.team_b_name}</td>
                  <td>{live.published === 1 ? "🟢" : "🔴"}</td>
                  <td>
                    <Link href={`/lives/${live.id}`}>
                      <IconButton>
                        <EditRounded />
                      </IconButton>
                    </Link>
                    <DeleteButton type="live" id={live.id} />
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
    <ListPage path="/lives/new">
      <LivesTable />
    </ListPage>
  );
}

export default Lives;
