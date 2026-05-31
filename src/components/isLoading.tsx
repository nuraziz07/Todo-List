import {useTranslation} from "react-i18next";

interface isLoading {
    isLoading: boolean
}

const IsLoading = ({isLoading}: isLoading) => {
    
    const {t} = useTranslation()
    
    return (
        isLoading ?
                ( <h1 className={'text-center tracking-[0.3px] text-task-empty font-normal'}>{t('Loading')}</h1>) : null
    );
};

export default IsLoading;