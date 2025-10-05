import { useState } from "react";
import { FaBars, FaUser, FaShoppingCart, FaCog, FaPhone, FaSearch, FaClipboardList, FaSignOutAlt, FaCross, FaCut, FaArrowLeft } from "react-icons/fa";
import { ProductCard } from "../components/ProductCard";
export const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen backgroundimg">
        <div className="bg-gray-100/15 saturate-110 backdrop-blur-sm border border-white/20 p-4 relative items-center overflow-hidden flex flex-col shadow-2xl rounded-2xl w-[85%] h-[80%]" >
            <header className="w-full justify-between items-center flex ">
                <div onClick={()=>{setSidebar(true)}} className="flex cursor-pointer p-2 gap-1" >
                    <div className="h-2 w-2 bg-gray-300 rounded-full" ></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full" ></div>
                    <div className="h-2 w-2 bg-gray-500 rounded-full" ></div> 
                </div>
                <div>
                </div>
            </header>
            <div className=" mb-5 text-6xl tracking-tighter font-[700]" >ShopEase</div>
            <div className="flex m-5 w-full justify-center">
                <input className="border-l w-md outline-none placeholder:text-gray-400 bg-white/40 p-2.5 px-3 text-sm border-t border-b rounded-bl-2xl rounded-tl-sm border-gray-400" placeholder="Search for products" type="text" />
                <div className="text-md flex items-center justify-center text-gray-100 bg-gray-700 rounded-br-md rounded-tr-2xl p-2.5 px-3 " ><FaSearch/></div>
            </div>
            <div className={` absolute p-3 px-5 text-black top-2 left-2 bg-white rounded-xl border border-gray-300 shadow-md ${sidebar ? "translate-x-0" : "translate-x-[-300px]"} transition-transform duration-300 ease-in-out `}>
                <div className="flex cursor-pointer text-sm border-b border-gray-300 p-2 items-center gap-3 "><span><FaUser className="text-md text-gray-400" /></span>Account</div>
                <div className="flex cursor-pointer text-sm border-b border-gray-300 p-2 items-center gap-3 "><span><FaClipboardList className="text-md text-gray-400" /></span>Orders</div> 
                <div className="flex cursor-pointer text-sm border-b border-gray-300 p-2 items-center gap-3 "><span><FaShoppingCart className="text-md text-gray-400"/></span>Cart</div> 
                <div className="flex cursor-pointer text-sm p-2 items-center gap-3 "><span><FaSignOutAlt className="text-md text-gray-400" /></span>Logout</div>
                <div onClick={()=>{setSidebar(false)}} className="absolute shadow-sm top-0 right-[-40px] text-gray-500 text-sm p-2 cursor-pointer bg-white border border-gray-300 rounded-full" ><FaArrowLeft/></div>
            </div>
            <div className="grid grid-cols-5 gap-5 overflow-y-scroll grid-rows-2 w-full h-full bg-red" >
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
                <div className="p-3 flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40" >
                    <img className="object-cover rounded-md h-[80%] w-full border" src="https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712145476_1098316.jpg?w=480&dpr=1.3" alt="iphone16" />
                    <h1 className="h-[13%]" >SNEAKERS</h1>
                </div>
            </div>
        </div>
    </div>
  );
};
