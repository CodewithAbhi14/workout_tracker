import { Link, useLocation } from "react-router-dom";
import image from "../assets/logo.png";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const location = useLocation();

  useEffect(() => {}, [location]);

  const handleClick = () => {
    logout();
  };
  return (
    <header className="bg-transparent backdrop-brightness-75 backdrop-blur-md border-b-2 shadow-lg max-w-full w-full mx-auto p-4 flex items-center justify-between rounded-b-xl fixed top-0">
      <Link to="/" className="flex items-center">
        <img
          src={image}
          alt="logo"
          className="w-10 h-10 md:w-12 md:h-12 mr-3"
        />
        <h1 className="font-bold text-xl md:text-2xl text-black">
          Workout Buddy
        </h1>
      </Link>

      <nav className="flex space-x-4">
        {user && (
          <div className="flex items-center space-x-2">
             <div className="img_container w-full flex items-center justify-center relative z-40">
                <div
                  className="size-10 z-40 border-2 border-white bg-emerald-500 rounded-full flex justify-center items-center"
                >
                  <p className="text-white text-center font-bold text-2xl">
                    {user.email ? user.email.charAt(0) : ''}
                  </p>
                </div>
              </div>
            <Link to='/profile'><span className="text-black mr-2">{user.email}</span></Link>
            <div className="relative group">
                  <div className="relative w-32 h-8 opacity-90 overflow-hidden rounded-xl bg-transparent z-10">
                    <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transistion-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"></div>

                    <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-transparent">
                      <button
                      onClick={handleClick}
                        name="text"
                        className="input font-semibold text-lg h-full opacity-90 w-full  rounded-xl bg-transparent"
                      >
                        Logout
                      </button>
                    </div>
                    <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-emerald-500 blur-[30px]"></div>
                  </div>
                </div>
          </div>
        )}

        {!user && (
          <div>
            {location.pathname === "/signup" && (
              <Link to="/login">
                <div className="relative group">
                  <div className="relative w-32 h-8 opacity-90 overflow-hidden rounded-xl bg-transparent z-10">
                    <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transistion-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"></div>

                    <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-transparent">
                      <button
                        name="text"
                        className="input font-semibold text-lg h-full opacity-90 w-full  rounded-xl bg-transparent"
                      >
                        Login
                      </button>
                    </div>
                    <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-emerald-500 blur-[30px]"></div>
                  </div>
                </div>
              </Link>
            )}
            {location.pathname === "/login" && (
              <Link to="/signup">
                <div className="relative group">
                  <div className="relative w-32 h-8 opacity-90 overflow-hidden rounded-xl bg-transparent z-10">
                    <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transistion-all duration-700 h-full w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12"></div>

                    <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-2xl inset-0.5 bg-transparent">
                      <button
                        name="text"
                        className="input font-semibold text-lg h-full opacity-90 w-full  rounded-xl bg-transparent"
                      >
                        SignUp
                      </button>
                    </div>
                    <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-green-500 to-emerald-500 blur-[30px]"></div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
