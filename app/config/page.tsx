
import "./../Styles/popup.css";
import { getConfig } from "../api/LiveData";
import { TableAction } from "../Components/TableAction";
import ListPage from "../Components/ListPage";

async function Config() {
  const configData = await getConfig();

 

  const ConfigTable = () => {

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Soccery</th>
              <th>Krira</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {configData.map((config) => {
              return (
                <tr key={config.id}>
                  <td>{config.name}</td>
                  <td>{config.value}</td>
                  <td>{config.krira}</td>
                  <td>
                    <div className="flex space-x-3">
                      <TableAction
                        href={`/config/${config.id}`}
                        type="setting"
                        id={config.id}
                        page={"config"}
                      />
                    </div>
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
    <ListPage path="/config/new">
      <ConfigTable />
    </ListPage>
  );
}
export default Config;
