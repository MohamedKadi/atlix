import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="navbar shadow-sm relative"
      style={{
        backgroundColor: '#fefae0',
        color: '#333',
        fontFamily: "'CustomFont', Arial, sans-serif",
      }}
    >
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost text-xl"
          style={{ color: '#bc6c25' }}
        >
          ATLIX
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/aboutus" style={{ color: '#333' }}>
              About us
            </Link>
          </li>
          <li>
            <a style={{ color: '#333' }}>Login</a>
          </li>
          <li>
            <a style={{ color: '#333' }}>Sign Up</a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex-none lg:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: '#333' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className="absolute top-full left-0 right-0 shadow-lg lg:hidden z-50"
          style={{ backgroundColor: '#fefae0' }}
        >
          <ul className="menu menu-vertical p-4 space-y-2">
            <li>
              <Link
                href="/aboutus"
                style={{ color: '#333' }}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-4 hover:bg-opacity-10 hover:bg-black rounded"
              >
                About us
              </Link>
            </li>
            <li>
              <a
                style={{ color: '#333' }}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-4 hover:bg-opacity-10 hover:bg-black rounded cursor-pointer"
              >
                Login
              </a>
            </li>
            <li>
              <a
                style={{ color: '#333' }}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-4 hover:bg-opacity-10 hover:bg-black rounded cursor-pointer"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
