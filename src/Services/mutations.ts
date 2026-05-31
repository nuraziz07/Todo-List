import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTodo, deleteTodo, toggleTodo, updateTodo} from "./api.ts";
import {queryClient} from "./queryClient.ts";
import {todosQueryOptions} from "./queries.ts";
import {useRef} from "react";
import type {IUpdateTodo} from "../Types/IUpdateTodo.ts";
import type {IToggleTodo} from "../Types/IToggleTodo.ts";
import type {IDelete} from "../Types/IDelete.ts";
import type {ICreate} from "../Types/ICreate.ts";

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const todosQueryKey = todosQueryOptions().queryKey;

    const abortControllerRef = useRef<AbortController>(null);
    return useMutation({
        mutationFn: (data: ICreate) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();
           return createTodo(data, abortControllerRef.current.signal)
        },
        onMutate:  (variables) => {
            queryClient.cancelQueries({ queryKey: todosQueryKey });
            const previousTodos = queryClient.getQueryData(todosQueryKey);

            queryClient.setQueryData(todosQueryKey, (old) => {
                return old.map((todo: ICreate) =>
                    todo.id === variables.id
                        ? { ...todo, done: !variables.done }
                        : todo
                );
            });

            return { previousTodos };
        },
        onError: error => {
            console.log(error)
        }, onSuccess: () => {
            console.log("Successfully created")
            queryClient.invalidateQueries({
                queryKey: todosQueryOptions().queryKey
            })
        }
    })
}


export function useUpdateTodo() {
    const queryClient = useQueryClient();
    const todosQueryKey = todosQueryOptions().queryKey;

    const abortControllerRef = useRef<AbortController>(null);
    return useMutation({
        mutationFn: ({title, id}: IUpdateTodo) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();
            return updateTodo({title, done: false, id}, id, abortControllerRef.current.signal)
        },
        onMutate:  (variables) => {
            queryClient.cancelQueries({ queryKey: todosQueryKey });
            const previousTodos = queryClient.getQueryData(todosQueryKey);

            queryClient.setQueryData(todosQueryKey, (old) => {
                return old.map((todo: IUpdateTodo) =>
                    todo.id === variables.id
                        ? { ...todo, done: !variables.done }
                        : todo
                );
            });

            return { previousTodos };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: todosQueryKey });
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            abortControllerRef.current = null;
        }
    })
}

export function useDeleteTodo() {
    return useMutation({
        mutationFn: ({id}: IDelete) => deleteTodo(id), onMutate: () => {
            console.log('mutate')
        }, onSuccess: () => {
            console.log('success')
            queryClient.invalidateQueries({queryKey: ['todos']})
        }, onError: (error) => {
            console.log(error)
        },
    })
}

export function useToggleTodo() {
    const queryClient = useQueryClient();
    const todosQueryKey = todosQueryOptions().queryKey;

    const abortControllerRef = useRef<AbortController>(null);

    return useMutation({
        mutationFn: ({ done, id }: IToggleTodo) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            return toggleTodo({ done, id }, id, abortControllerRef.current.signal);
        },
        onMutate:  (variables) => {
            queryClient.cancelQueries({ queryKey: todosQueryKey });
            const previousTodos = queryClient.getQueryData(todosQueryKey);

            queryClient.setQueryData(todosQueryKey, (old) => {
                return old.map((todo: IToggleTodo) =>
                    todo.id === variables.id
                        ? { ...todo, done: !variables.done }
                        : todo
                );
            });

            return { previousTodos };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: todosQueryKey });
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            abortControllerRef.current = null;
        }
    });
}