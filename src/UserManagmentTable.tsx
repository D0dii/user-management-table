import * as React from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  fetchUsers,
  selectFilteredUsers,
  setNameFilter,
  setUsernameFilter,
  setEmailFilter,
  setPhoneFilter,
} from "src/userSlice";

function UserManagmentTable() {
  const dispatch = useAppDispatch();
  const filteredUsers = useAppSelector((state) => selectFilteredUsers(state.users));
  const status = useAppSelector((state) => state.users.status);
  const error = useAppSelector((state) => state.users.error);
  const filters = useAppSelector((state) => state.users.filters);

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNameFilter(e.target.value));
  };

  const handleUsernameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsernameFilter(e.target.value));
  };

  const handleEmailFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmailFilter(e.target.value));
  };

  const handlePhoneFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoneFilter(e.target.value));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Users:</h1>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          value={filters.name}
          onChange={handleNameFilterChange}
          placeholder="Filter by Name"
          style={{ padding: "10px", flex: 1 }}
        />
        <input
          type="text"
          value={filters.username}
          onChange={handleUsernameFilterChange}
          placeholder="Filter by Username"
          style={{ padding: "10px", flex: 1 }}
        />
        <input
          type="text"
          value={filters.email}
          onChange={handleEmailFilterChange}
          placeholder="Filter by Email"
          style={{ padding: "10px", flex: 1 }}
        />
        <input
          type="text"
          value={filters.phone}
          onChange={handlePhoneFilterChange}
          placeholder="Filter by Phone"
          style={{ padding: "10px", flex: 1 }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { UserManagmentTable };
