import { DELETE, READ_URL } from './API_URL';
import axios from './myAxios'

//----------------------------- General -----------------------------
export async function readAll(readType) {
    try {
        console.log(READ_URL[readType]);
        
        const data = (await axios.get(READ_URL[readType])).data;
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function deleteRecord(id, deleteType) {
    try {
        const status = (await axios.delete(DELETE(id)[deleteType])).status;
        if(status)
            return status;
        throw Error;
    } catch (error) {
        console.error(error);
        return error;
    }
}

//----------------------------- Account -----------------------------
export async function createAccount(user) {
    try {
        const data = (await axios.post('/auth/register', user)).data;
        if (!data.token)
            throw Error

        return data.token;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function updateAccountStatus(user) {
    try {
        const status = (await axios.patch(`/account/Quan-ly-tai-khoan/${user.accountCode}/Chinh-sua-trang-thai-tai-khoan`, user)).status;
        if(status)
            return status;
        throw Error;
    } catch (error) {
        console.error(error);
        return error;
    }
}
