import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  {
    id: 1,
    accountCode: 'ACC001',
    username: 'john_doe',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    dateOfBirth: '1990-01-01',
    accountStatus: 'Active',
  },
  {
    id: 2,
    accountCode: 'ACC002',
    username: 'jane_smith',
    password: 'pass456',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '098-765-4321',
    dateOfBirth: '1985-05-15',
    accountStatus: 'Inactive',
  },
  {
    id: 3,
    accountCode: 'ACC003',
    username: 'mike_jones',
    password: 'password789',
    firstName: 'Mike',
    lastName: 'Jones',
    email: 'mike.jones@example.com',
    phoneNumber: '555-123-4567',
    dateOfBirth: '1992-12-20',
    accountStatus: 'Active',
  },
  {
    id: 4,
    accountCode: 'ACC004',
    username: 'alice_williams',
    password: 'alicePass123',
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@example.com',
    phoneNumber: '321-654-0987',
    dateOfBirth: '1995-04-10',
    accountStatus: 'Suspended',
  },
  {
    id: 5,
    accountCode: 'ACC005',
    username: 'chris_brown',
    password: 'chrisBrown98',
    firstName: 'Chris',
    lastName: 'Brown',
    email: 'chris.brown@example.com',
    phoneNumber: '777-888-9999',
    dateOfBirth: '1988-08-08',
    accountStatus: 'Active',
  },
];

const columns = [
  { field: 'accountCode', headerName: 'Id', width: 100 },
  { field: 'username', headerName: 'Tên tài khoản', width: 150 },
  { field: 'password', headerName: 'Mật khẩu', width: 150 },
  { field: 'firstName', headerName: 'Họ', width: 80 },
  { field: 'lastName', headerName: 'Tên', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'phoneNumber', headerName: 'Số điện thoại', width: 150 },
  { field: 'dateOfBirth', headerName: 'Ngày sinh', width: 150 },
  { field: 'accountStatus', headerName: 'Trạng thái', width: 150 },
];



function ManageAccount() {
  return (
    <Container>
      <DataGrid rows={rows} columns={columns} />
    </Container>
  )
}

export default ManageAccount