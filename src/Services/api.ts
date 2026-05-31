import axios from "axios";
import type {ICreate} from "../Types/ICreate.ts";
import type {IUpdateTodo} from "../Types/IUpdateTodo.ts";
import type {IToggleTodo} from "../Types/IToggleTodo.ts";

const BASE_URL = 'http://localhost:3000';

const axiosInstance = axios.create({baseURL: BASE_URL});

export const getTodo = async () => {
    return (await axiosInstance.get("todos"))?.data
}
export const createTodo = async (data: ICreate, signal: AbortSignal) => {
    return (await axiosInstance.post('todos', data, {signal}))?.data
}
export const updateTodo = async (data: IUpdateTodo, id: string, signal:AbortSignal) => {
    return (await axiosInstance.patch(`todos/${id}`, data, {signal}))?.data
}
export const deleteTodo = async (id: string) => {
    return (await axiosInstance.delete(`todos/${id}`))?.data
}
export const toggleTodo = async (data: IToggleTodo, id: string, signal: AbortSignal) => {
    return (await axiosInstance.patch(`todos/${id}`, data, {signal}))?.data
}