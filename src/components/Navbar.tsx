import ThemeToggle from './ThemeToggle'



const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full  shadow-xl  bg-[#ffffff1a] dark:bg-[#00000026] backdrop-blur-[32px] ">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    <h1 className='dark:text-white text-black text-3xl'>Doctor Dashboard</h1>
                </div>
                
                    <ThemeToggle />
            </div>

            
        </nav>
    )
}

export default Navbar