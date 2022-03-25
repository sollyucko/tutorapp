import React from 'react';
import Link from 'next/link';

export default function Navbar(props) {
  const { ...rest } = props;

  return (
    <Guest {...rest}/>
  );
}

const Guest = (props) => {
  const { ...rest } = props;

  return (
    <nav {...rest}>
      <div className="flex-none flex items-center">
        <Link href="/">
          <a className="cursor-pointer">
            <h1 className="text-3xl font-bold">tutorapp</h1>
          </a>
        </Link>
      </div>
      <div className="flex-auto flex items-center justify-end gap-6">
        <Link href="/explore">
          <a className="flex-none cursor-pointer hover:underline underline-offset-1 decoration-2 decoration-blue-500">
            Explore
          </a>
        </Link>

        <button className="px-3 py-2 rounded-lg bg-blue-500 shadow-md shadow-blue-500 font-semibold text-white">
          Login/Register
        </button>
      </div>
    </nav>
  );
}

const Authenticated = (props) => {
  const { ...rest } = props;

  return (
    <nav {...rest}>
      <div className="flex-none flex items-center">
        <a className="cursor-pointer">
          <h1 className="text-3xl font-bold">tutorapp</h1>
        </a>
      </div>
      <div className="flex-auto flex items-center justify-end gap-6">
        <a className="cursor-pointer hover:underline underline-offset-1 decoration-2 decoration-blue-500">
          Dashboard
        </a>
        <a className="cursor-pointer hover:underline underline-offset-1 decoration-2 decoration-blue-500">
          Explore
        </a>

        <button className="">
          <img className="h-10 w-10 rounded-full ring-2 ring-white shadow-md shadow-gray-600" src="https://loremflickr.com/256/256" alt="Profile"/>
        </button>
      </div>
    </nav>
  );
}
