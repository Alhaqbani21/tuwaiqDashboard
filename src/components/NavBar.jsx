import React from 'react';

function NavBar(props) {
  return (
    <div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 flex items-center justify-between mx-auto px-4">
              <div className="flex items-center">
                <img
                  src="https://res.cloudinary.com/speedwares/image/upload/v1659284687/windframe-logo-main_daes7r.png"
                  className="h-8 w-auto"
                  alt=""
                />
              </div>
              <div className="flex items-center mx-5">
                <div className="flex items-center">
                  <img
                    src="https://img.icons8.com/?size=100&id=52233&format=png&color=000000"
                    className="object-cover h-9 w-9 rounded-full mr-2 bg-gray-300"
                    alt=""
                  />
                  <p className="font-semibold text-sm text-primary">
                    {props.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
