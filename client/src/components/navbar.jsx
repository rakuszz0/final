import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Avatar, Button } from 'flowbite-react';
import { UserContext } from "../contexts/userContext";

import text from '../assets/Land Tick.png';
import logo from '../assets/Group.png';
import user from '../assets/boy 1.png';
import tiket from '../assets/more 1.png';
import buy from '../assets/ticket 1.png';
import payment from '../assets/bill 1.png';
import logout from '../assets/logout 1.png';
import FormLogin from './auth/login';
import FormRegister from './auth/register';



function Navbar() {
  const [state, dispatch] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  const Logout = () => {
    dispatch({ type: "LOGOUT" })
  }

  useEffect(() => {
    if (state.isLogin === true) {
      setShowLogin(false)
    }
  }, [state.isLogin])


  return (
    <>
      <nav className="border-gray-200 px-2 sm:px-5 h-20 py-5 shadow-lg">
        <div className="container flex justify-between items-center mx-auto">
            <Link to={"/"}>
            <div className="flex items-center">
              <img
                src={text}
                alt="text"
                className="h-6 w-23 sm:h-9 hover:cursor-pointer"
              />
              <img
                src={logo}
                className="h-6 w-20 mr-8 sm:h-9 hover:cursor-pointer"
                alt="logo"
              />
            </div>
          </Link>
          {state.isLogin ? (
            <Dropdown
              label={<Avatar alt="user" img={user} bordered={true} rounded={true} color="pink" />}
              arrowIcon={false}
              inline={true}
            >
              {state.user.role === 'user' ? (
                <Dropdown.Item>
                  <Link to={'/my-ticket'}>
                    <div className="pb-1">
                      <div className="px-2 py-1 text-sm text-gray-700 flex items-center cursor-pointer hover:bg-grey-100">
                        <div className="w-5 mr-3">
                          <img src={buy} alt="" />
                        </div>
                        <span>My Ticket</span>
                      </div>
                    </div>
                  </Link>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item>
                  <Link to={'/add-ticket'}>
                    <div className="pb-1">
                      <div className="px-2 py-1 text-sm text-gray-700 flex items-center cursor-pointer hover:bg-grey-100">
                        <div className="w-5 mr-3">
                          <img src={tiket} alt="" />
                        </div>
                        <span>Add Ticket</span>
                      </div>
                    </div>
                  </Link>
                </Dropdown.Item>
              )}
              {state.user.role === 'user' ? (
                <Dropdown.Item>
                  <Link to={'/payment'}>
                    <div className="pb-1">
                      <div className="px-2 py-1 text-sm text-gray-700 flex items-center cursor-pointer hover:bg-grey-100">
                        <div className="w-5 mr-3">
                          <img src={payment} alt="" />
                        </div>
                        <span>Payment</span>
                      </div>
                    </div>
                  </Link>
                </Dropdown.Item>
              ) : (
                <></>
              )}

              <Dropdown.Divider className="border-rose-400" />
              <Dropdown.Item>
                <div className="pb-1">
                  <div className="px-2 py-1 text-sm text-gray-700 flex items-center cursor-pointer hover:bg-grey-100">
                    <div className="w-5 mr-3">
                      <img src={logout} alt="" />
                    </div>
                    <button onClick={Logout}>Log Out</button>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div className='flex mr-10'>
              <Button
                className='mr-5'
                outline={true}
                gradientDuoTone="pinkToOrange"
                onClick={() => {
                  setShowRegister(true);
                  setShowLogin(false);
                }}
              >
                Register
              </Button>
              <Button
                gradientDuoTone="pinkToOrange"
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
        {showLogin && (
          <FormLogin
            show={showLogin}
            setShow={setShowLogin}
            setShowRegister={setShowRegister}
          />
        )}
        {showRegister && (
          <FormRegister
            show={showRegister}
            setShow={setShowRegister}
            setShowLogin={setShowLogin}
          />
        )}
      </nav>
    </>
  );
}

export default Navbar;
