import { AUTH_URL } from './API_URL';
import axios from './myAxios'

//----------------------------- General -----------------------------
export async function createRecord(url, data) {
  try {
    const newData = (await axios.post(url, data)).data;

    if (!newData)
      throw Error;

    return newData;
  } catch (error) {
    console.error(error);
    return data;
  }
}

export async function readAll(url) {
  try {
    const data = (await axios.get(url)).data;
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}


export async function updateRecord(url, data) {
  try {
    const newData = (await axios.patch(url, data)).data;

    if (!newData)
      throw Error(newData);

    return newData;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteRecord(url) {
  try {
    const data = (await axios.delete(url)).data;
    if (data) return data;
    throw Error;
  } catch (error) {
    console.error(error);
  }
}

export async function search(url, searchParam) {
  try {
    const data = (await axios.get(url, searchParam)).data;
    if (data)
      return data;
    throw Error;

  } catch (error) {
    console.error(error);
  }
}

//----------------------------- Auth -----------------------------

export async function login(loginInfo) {
  try {
    const token = (await axios.post(AUTH_URL.login, loginInfo)).data;

    if (!token)
      throw Error;

    return token
  } catch (error) {
    console.error(error);
  }
}

// export async function readAll(readType, id) {
//   try {
//     console.log(READ_ALL_URL(id)[readType]);

//     const data = (await axios.get(READ_ALL_URL(id)[readType])).data;
//     return data;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }

//----------------------------- Account -----------------------------
export async function createAccount(user) {
  try {
    const data = (await axios.post('/auth/register', user)).data;
    if (!data)
      throw Error

    return data;
  } catch (error) {
    console.error(error);
    return error;
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
