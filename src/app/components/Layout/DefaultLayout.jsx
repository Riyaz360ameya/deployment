"use client"
import React, { useState } from "react";
import Sidebar from "../SidebarLayout/Sidebar";
import Header from "../Header/header";
export default function DefaultLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-2 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
