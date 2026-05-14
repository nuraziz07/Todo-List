import './App.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {queryClient} from "@/Services/queryClient.js";
import Home from "@/Pages/Home/Home";
import {Route, Routes} from "react-router-dom";
import TodoProvider from "@/Providers/context.jsx";
import Completed from "@/Pages/Completed.jsx";
import UnCompleted from "@/Pages/UnCompleted.jsx";


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TodoProvider>
                <div className={'flex justify-center min-h-screen bg-orange-100 items-center'}>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>,
                        <Route path={'/completed'} element={<Completed />} />
                        <Route path={'uncompleted'} element={<UnCompleted />} />
                    </Routes>
                </div>
                <ReactQueryDevtools initialIsOpen={false}/>
            </TodoProvider>
        </QueryClientProvider>
    )
}

export default App
