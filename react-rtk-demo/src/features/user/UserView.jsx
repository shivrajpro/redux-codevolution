import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";

const UserView = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>List of users</h2>
      {userState.loading ? <h2>loading users...</h2> : null}
      {!userState.loading && userState.users.length ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userState.users.map((user) => {
              return (
                <tr key={user.email}>
                  <td> {user.id} </td>
                  <td> {user.name} </td>
                  <td> {user.email} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : !userState.loading ? (
        <h2>No users found</h2>
      ) : null}
    </div>
  );
};

export default UserView;
