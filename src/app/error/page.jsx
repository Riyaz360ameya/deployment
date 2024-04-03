"use client"
export default function Home() {

    return (
        // <div className="h-screen bg-black text-white grid place-items-center"
        // style={{backgroundImage: `url('https://wallpapercave.com/wp/wp4490728.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        //     <div className="text-center">
        //         <h1 className="text-[200px] mb-5">404</h1>
        //         <h1 className="text-6xl">Oops... Page not found</h1>
        //     </div>
        // </div>
        <main className='flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 '>
            <div className='flex items-center flex-col'>
                {/* <h1 className='text-[100px] text-white font-extrabold'>AMEYA360.in</h1> */}
                <h1 className='text-[200px] text-white font-extrabold'>404</h1>
                <h1 className='text-6xl text-white font-extrabold'>😢 Oops... Page not found</h1>
            </div>
        </main>
    )
}
