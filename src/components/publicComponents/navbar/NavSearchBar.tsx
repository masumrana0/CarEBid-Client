import React from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const NavSearchBar = () => {
    return (
        <div className='flex items-center gap-3 w-[500px] py-4 px-3 bg-gray-200 rounded  text-lg text-gray-950'>
            <HiOutlineMagnifyingGlass className='text-2xl' />
            <input className='outline-none border-none bg-inherit w-full text-inherit text-black' type='text' placeholder='Search for cars (ex, BMW, Audi, Ford)' />
        </div>
    );
};

export default NavSearchBar;