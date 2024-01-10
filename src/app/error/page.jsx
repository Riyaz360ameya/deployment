"use client"
export default function Home() {

    return (
        <div className="h-screen bg-black text-white grid place-items-center"
        style={{backgroundImage: `url('https://wallpapercave.com/wp/wp4490728.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="text-center">
                <h1 className="text-[200px] mb-5">404</h1>
                <h1 className="text-6xl">Oops... Page not found</h1>
            </div>
        </div>
    )
}
