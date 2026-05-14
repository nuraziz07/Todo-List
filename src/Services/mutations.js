import {useMutation} from "@tanstack/react-query";
import {createTodo, deleteTodo, toggleTodo, updateTodo} from "@/Services/api.js";
import {queryClient} from "@/Services/queryClient.js";

export const QUERY_KEY = "todos";


export function useCreateTodo() {

    return useMutation({
        mutationFn: (data) => createTodo(data),
        onMutate: () => {
            console.log('mutating')
        },
        onError: error => {
            console.log(error)
        },
        onSuccess: () => {
            console.log("Successfully created")
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
    })
}
export function useUpdateTodo() {
    return useMutation({
        mutationFn: ({title, id}) => updateTodo({title, done: false}, id),
        onMutate: () => {
            console.log('mutate')
        },
        onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
export function useDeleteTodo() {
    return useMutation({
        mutationFn: ({id}) => deleteTodo(id),
        onMutate: () => {
            console.log('mutate')
        },
        onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
        onError: (error) => {
            console.log(error)
        },
    })
}
export function useToggleTodo() {
    return useMutation({
        mutationFn: ({done, id}) => toggleTodo({done}, id),
        onMutate: () => {
            console.log('mutate')
        },
        onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey: ['todos']})
        },
        onError: (error) => {
            console.log(error)
        },
    })
}




