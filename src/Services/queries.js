import {getTodo} from "@/Services/api.js";
import {useQuery} from "@tanstack/react-query";

export function useTodoQuery() {
    const query = useQuery({
        queryKey: ["todos"],
        queryFn: getTodo,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 min
    })
    return {
        ...query,
        data: query.data ?? []
    }
}
