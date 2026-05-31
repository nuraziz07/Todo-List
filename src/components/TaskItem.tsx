import {Check, LoaderCircle, SquarePen, Trash} from "lucide-react";
import type {ITodo} from "../Types/ITodo.ts";
import {useState, useRef} from "react";
import {useDeleteTodo, useToggleTodo, useUpdateTodo} from "../Services/mutations.ts";
import Skeleton from "./Skeleton.tsx";

interface IProps {
    todo: ITodo
}

const TaskItem: React.FC<IProps> = ({todo}) => {

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    const updateTodoMutation = useUpdateTodo()
    const removeTodoMutation = useDeleteTodo()
    const toggleTodoMutation = useToggleTodo()


    const handleDelete = (id: string): void => {
        removeTodoMutation.mutate({id: id})
    }
    const handleUpdate = (): void => {
        if (!inputRef.current) return
        updateTodoMutation.mutate({title: inputRef.current.value, done: todo.done, id: todo.id})
        setIsEditing(false)
    }
    const handleToggle = (): void => {
        toggleTodoMutation.mutate({done: !todo.done, id: todo.id})
    }

    return (
        <div
            className={`rounded-xl task-enter border  mt-2 flex ${todo.done ? 'border-l-4 bg-task-item-completed-bg border-primary ' : 'bg-task-item-bg border-task-item-border hover:border-task-item-border-hover hover:bg-task-item-bg-hover'} items-center justify-between gap-3 border-[0.2px] border-solid transition-all duration-200 relative overflow-hidden p-4`}>
            <div className={'flex items-center gap-2.5'}>
                {toggleTodoMutation.isPending ? (
                    <Skeleton/>
                ) : <>
                    <input
                        className={'h-3.75 w-3.75 rounded-md transition-all duration-200 border-[2px]  hover:border-primary border-solid accent-primary cursor-pointer relative flex justify-center items-center'}
                        type="checkbox" checked={todo.done} onChange={handleToggle}/>
                    {isEditing ? (
                            <input ref={inputRef} defaultValue={todo.title}
                                   className={`focus:shadow-input-shadow-focus focus:border-input-border-focus text-input-text transition-all duration-300 outline-none text-[14px] py-1.6 px-4 rounded-lg placeholder:text-input-placeholder bg-input-bg border border-input-border `}
                                   placeholder={'You can update your task...'}/>
                        ) :
                        <h1 className={todo.done ? 'line-through text-[14px] text-task-item-completed-text decoration-task-item-completed-decoration font-normal tracking-[0.1px] leading-[1.4]' : 'text-[14px] text-task-item-text font-normal tracking-[0.1px] leading-[1.4]'}>{todo.title}</h1>}
                </>}

            </div>

            <div className={'flex gap-3.75'}>
                {
                    updateTodoMutation.isPending ?
                        <LoaderCircle className={'spin text-icon-text'}/> : isEditing ? <button><Check
                                className={'bg-none hover:bg-icon-check-bg-hover hover:text-icon-check-text-hover border-none cursor-pointer p-1 rounded-lg flex justify-center items-center text-icon-text duration-200 transition-[background,color]'}
                                size={25} onClick={handleUpdate}/></button> :
                            <button><SquarePen onClick={() => setIsEditing(true)}
                                               className={'bg-none hover:bg-icon-edit-bg-hover hover:text-icon-edit-text-hover  border-none cursor-pointer p-1 rounded-lg flex justify-center items-center  text-icon-text duration-200 transition-[background, color]'}
                                               size={25}/></button>
                }
                <button onClick={() => handleDelete(todo.id)}>{removeTodoMutation.isPending ?
                    <LoaderCircle className={'spin text-icon-text'}/> : <Trash
                        className={'bg-none hover:bg-icon-delete-bg-hover hover:text-icon-delete-text-hover border-none cursor-pointer p-1 rounded-lg flex justify-center items-center  text-icon-text duration-200 transition-[background, color]'}
                        size={25}/>}</button>
            </div>
        </div>
    );
};

export default TaskItem
