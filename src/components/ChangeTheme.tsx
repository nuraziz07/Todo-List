import {Moon, Sun} from "lucide-react";
import * as React from "react";

interface ITheme {
    theme: string,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

const ChangeTheme = ({theme, setTheme}: ITheme) => {

    return (
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
    );
};

export default ChangeTheme;