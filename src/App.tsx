import '../src/App.css';
import {QueryClientProvider} from "@tanstack/react-query";
import Home from './Pages/Home.tsx'
import {queryClient} from "./Services/queryClient.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useState} from "react";
import {Routes, Route} from "react-router-dom";

function App() {

    const [theme, setTheme] = useState<string>('light')

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <div className={`min-h-screen transition-all flex-col bg-[image:var(--color-bg-radial)] duration-400 w-full ${theme ? 'light': ''} bg-background flex justify-center items-center`}>
                    <Routes>
                        <Route path={'/'} element={<Home theme={theme} setTheme={setTheme} />} />
                    </Routes>
                </div>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </div>
    )
}

export default App
