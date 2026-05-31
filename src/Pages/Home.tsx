import TaskItem from "../components/TaskItem";
import {type FormEvent, useRef, useState} from "react";
import {useTodoQuery} from "../Services/queries";
import {useCreateTodo, useDeleteTodo} from "../Services/mutations";
import type {ITodo} from "@/Types/ITodo";
import * as React from "react";
import '../../src/index.css'
import {Moon, Sun} from "lucide-react";
import {useTranslation} from "react-i18next";

interface HomeProps {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

const Home = ({theme, setTheme}: HomeProps) => {

    const {t, i18n} = useTranslation()

    const language = [
        {code: "🇺🇸 En", lang: "en"},
        {code: "🇷🇺 Ru", lang: "ru"},
        {code: "🇺🇿 Uz", lang: "uz"},
        {code: "🇫🇷 Fr", lang: "fr"},
        {code: "🇪🇸 Es", lang: "es"},
        {code: "🇨🇳 Zh", lang: "zh"},
    ]
    const changeLanguage = (lang: string): void => {
        i18n.changeLanguage(lang)
    }


    const inputRef = useRef<HTMLInputElement>(null)
    const {data, isError, isLoading} = useTodoQuery();
    const createTodoMutation = useCreateTodo();
    const removeTodoMutation = useDeleteTodo()
    const [status, setStatus] = useState<string | boolean | null>(null);

    const todos = data?.filter(({done}: ITodo): boolean => {
        if (status === "completed") return done === true
        if (status === "uncompleted") return done === false
        return true
    })
    const completed = data?.filter(({done}: ITodo): boolean => done === true)
    const uncompleted = data?.filter(({done}: ITodo): boolean => done === false)

    const handleCreate = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!inputRef.current?.value.trim()) return
        createTodoMutation.mutate({title: inputRef.current.value, done: false})
        inputRef.current.value = ''
    }

    const deleteCompleted = () => {
        const completed = data?.filter((todo: ITodo): boolean => todo.done === true)
        completed.forEach((todo: ITodo) => removeTodoMutation.mutate({id: todo.id}))
    }

    return (
        <div
            className={'rounded-3xl relative shadow-[0 4px 40px rgba(59,130,246,0.1)] before:content-[\'\'] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-140 before:h-0.5 before:bg-[image:var(--color-card-linear)] shadow-[0_0_0_3px_rgba(255,255,255,0.03)]  px-8 py-8 w-150 border border-solid border-card-border bg-card bg-[image:var(--color-card-radial)]'}>
            <div className={'block text-center'}>
                <div className={'flex justify-between items-center'}>
                    <div
                        className={'text-white border border-solid gap-2 mb-2 w-fit items-center flex border-toggle-border rounded-[20px] p-1'}>
                        <button onClick={() => {
                            setTheme('')
                        }}
                                className={`border-none ${theme === '' ? 'text-toggle-icon bg-toggle-active-bg border-toggle-border' : 'bg-none text-toggle-icon-inactive border-toggle-border'} py-1 px-1 rounded-[20px] text-[12px] font-medium cursor-pointer transition-all duration-200 tracking-[0.2px]`}>
                            <Moon size={18}/></button>
                        <button onClick={() => {
                            setTheme('light')
                        }}
                                className={`border-none ${theme === 'light' ? 'text-toggle-icon bg-toggle-active-bg border-toggle-border' : 'bg-none text-toggle-icon-inactive border-toggle-border'} py-1 px-1 rounded-[20px] text-[12px] font-medium cursor-pointer transition-all duration-200 tracking-[0.2px]`}>
                            <Sun size={18}/></button>
                    </div>
                    <h3 className={'text-primary mb-2 ml-3 font-normal text-[11px] tracking-[2px]'}>{t('Eyebrow')}</h3>
                    <select onChange={e => {
                        changeLanguage(e.target.value)
                    }}
                            className={'font-normal focus:shadow-input-shadow-focus focus:border-input-border-focus text-input-text transition-all duration-300 outline-none text-[14px]  py-3.25 px-4 rounded-xl placeholder:text-input-placeholder bg-input-bg border border-input-border'}
                            defaultValue={i18n.language}>
                        {language.map(item => {
                            return (
                                <option key={item.lang} value={item.lang}>{item.code}</option>
                            )
                        })}
                    </select>
                </div>
                <h1 className={'text-title font-semibold text-[32px] leading-[1.1] tracking-[-0.5px]'}>{t('Title')}</h1>
            </div>

            <form onSubmit={handleCreate} className={'flex justify-between mt-5 mb-7'}>
                <input type="text" ref={inputRef}
                       className={'font-normal w-100 focus:shadow-input-shadow-focus focus:border-input-border-focus text-input-text transition-all duration-300 outline-none text-[14px]  py-3.25 px-4 rounded-xl placeholder:text-input-placeholder bg-input-bg border border-input-border'}
                       placeholder={t('Placeholder')}/>
                <button type={'submit'}
                        className={'bg-primary shadow-[0_4px_12px] shadow-add-button-shadow border-none rounded-xl py-3.25 px-5 text-add-button-text hover:bg-add-button-bg-hover transition-all duration-300 text-[14px] font[500] cursor-pointer tracking-[0.3px] shadow-[0_4px_12px]'}>{createTodoMutation.isPending ? 'Creating...' : `${t('AddBtn')}`}</button>
            </form>
            <div className={'flex justify-center items-center'}>
                <h1 className={'text-task-label font-medium mb-3.5 tracking-[2.5px] text-[10px]'}>{todos.length} {status === null ? t('TaskCountAll') : status === 'completed' ? t('TaskCountCompleted') : t('TaskCountActive')}</h1>
            </div>
            <div className={'overflow-scroll task-enter h-[30vh] block pb-7'}>
                {isLoading ?
                    <h1 className={'text-center tracking-[0.3px] text-task-empty font-normal'}>{t('Loading')}</h1> : null}
                {isError ?
                    <h1 className={'text-center tracking-[0.3px] text-task-empty font-normal'}>{t('Error')}</h1> : null}
                {todos.length ? todos?.map((todo: ITodo): React.ReactElement => {
                        return (
                            <TaskItem key={todo.id} todo={todo}/>
                        )
                    }) :
                    <h1 className={'text-center pt-20 text-[15px] tracking-[0.3px] text-task-empty font-normal'}>{status === null ? t('EmptyAll') : status === 'completed' ? t('EmptyCompleted') : t("EmptyActive")}
                    </h1>}
            </div>

            <div className={'flex justify-between pt-5 border-t border-card-border items-center mt-5'}>
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