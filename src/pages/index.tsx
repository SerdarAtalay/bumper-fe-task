import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import PhoneImage from "../assets/images/phone-image.png";
import BumperLogo from '../components/BuLogo';
import BackgroundImage from "../assets/images/pexels-lynxexotics.png";
import BuButton from "@/components/BuButton";
import { ArrowRightIcon } from "@/components/BuIcon";
import BuHeader from "@/components/BuHeader";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Bumper Payment Solutions</title>
        <meta
          name="description"
          content="Flexible payment solutions for customers"
        />
      </Head>

      <div className="relative bg-[#E5E5E5] overflow-hidden">
        <BuHeader />

        <div className="relative py-16 md:py-24">
          <div className="absolute inset-0 z-0">
            <Image 
              src={BackgroundImage.src} 
              alt="Background" 
              layout="fill" 
              objectFit="cover"
              className="opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#414b6e]/50 to-[#414B6E]/30" />
          </div>
          
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="max-w-xl">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-white font-bold">Excellent</span>
                <div className="text-white bg-[#00B67A] px-2"> ★ ★ ★ ★ ★ </div>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-[Oswald] uppercase leading-tight">
                Become a Bumper Approved Dealership
              </h1>

              <p className="text-lg text-white mb-8">
                Join our network of 3,000+ garages and dealerships who already
                offer Bumper to their customers.
              </p>

              <div className="space-y-4">
                <Link href="/form">
                <BuButton 
                  type="button" 
                  icon={<ArrowRightIcon className="w-5 h-5" />}
                  className="bg-[#32BE50] border-[#1B1B1B] px-5"
                >
                  Register your interest
                </BuButton>
                </Link>
                <p className="text-white text-sm m-2">
                  Explore our flexible payment solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:space-x-12 items-center">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <div className="flex flex-col space-y-2 mb-6">
                <BumperLogo />
                <h2 className="text-4xl md:text-5xl font-bold uppercase font-[Oswald]">
                  PayLater
                </h2>
              </div>

              <div className="md:hidden mb-8">
                <div className="relative">
                  <Image
                    src={PhoneImage.src}
                    alt="Bumper payment interface on mobile phone"
                    width={280}
                    height={560}
                    className="mx-auto"
                    priority
                  />
                </div>
              </div>

              <p className="text-lg mb-8">
                Give customers more flexibility at checkout, online and in
                store. Let them spread the cost with interest-free monthly
                payments.
              </p>

              <div className="space-y-2 mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#FF733C]">
                  No risk to your business.
                </h3>
                <h3 className="text-2xl md:text-3xl font-bold text-[#FF733C]">
                  No worries for your customers.
                </h3>
              </div>

              <p className="font-semibold mb-6">It&apos;s as simple as:</p>

              <div className="space-y-6 mb-10">
                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF733C] border border-[#1B1B1B] flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">
                      Register your interest below and our team will get in
                      touch
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF733C] border border-[#1B1B1B] flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">
                      Once approved, start offering Bumper&apos;s flexible payment
                      options to your customers
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF733C] border border-[#1B1B1B] flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    3
                  </div>
                  <div>
                    <p className="font-semibold">
                      We pay you in full while customers enjoy the flexibility
                      of manageable monthly payments
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
              <Link href="/form">
                <BuButton 
                  type="button" 
                  icon={<ArrowRightIcon className="w-5 h-5" />}
                  className="bg-[#32BE50] border-[#1B1B1B] px-5"
                >
                  Register your interest
                </BuButton>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 md:pl-8 hidden md:block">
              <div className="relative">
                <Image
                  src={PhoneImage.src}
                  alt="Bumper payment interface on mobile phone"
                  width={350}
                  height={700}
                  className="mx-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
