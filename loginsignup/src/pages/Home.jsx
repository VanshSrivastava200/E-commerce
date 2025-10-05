import { useState } from "react";
import { FaBars, FaUser, FaShoppingCart, FaCog, FaPhone, FaSearch } from "react-icons/fa";

export const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen backgroundimg">
        <div className="bg-white items-center overflow-hidden flex flex-col shadow-2xl rounded-2xl w-[85%] h-[80%]" >
            <header className="bg-gray-100 w-full justify-between items-center flex p-4 ">

                <div className="flex cursor-point gap-1" >
                    <div className="h-3 w-3 bg-gray-300 rounded-full" ></div>
                    <div className="h-3 w-3 bg-gray-300 rounded-full" ></div>
                    <div className="h-3 w-3 bg-gray-300 rounded-full" ></div> 
                </div>

                <div className="flex w-full justify-center">
                    <input className="border-l w-md placeholder:text-gray-400 bg-white p-1 px-3 text-sm border-t border-b rounded-bl-3xl rounded-tl-3xl border-black" placeholder="Search for products" type="text" />
                    <div className="text-sm flex items-center justify-center text-white bg-black rounded-br-3xl rounded-tr-3xl p-1 px-3 " ><FaSearch/></div>
                </div>
                <div>
                </div>
            </header>
            <div className=" m-7 text-6xl font-[700]" >ShopEase</div>
            
        </div>
    </div>
  );
};
