import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import Wrapper from "./Wrapper";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { BsCart } from "react-icons/bs";
import MenuMobile from "./MenuMobile";
import { fetchDataFromApi } from "@/Utils/api";
import { useSelector } from "react-redux";
// import { fetchDataFromApi } from "@/Utils/api";

const Header = () => {
  const {cartItems} = useSelector((state)=>state.carts)
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScroll, setLastScroll] = useState(0);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async() => {
    const { data } = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(data);
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScroll) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScroll]);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <img src="/logo.svg" className="w-[40px] md:w-[60px]" alt="" />
        </Link>

        <Menu 
        showCatMenu={showCatMenu} 
        setShowCatMenu={setShowCatMenu}
        categories={categories} 
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setMobileMenu={setMobileMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories} 
          />
        )}

        <div className="flex items-center justify-center gap-2 text-black">
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[.05] cursor-pointer relative">
            {/* Icon Start */}
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]"></IoMdHeartEmpty>
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full absolute top-1 left-5 md:left-7 bg-red-600 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[4px]">
              53
            </div>
          </div>

          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]"></BsCart>
             {cartItems.length > 0 &&   <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full absolute top-1 left-5 md:left-7 bg-red-600 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[4px]">
               {cartItems.length}
              </div>}
            </div>
          </Link>

          <div className="w-8 md:hidden md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[.05] cursor-pointer relative">
            {mobileMenu ? (
              <VscChromeClose
                onClick={() => setMobileMenu(false)}
                className="text-[16px]"
              />
            ) : (
              <BiMenuAltRight
                onClick={() => setMobileMenu(true)}
                className="text-[16px]"
              />
            )}
          </div>
        </div>
        {/* Icon end */}
      </Wrapper>
    </header>
  );
};

export default Header;
