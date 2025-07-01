import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react';


const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-16 h-9 flex items-center bg-[#eeb2b6] dark:bg-[#310320] rounded-full p-1 relative transition-colors"
        >
            <div
                className={`w-7 h-7 bg-white rounded-full shadow-md transform duration-300 ease-in-out
                            ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}
            >
            </div>
            <div className="absolute left-[7px] text-yellow-400"><Sun size={21} /></div>
            <div className="absolute right-1.5 text-gray-200"><Moon className='dark:text-black' size={21} /></div>

        </button>
    )
}

export default ThemeToggle