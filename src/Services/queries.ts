import {getTodo} from "./api";
import {queryOptions, useQuery} from "@tanstack/react-query";

export function useTodoQuery() {
    const query = useQuery(todosQueryOptions())
    return {
        ...query,
        data: query.data ?? []
    }
}

export function todosQueryOptions () {
    return queryOptions({
        queryKey: ["todos"],
        queryFn: getTodo,
        // keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    })
}