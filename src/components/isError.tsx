import {useTranslation} from "react-i18next";

interface IsError {
    isError: boolean
}

const IsError = ({isError}: IsError) => {
    const {t} = useTranslation()
    return (
        isError ?
            <h1 className={'text-center tracking-[0.3px] text-task-empty font-normal'}>{t('Error')}</h1> : null
    );
};

export default IsError;