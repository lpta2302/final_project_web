import axios from './myAxios'

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

export async function readAllAccount() {
    try {
        const data = (await axios.get('/account/Quan-ly-tai-khoan')).data;
        return data;
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

// export async function deleteAccounts(userId) {
    //     try {
        //         const data = (await axios.get('/account/Quan-ly-tai-khoan')).data;
        //         return data;
        //     } catch (error) {
            //         console.error(error);
            //         return error;
            //     }
            // }
            
export async function deleteAccount(userId) {
    try {
        const status = (await axios.delete('/account/Quan-ly-tai-khoan/'+userId)).status;
        if(status)
            return status;
        throw Error;
    } catch (error) {
        console.error(error);
        return error;
    }
}


//----------------------------- Product -----------------------------
export async function readAllProducts() {
    try {
        const data = (await axios.get('/product')).data;
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}