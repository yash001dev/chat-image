'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { makeStore } from "../store";

interface Props{
    children?:React.ReactNode;
}

const queryClient=new QueryClient();

const QueryWrapper=({children}:Props)=>{
    return (
        <QueryClientProvider client={queryClient}>
        <Provider store={makeStore}>
            <Toaster/>
            {children}
        </Provider>
        </QueryClientProvider>
    )
}
export default QueryWrapper