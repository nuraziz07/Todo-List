import {useTodoQuery} from "../Services/queries.ts";
import type {ITodo} from "../Types/ITodo.ts";
import {useDeleteTodo} from "../Services/mutations.ts";
import {useTranslation} from "react-i18next";


const TodoStats = () => {
    const {data} = useTodoQuery();
    const {t} = useTranslation()
    const completed = data?.filter(({done}: ITodo): boolean => done === true)
    const uncompleted = data?.filter(({done}: ITodo): boolean => done === false)

    const removeTodoMutation = useDeleteTodo()

    const deleteCompleted = () => {
        const completed = data?.filter((todo: ITodo): boolean => todo.done === true)
        completed.forEach((todo: ITodo) => removeTodoMutation.mutate({id: todo.id}))
    }

    return (
        <div className={'block'}>
            <div className={'flex text-stats gap-2.5'}>
                <h3 className={' font-normal text-[12px]'}><span
                    className={'text-stats-span font-medium'}>{uncompleted.length}</span> {t('StatActive')}</h3>
                <h3 className={' font-normal text-[12px]'}><span
                    className={'text-stats-span font-medium'}>{completed.length}</span> {t('StatDone')}</h3>
            </div>
            <button onClick={deleteCompleted}
                    className={'py-1 px-0 transition-all tracking-[0.5px] cursor-pointer text-clear-text text-[11px] bg-none border-none hover:text-clear-text-hover'}>{t('Clear')}</button>
        </div>
    );
};

export default TodoStats;