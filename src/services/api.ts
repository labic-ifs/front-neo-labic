import axios from "axios";
import { parseCookies } from "nookies";
import { host } from "../../env";

const { 'authToken': token } = parseCookies()

export const api = axios.create({
    baseURL: host
})

if(token) {
    api.defaults.headers['Authorization'] = `bearer ${token}`
}