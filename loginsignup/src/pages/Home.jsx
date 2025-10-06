import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaClipboardList,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa";

export const Home = () => {
  const [isUser, setIsUser] = useState(false);
  let currUser;
  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem("user"));
    if (useremail) {
      console.log("Logged in user:", useremail);
      setIsUser(true);
      axios
        .post("http://localhost:3000/home", { email: useremail })
        .then((res) => {
          currUser = res.data;
          console.log(currUser);
        })
        .catch((err) => {
          console.log("Failed to fetch user", err);
        });
    } else {
      console.log("you are logged out", isUser);
    }
  }, []);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.clear();
    setIsUser(false);
    navigate(0);
  };

  const handlelogin=()=>{
    navigate('/login')
  }

  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center h-screen backgroundimg">
      <div className="bg-gray-100/15 saturate-110 backdrop-blur-sm border border-white/20 p-4 relative items-center overflow-hidden flex flex-col shadow-2xl rounded-2xl w-[85%] h-[80%]">
        <header className="w-full justify-between items-center flex ">
          <div
            onClick={() => {
              setSidebar(true);
            }}
            className="flex cursor-pointer p-2 gap-1"
          >
            <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
          </div>
          <div></div>
        </header>
        <div className=" mb-5 text-6xl tracking-tighter font-[700]">
          ShopEase
        </div>
        <div className="flex m-5 w-full justify-center">
          <input
            className="border-l w-md outline-none placeholder:text-gray-400 bg-white/40 p-2.5 px-3 text-sm border-t border-b rounded-bl-2xl rounded-tl-sm border-gray-400"
            placeholder="Search for products"
            type="text"
          />
          <div className="text-md flex items-center justify-center text-gray-100 bg-gray-700 rounded-br-md rounded-tr-2xl p-2.5 px-3 ">
            <FaSearch />
          </div>
        </div>
        <div
          className={` absolute p-3 px-5 text-black top-2 left-2 bg-white rounded-xl border border-gray-300 shadow-md ${
            sidebar ? "translate-x-0" : "translate-x-[-300px]"
          } transition-transform duration-300 ease-in-out `}
        >
          {isUser ? (
            <>
              <div className="flex cursor-pointer text-sm border-b border-gray-300 p-2 items-center gap-3 ">
                <span>
                  <FaUser className="text-md text-gray-400" />
                </span>
                Account
              </div>
              <div className="flex cursor-pointer text-sm border-b border-gray-300 p-2 items-center gap-3 ">
                <span>
                  <FaClipboardList className="text-md text-gray-400" />
                </span>
                Orders
              </div>
              <div className="flex cursor-pointer text-sm border-b border-gray-300 p-2 items-center gap-3 ">
                <span>
                  <FaShoppingCart className="text-md text-gray-400" />
                </span>
                Cart
              </div>
              <div
                onClick={handlelogout}
                className="flex cursor-pointer text-sm p-2 items-center gap-3 "
              >
                <span>
                  <FaSignOutAlt className="text-md text-gray-400" />
                </span>
                Logout
              </div>
            </>
          ) : (
            <>
              <div onClick={handlelogin} className="flex cursor-pointer text-sm p-2 items-center gap-3 ">
                <span>
                  <FaShoppingCart className="text-md text-gray-400" />
                </span>
                Login
              </div>
            </>
          )}
          <div
            onClick={() => {
              setSidebar(false);
            }}
            className="absolute shadow-sm top-0 right-[-40px] text-gray-500 text-sm p-2 cursor-pointer bg-white border border-gray-300 rounded-full"
          >
            <FaArrowLeft />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5 overflow-y-auto grid-rows-2 w-full h-full bg-red">
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://cdn.wccftech.com/wp-content/uploads/2025/03/iPhone-17-3-1.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">ELECTRONICS</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/09/lgscreensaverad_5-copy.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">ELECTRICALS</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full"
              src="https://api.raymond.in/uploads/brand/1661149094350Made%20to%20mesure.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">MEN'S FASHION</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://www.medianews4u.com/wp-content/uploads/2021/10/Nykaa-Fashion-announces-Alaya-F-as-the-New-Face-of-The-Brand.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">WOMEN'S FASHION</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://www.watchonista.com/sites/default/files/watchographer/2914/articles/436874/front/fossil-ad_rectangle.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">WATCHES</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://i.pinimg.com/originals/c5/17/52/c517521e4f7b1b6bd11f064d8eddbfd6.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">FOOTWEAR</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://www.blockchaingamer.biz/wp-content/uploads/2022/11/adidas-impossible-is-nothing.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">SPORTS WEAR</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://s24.q4cdn.com/131595232/files/doc_multimedia/Untitled.jpg"
              alt="iphone16"
            />
            <h1 className="h-[13%]">ACCESSORIES</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://newspaperads.ads2publish.com/wp-content/uploads/2019/09/ellementry-com-kitchenware-tableware-ad-delhi-times-04-09-2019.png"
              alt="iphone16"
            />
            <h1 className="h-[13%]">KITCHENWARE</h1>
          </div>
          <div className="p-2 font-bold text-center text-white flex flex-col gap-[7%] rounded-lg shadow-2xl bg-white/40">
            <img
              className="object-cover rounded-md h-[80%] w-full "
              src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/635743100801015.5f1085a028fe8.png"
              alt="iphone16"
            />
            <h1 className="h-[13%]">FURNITURE</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
