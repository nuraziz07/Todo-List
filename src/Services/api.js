import axios from "axios";

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({baseURL: BASE_URL});

export const getTodo = async () => {
    return (await axiosInstance.get("todos"))?.data
}
export const createTodo = async (data) => {
     return (await axiosInstance.post('todos', data))?.data
}
export const updateTodo = async (data, id) => {
    return (await axiosInstance.patch(`todos/${id}`, data))?.data
}
export const deleteTodo = async (id) => {
    return (await axiosInstance.delete(`todos/${id}`))?.data
}
export const toggleTodo = async (data, id) => {
    return (await axiosInstance.patch(`todos/${id}`, data))?.data
}