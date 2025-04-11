import React from 'react';
import BumperLogo from './BuLogo';

const BuHeader: React.FC = () => {
    return (
        <header>
            <div className="bg-[#1B1B1B] text-white">
                <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
                    <div className="flex space-x-6">
                        <span className="text-sm font-medium border-b-2 border-[#FF733C] pb-1">
                            Customers
                        </span>
                        <span className="text-sm font-medium">Business</span>
                    </div>
                    <div className="hidden md:block">
                        <button className="border border-white rounded px-3 py-1 text-sm">
                            Log In
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#FF733C] border-b border-[#1B1B1B]">
                <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
                        <BumperLogo />
                        <span className="ml-2 text-sm font-bold">for business</span>
                    </div>
                    <button className="bg-[#32BE50] border border-[#1B1B1B] rounded px-4 py-1 text-sm font-medium">
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
};

export default BuHeader;