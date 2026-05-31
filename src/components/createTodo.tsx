import  {type FormEvent, useRef} from 'react';
import {useCreateTodo} from "../Services/mutations.ts";
import {useTranslation} from "react-i18next";

const CreateTodo = () => {

    const {t} = useTranslation()
    const createTodoMutation = useCreateTodo();
    const inputRef = useRef<HTMLInputElement>(null)

    const handleCreate = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!inputRef.current?.value.trim()) return
        createTodoMutation.mutate({title: inputRef.current.value, done: false})
        inputRef.current.value = ''
    }

    return (
        <form onSubmit={handleCreate} className={'flex justify-between mt-5 mb-7'}>
            <input type="text" ref={inputRef}
                   className={'font-normal w-100 focus:shadow-input-shadow-focus focus:border-input-border-focus text-input-text transition-all duration-300 outline-none text-[14px]  py-3.25 px-4 rounded-xl placeholder:text-input-placeholder bg-input-bg border border-input-border'}
                   placeholder={t('Placeholder')}/>
            <button type={'submit'}
                    className={'bg-primary shadow-[0_4px_12px] shadow-add-button-shadow border-none rounded-xl py-3.25 px-5 text-add-button-text hover:bg-add-button-bg-hover transition-all duration-300 text-[14px] font[500] cursor-pointer tracking-[0.3px] shadow-[0_4px_12px]'}>{createTodoMutation.isPending ? 'Creating...' : `${t('AddBtn')}`}</button>
        </form>
    );
};

export default CreateTodo;