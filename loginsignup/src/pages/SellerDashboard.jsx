import { useEffect, useState } from "react";
import axios from "axios";

export const SellerDashboard = () => {

  const [productData, setProductData] = useState({
    name: "",
    seller: "",
    price: "",
    stock: "",
    images: [],
    category: [],
  });

  useEffect(() => {
    const useremail = JSON.parse(localStorage.getItem("user"));
    if (useremail) {
      axios
        .post("http://localhost:3000/sellerdashboard", { email: useremail })
        .then((res) => {
          console.log(res.data);
          setProductData({...productData,seller:res.data.firstName})
        })
        .catch((err) => {
          console.log("Failed to fetch user", err);
        });
    } else {
      console.log("you are logged out", isUser);
    }
  }, []);

  const [cat,setCat]=useState("")
  const [img,setImg]=useState("")

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  
  const handleCategory=(e)=>{
    e.preventDefault()
    if(cat===""||productData.category.includes(cat))
    {
      setCat("")
      return
    }
    setProductData({...productData,category:[...productData.category,cat]})
    setCat("")
  }
  
  const handleImages=(e)=>{
    e.preventDefault()
    if(img==""||productData.images.includes(img)){
      setImg("")
      return
    }
    setProductData({...productData,images:[...productData.images,img]})
    setImg("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData)
    axios
      .post("http://localhost:3000/add-product", productData)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("Failed to upload", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen backgroundimg">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[90%] max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a new Product
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-center w-full flex-row gap-4">
            <div className="flex flex-col w-[50%] gap-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleChange}
                className="p-3 rounded-lg border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <textarea
                type="text"
                name="description"
                placeholder="Product Description"
                value={productData.description}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <input
                type="text"
                name="price"
                placeholder="Product Sale Price"
                value={productData.price}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <input
                type="text"
                name="stock"
                placeholder="Stock"
                value={productData.stock}
                onChange={handleChange}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="flex w-[50%] flex-col gap-4">
              <div className="flex">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={cat}
                  onChange={(e)=>{setCat(e.target.value)}}
                  className="p-3 rounded-tl-lg rounded-bl-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <button onClick={handleCategory} className="bg-gray-700 p-2 px-4 cursor-pointer text-xs text-semibold text-white rounded-tr-lg rounded-br-lg">
                  ADD
                </button>
              </div>
              <div className="flex gap-1 flex-wrap" >
                {
                  productData.category.map((val,index)=>{
                    return(
                      <span key={index} className="p-2 rounded-lg px-4 bg-gray-800 border border-gray-300 text-white" >{val}</span>
                    )
                  })
                }
              </div>
              <div className="flex">
                <input
                  type="text"
                  name="images"
                  placeholder="Image URL"
                  value={img}
                  onChange={(e)=>{setImg(e.target.value)}}
                  className="p-3 rounded-tl-lg rounded-bl-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <button onClick={handleImages} className="bg-gray-700 p-2 px-4 cursor-pointer text-xs text-semibold text-white rounded-tr-lg rounded-br-lg">
                  ADD
                </button>
              </div>
              <div className="flex gap-0.5 flex-wrap" >
                {
                  productData.images.map((val,index)=>{
                    return(
                      <div key={index} className=" overflow-hidden rounded-lg h-[62px] w-[62px] bg-gray-800 border border-gray-300 text-white">
                        <img className="object-cover aspect-square" src={val} alt="prodImg" />
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-gray-900 cursor-pointer hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};
