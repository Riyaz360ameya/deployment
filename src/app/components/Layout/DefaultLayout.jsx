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

                <div className="relative flex flex-1 flex-col">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main  className="w-full p-1 h-full">
                        {/* <div> */}
                            {children}
                        {/* </div> */}
                    </main>
                </div>
            </div>
        </>
    );
}
