import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";


const Profile = () => {

    const { logout } = useLogout();

  const [profile, setProfile] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return; 

      try {
        const response = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setProfile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [user]);

 
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-center items-center md:h-[100vh] h-[100vh]">
      <div className="bg-transparent backdrop-brightness-75 backdrop-blur-md border-b-2 border-r-2 border-gray-300 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4">
        <div className=" rounded-full self-center">
          <div className="profile-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
            <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
              <div className="img_container w-full flex items-center justify-center relative z-40">
                <div
                  className="size-36 z-40 border-4 border-white bg-emerald-500 rounded-full flex justify-center items-center"
                >
                  <p className="text-white text-center font-bold text-8xl">
                    {profile.username ? profile.username.charAt(0) : ''}
                  </p>
                </div>
              </div>
            </div>
            <div className="headings *:text-center *:leading-4">
              <p className="text-xl font-serif font-semibold text-[#434955]">
                {profile.username}
              </p>
            </div>
            <div className="w-full items-center justify-center flex">
              <ul className="flex flex-col items-start gap-2 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#434955] pb-3">
                <li>
                  <p>{profile.phone_number}</p>
                </li>
                <li>
                  <p>{user.email}</p>
                </li>
              </ul>
            </div>
            <hr className="w-full h-3 bg-emerald-500" />
          </div>
        </div>
        <div className="flex justify-evenly items-center">
          <button
            onClick={handleLogout}
            className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 border-2 rounded-full group px-4 py-2"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
