import {useState} from "react";

const UseTheme = () => {
    const [theme, setTheme] = useState<string>('light')

    return {theme, setTheme}
};

export default UseTheme;