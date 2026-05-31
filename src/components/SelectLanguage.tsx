import {languages} from "../Constants/languages.ts";
import {useTranslation} from "react-i18next";

const SelectLanguage = () => {

    const {i18n} = useTranslation()

    const changeLanguage = (lang: string): void => {
        i18n.changeLanguage(lang)
    }
    
    return (
        <select onChange={e => {
            changeLanguage(e.target.value)
        }}
                className={'font-normal focus:shadow-input-shadow-focus focus:border-input-border-focus text-input-text transition-all duration-300 outline-none text-[14px]  py-3.25 px-4 rounded-xl placeholder:text-input-placeholder bg-input-bg border border-input-border'}
                defaultValue={i18n.language}>
            {languages.map(item => {
                return (
                    <option key={item.lang} value={item.lang}>{item.code}</option>
                )
            })}
        </select>
    );
};

export default SelectLanguage;