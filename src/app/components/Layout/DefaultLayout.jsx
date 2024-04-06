"use client"
import React, { useState } from "react";
import Sidebar from "../SidebarLayout/Sidebar";
import Header from "../Header/header";
export default function DefaultLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="flex h-screen overflow-hidden w-full">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="h-screen 2xl:overflow-hidden max-w-full p-2 shadow-lg">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
