import axios from "axios";

const $host = axios.create({
    baseURL: 'https://localhost:3000/'
})

const saveTable = async () =>{
    return await $host.get('/getTable');
}

export default saveTable;