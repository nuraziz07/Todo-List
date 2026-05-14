import {useRef, useState} from 'react';
import {Check, Pencil, Trash, Loader, LoaderCircle} from "lucide-react";
import {useDeleteTodo, useToggleTodo, useUpdateTodo} from "@/Services/mutations.js";

const TaskItem = ({todo}) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null)

    const updateTodoMutation = useUpdateTodo()
    const removeTodoMutation = useDeleteTodo()
    const toggleTodoMutation = useToggleTodo()

    // console.log(updateTodoMutation.isPending)

    const handleDelete = () => {
        removeTodoMutation.mutate({id: todo.id})
    }
    const handleUpdate = () => {
        updateTodoMutation.mutate({title: inputRef.current.value,  id: todo.id})
        setIsEditing(false)
    }
    const handleToggle = () => {
        toggleTodoMutation.mutate({done: !todo.done, id: todo.id})
    }

    return (
        <div className={'flex border border-white w-[400px] px-3 py-2 mt-2  rounded-[5px] justify-between'}>
            {toggleTodoMutation.isPending ? (
                <>
                    <div className="skeleton-row">
                        <div className="skeleton-box" />
                        <div className="skeleton-text" />
                    </div>
                </>
            ): (
                <>
                    <div className={'flex gap-4'}>
                        <input type="checkbox" checked={todo.done} onChange={handleToggle}/>
                        {isEditing ? (
                                <input ref={inputRef} defaultValue={todo.title}
                                       className={'placeholder:text-gray-100 text-white font-[300] text-[12px] w-[250px]'}
                                       placeholder={'You can update your task...'}/>
                            ) :

                            <h2 className={todo.done ? 'line-through text-gray-400' : 'text-white'}>
                                {todo.title}
                            </h2>
                        }
                    </div>
                </>
            )}
            <div className={'flex text-white gap-4'}>
                <button>
                    {removeTodoMutation.isPending ? <Loader className={'spinner'} /> : <Trash onClick={handleDelete} />}
                </button>
                {isEditing ? <button onClick={handleUpdate}><Check /></button> :
                    <button onClick={() => {
                        setIsEditing(true)
                    }}>{updateTodoMutation.isPending ? <LoaderCircle className={'spinner'} />: <Pencil />}</button>
                }
            </div>
        </div>
    )
};

export default TaskItem;