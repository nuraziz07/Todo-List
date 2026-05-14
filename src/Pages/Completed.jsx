import React from 'react';
import TaskItem from "@/Components/TaskItem.jsx";
import {useTodoQuery} from "@/Services/queries.js";
import {ChevronLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";
import Skeleton from "@/Components/Skeleton.jsx";

const Completed = () => {

    const navigate = useNavigate()
    
    const { data, isError, error, isLoading, isPending} = useTodoQuery();

    const filteredData = data.filter(item => item.done)

    console.log(filteredData)
    
    return (
        <div className={'bg-orange-900 border-[2px] border-blue-500 w-[488px] h-[60vh] rounded-[10px] p-5'}>
            <button><ChevronLeft className={'text-white cursor-pointer'} onClick={() => navigate(-1)} /></button>
            {isPending ? (
                <Skeleton />
            ): data.length ? (
                <div>
                    <div className={'block h-[60vh] overflow-auto pb-5 mt-5'}>
                        {isLoading ? <h1 className={'text-center text-[17px] text-white font-[600]'}>Loading...</h1> : null}
                        {isError ?
                            <h1 className={'text-center text-[17px] text-white font-[600]'}>{error.message}</h1> : null}

                        {filteredData?.map((todo) => {
                            return (
                                <TaskItem key={todo.id} todo={todo}/>
                            )
                        })}
                    </div>

                </div>
            ): <h1 className={'text-center font-[600] text-[24px] text-white'}>Empty</h1>}
        </div>
    );
};

export default Completed;