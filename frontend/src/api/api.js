import { DELETE, READ_ALL_URL } from "./API_URL";
import axios from "./myAxios";

//----------------------------- General -----------------------------
export async function readAll(readType, id) {
  try {
    console.log(READ_ALL_URL(id)[readType]);

    const data = (await axios.get(READ_ALL_URL(id)[readType])).data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteRecord(id, deleteType) {
  try {
    const status = (await axios.delete(DELETE(id)[deleteType])).status;
    if (status) return status;
    throw Error;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//----------------------------- Account -----------------------------
export async function createAccount(user) {
  try {
    const response = await axios.post("/auth/register", user);
    const data = response.data;

    // Nếu backend trả về false, ném lỗi đăng ký thất bại
    if (!data || data === false) {
      throw new Error("Đăng ký thất bại. Email đã tồn tại.");
    }

    return data; // Trả về token khi thành công
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return false; // Trả về false nếu có lỗi
  }
}

export async function updateAccountStatus(user) {
  try {
    const status = (
      await axios.patch(
        `/account/Quan-ly-tai-khoan/${user.accountCode}/Chinh-sua-trang-thai-tai-khoan`,
        user
      )
    ).status;
    if (status) return status;
    throw Error;
  } catch (error) {
    console.error(error);
    return error;
  }
}
