import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  fetchUsers,
  selectFilteredUsers,
  setNameFilter,
  setUsernameFilter,
  setEmailFilter,
  setPhoneFilter,
} from "@/features/user/userSlice";
import { Input } from "@/components/ui/input";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Error } from "@/components/Error";

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
    return <LoadingSkeleton />;
  }

  if (status === "failed") {
    return <Error message={error} />;
  }

  return (
    <Table>
      <TableCaption>A list of users</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-black">
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Phone</TableHead>
        </TableRow>
        <TableRow>
          <TableCell>
            <Input
              type="text"
              value={filters.name}
              onChange={handleNameFilterChange}
              placeholder="Filter by Name"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              value={filters.username}
              onChange={handleUsernameFilterChange}
              placeholder="Filter by Username"
            />
          </TableCell>
          <TableCell>
            <Input
              type="text"
              value={filters.email}
              onChange={handleEmailFilterChange}
              placeholder="Filter by Email"
            />
          </TableCell>
          <TableCell className="flex justify-end">
            <Input
              type="text"
              value={filters.phone}
              onChange={handlePhoneFilterChange}
              placeholder="Filter by Phone"
            />
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">{user.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { UserManagmentTable };
