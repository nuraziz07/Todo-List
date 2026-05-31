import TaskItem from "../components/TaskItem";
import {useState} from "react";
import {useTodoQuery} from "../Services/queries";
import type {ITodo} from "../Types/ITodo.ts";
import * as React from "react";
import '../../src/index.css'
import {useTranslation} from "react-i18next";
import TodoStats from "../components/TodoStats.tsx";
import ChangeTheme from "../components/ChangeTheme.tsx";
import CreateTodo from "../components/createTodo.tsx";
import SelectLanguage from "../components/SelectLanguage.tsx";
import IsLoading from "../components/isLoading.tsx";
import IsError from "../components/isError.tsx";

interface HomeProps {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

const Home = ({theme, setTheme}: HomeProps) => {

    const {t} = useTranslation()

    const {data, isLoading, isError} = useTodoQuery();

    const [status, setStatus] = useState<string | boolean | null>(null);
    const todos = data?.filter(({done}: ITodo): boolean => {
        if (status === "completed") return done === true
        if (status === "uncompleted") return done === false
        return true
    })

    return (
        <div
            className={'rounded-3xl relative shadow-[0 4px 40px rgba(59,130,246,0.1)] before:content-[\'\'] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-140 before:h-0.5 before:bg-[image:var(--color-card-linear)] shadow-[0_0_0_3px_rgba(255,255,255,0.03)]  px-8 py-8 w-150 border border-solid border-card-border bg-card bg-[image:var(--color-card-radial)]'}>
            <div className={'block text-center'}>
                <div className={'flex justify-between items-center'}>
                    <ChangeTheme theme={theme} setTheme={setTheme}/>
                    <h3 className={'text-primary mb-2 ml-3 font-normal text-[11px] tracking-[2px]'}>{t('Eyebrow')}</h3>
                    <SelectLanguage/>
                </div>
                <h1 className={'text-title font-semibold text-[32px] leading-[1.1] tracking-[-0.5px]'}>{t('Title')}</h1>
            </div>
            <CreateTodo/>
            <div className={'flex justify-center items-center'}>
                <h1 className={'text-task-label font-medium mb-3.5 tracking-[2.5px] text-[10px]'}>{todos.length} {status === null ? t('TaskCountAll') : status === 'completed' ? t('TaskCountCompleted') : t('TaskCountActive')}</h1>
            </div>
            <div className={'overflow-scroll task-enter h-[30vh] block pb-7'}>
                <IsLoading isLoading={isLoading} />
                <IsError isError={isError} />
                {todos.length ? todos?.map((todo: ITodo): React.ReactElement => {
                        return (
                            <TaskItem key={todo.id} todo={todo}/>
                        )
                    }) :
                    <h1 className={'text-center pt-20 text-[15px] tracking-[0.3px] text-task-empty font-normal'}>{status === null ? t('EmptyAll') : status === 'completed' ? t('EmptyCompleted') : t("EmptyActive")}
                    </h1>}
            </div>

            <div className={'flex justify-between pt-5 border-t border-card-border items-center mt-5'}>
                <TodoStats/>
                <div
                    className={'flex gap-2 bg-button-tab-group-bg border border-solid border-button-tab-group-border rounded-[10px] p-0.75'}>
                    <button onClick={() => setStatus(null)}
                            className={`${status === null ? 'bg-button-filter-active-bg text-primary' : 'hover:text-buttom-filter-inactive-hover text-button-filter-text'} border-none py-1.25 px-3 rounded-[7px] text-[12px] font-medium cursor-pointer transition-all duration-200 tracking-[0.2px]`}>{t('FilterAll')}</button>
                    <button onClick={() => setStatus('uncompleted')}
                            className={`${status === 'uncompleted' ? 'bg-button-filter-active-bg text-primary' : 'hover:text-buttom-filter-inactive-hover text-button-filter-text'} border-none py-1.25 px-3 rounded-[7px] text-[12px] font-medium cursor-pointer transition-all duration-200 tracking-[0.2px]`}>{t('FilterActive')}</button>
                    <button onClick={() => setStatus('completed')}
                            className={`${status === 'completed' ? 'bg-button-filter-active-bg text-primary' : 'hover:text-buttom-filter-inactive-hover text-button-filter-text'} border-none py-1.25 px-3 rounded-[7px] text-[12px] font-medium cursor-pointer transition-all duration-200 tracking-[0.2px]`}>{t('FilterCompleted')}</button>
                </div>
            </div>
        </div>
    );
}

export default Home;