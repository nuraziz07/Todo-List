import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import TaskItem from "../../Components/TaskItem";
import {useTodoQuery} from "/src/Services/queries.js";
import {useCreateTodo} from "@/Services/mutations.js";

const Home = () => {
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const { data, isError, error, isLoading} = useTodoQuery();
    const createTodoMutation = useCreateTodo();
    

    const handleCreate = (e) => {
            e.preventDefault()
            if(!inputRef.current.value.trim()) return
            createTodoMutation.mutate({title: inputRef.current.value, done: false})
            inputRef.current.value = ''
    }
    return (
        <div>
            <div className={'bg-orange-900 border-[2px] border-blue-500 rounded-[10px] p-5'}>
                <h1 className={'text-center text-[24px] text-white font-[600] py-3'}>To Do List </h1>
                <form className={'flex px-15 justify-center gap-4'} onSubmit={handleCreate}>
                    <input ref={inputRef} type="text" placeholder={'Add your task...'}
                           className={'bg-white rounded-[5px] pl-3 py-2'}/>
                    <button className={'bg-blue-400 text-black px-4 rounded-[5px]'} disabled={createTodoMutation.isPending}
                            type={"submit"}>{createTodoMutation.isPending ? 'Creating...' : 'Add'}</button>
                </form>
                <h1 className={'text-center font-[400] text-[19px] text-white py-3'}>{data.length ? 'Task List': 'Empty'}</h1>

                <div className={'block h-[40vh] overflow-auto'}>
                    {isLoading ? <h1 className={'text-center text-[17px] text-white font-[600]'}>Loading...</h1> : null}
                    {isError ?
                        <h1 className={'text-center text-[17px] text-white font-[600]'}>{error.message}</h1> : null}
                    
                    {data?.map((todo) => {
                        return (
                            <TaskItem key={todo.id} todo={todo}/>
                        )
                    })}
                </div>

                <div className={'flex justify-center gap-6 mt-4 text-white'}>
                    <h1 onClick={() => navigate('/completed')} className={'border-r border-white pr-7'}>Completed {data.filter(todo => todo.done).length}</h1>
                    <h1 onClick={() => navigate('/uncompleted')}>Uncompleted {data.filter(todo => !todo.done).length} </h1>
                </div>
            </div>
        </div>
    );
};

export default Home;