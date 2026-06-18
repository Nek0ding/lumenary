"use client";
import type { NextPage } from "next";
import { useCallback } from "react";
import Image from "next/image";

const DONESignInPage: NextPage = () => {
  const onButtonClick = useCallback(() => {
    // Please sync "(DONE) Dashboard - User" to the project
  }, []);

  const onSignUpHereClick = useCallback(() => {
    // Please sync "(DONE) Sign Up Page" to the project
  }, []);

  return (
    <div className="w-full relative bg-foundation-white-primary-light overflow-hidden flex items-center justify-center py-0 pl-[33px] pr-[30px] box-border leading-[normal] tracking-[normal]">
      <main className="h-[1024px] flex-1 flex items-start justify-between flex-wrap content-start gap-0 max-w-[1196px] [row-gap:20px] text-center text-[24px] text-foundation-white-primary-light font-plus-jakarta-sans lg:gap-0 lg:max-w-full">
        <div className="h-[1024px] flex-[1.0569] flex flex-col items-start py-[28.9px] px-[17px] box-border gap-3 bg-[url('/Frame-304@3x.png')] bg-cover bg-no-repeat bg-[top] min-w-[310px] min-h-[1024px] max-w-full mq1050:pt-num-20 mq1050:pb-num-20 mq1050:box-border">
          <div className="w-[182px] flex items-center gap-[13px]">
            <Image
              className="h-[50px] w-[50px] relative"
              loading="lazy"
              width={50}
              height={50}
              sizes="100vw"
              alt=""
              src="logo.png"
            />
            <div className="w-[119px] flex flex-col items-start">
              <h3 className="m-0 self-stretch relative text-[length:inherit] tracking-[0.02em] font-bold font-[inherit]">
                Lumenary
              </h3>
              <b className="self-stretch relative text-[8px] tracking-[0.02em] uppercase text-plum text-left overflow-hidden text-ellipsis whitespace-nowrap">
                Gunadarma Library
              </b>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center py-[309.5px] px-[3px] box-border gap-3 max-w-full text-left text-[36px] mq450:pt-[131px] mq450:pb-[131px] mq450:box-border mq1050:pt-[201px] mq1050:pb-[201px] mq1050:box-border">
            <h1 className="m-0 w-full relative text-[length:inherit] font-extrabold font-[inherit] inline-block max-w-[396px] mq450:text-[22px] mq450:max-w-full mq1050:text-[29px]">
              Illuminating Your Intellectual Journey.
            </h1>
            <div className="w-[396px] relative text-[24px] font-medium flex items-center max-w-[396px] mq450:text-[19px] mq450:max-w-full">
              Access thousands of library books, track your ongoing loans, and
              enjoy a personalized reading dashboard curated just for you.
            </div>
          </div>
        </div>
        <div className="h-[1024px] flex-1 bg-foundation-white-primary-light flex items-center justify-center pt-8 px-8 pb-[29.1px] box-border min-w-[310px] max-w-[592px] mq750:pt-[21px] mq750:pb-num-20 mq750:box-border mq750:max-w-full mq750:flex-1">
          <form className="m-0 h-[529px] flex-1 flex flex-col items-center gap-8 max-w-[442px] mq450:gap-4 mq450:max-w-full">
            <div className="self-stretch flex flex-col items-start gap-3">
              <h1 className="m-0 self-stretch relative text-[32px] font-bold font-plus-jakarta-sans text-black text-left mq450:text-[19px] mq1050:text-[26px]">
                Welcome Back!
              </h1>
              <div className="self-stretch relative text-num-16 font-medium font-plus-jakarta-sans text-black text-left">
                Please enter your student credentials to access your library
                account.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-3">
              <div className="self-stretch flex flex-col items-start gap-[17px]">
                <div className="self-stretch flex flex-col items-start gap-2.5">
                  <h3 className="m-0 self-stretch relative text-[20px] font-bold font-plus-jakarta-sans text-black text-left mq450:text-num-16">
                    Student ID Number (NPM)
                  </h3>
                  <div className="self-stretch h-[43px] rounded-xl border-foundation-creamy-custard-normal-active border-solid border-[1.5px] box-border flex items-center py-2.5 px-num-20">
                    <input
                      className="w-full [border:none] [outline:none] font-plus-jakarta-sans text-num-16 bg-[transparent] h-5 relative text-foundation-creamy-custard-dark-hover text-left flex items-center min-w-[93px] p-0"
                      placeholder="Enter your id number"
                      type="text"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-2.5">
                  <h3 className="m-0 self-stretch relative text-[20px] font-bold font-plus-jakarta-sans text-black text-left mq450:text-num-16">
                    Password
                  </h3>
                  <div className="self-stretch h-[43px] rounded-xl border-foundation-creamy-custard-normal-active border-solid border-[1.5px] box-border flex items-center py-2.5 px-num-20">
                    <input
                      className="w-full [border:none] [outline:none] font-plus-jakarta-sans text-num-16 bg-[transparent] h-5 relative text-foundation-creamy-custard-dark-hover text-left flex items-center min-w-[117px] p-0"
                      placeholder="Create a strong password"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex items-start justify-between gap-0 [row-gap:20px] mq450:flex-wrap mq450:gap-0">
                <div className="relative text-num-16 font-medium font-plus-jakarta-sans text-foundation-creamy-custard-darker text-left opacity-[0.7]">
                  Keep me signed in
                </div>
                <div className="relative text-num-16 font-medium font-plus-jakarta-sans text-foundation-creamy-custard-darker text-left opacity-[0.7]">
                  Forgot your password?
                </div>
              </div>
            </div>
            <button
              className="cursor-pointer [border:none] py-3 px-2.5 bg-[transparent] self-stretch rounded-[40px] [background:linear-gradient(92.68deg,_#dddef2_10.1%,_#8ea1e6_44.71%,_#3037b4_76.92%,_#101464)] flex items-center justify-center gap-4"
              type="submit"
              onClick={onButtonClick}
            >
              <input
                className="m-0 h-8 w-8 relative rounded-[20px] hidden shrink-0"
                type="checkbox"
              />
              <input
                className="m-0 relative text-[32px] tracking-[0.02em] font-bold font-plus-jakarta-sans text-[transparent] text-left inline-block shrink-0"
                type="checkbox"
              />
              <input
                className="m-0 h-8 w-8 relative rounded-[20px] hidden shrink-0"
                type="checkbox"
              />
            </button>
            <div className="self-stretch flex items-center gap-3">
              <div className="h-px flex-1 relative border-foundation-creamy-custard-darker border-solid border-t-[1px] box-border opacity-[0.5]" />
              <div className="relative text-num-16 font-medium font-plus-jakarta-sans text-foundation-creamy-custard-darker text-left opacity-[0.5]">
                Or sign up with
              </div>
              <div className="h-px flex-1 relative border-foundation-creamy-custard-darker border-solid border-t-[1px] box-border opacity-[0.5]" />
            </div>
            <div className="w-[253px] h-5 flex items-center gap-3 mq450:flex-wrap">
              <div className="relative text-num-16 font-medium font-plus-jakarta-sans text-foundation-creamy-custard-darker text-left">
                New to Lumenary?
              </div>
              <b
                className="relative text-num-16 font-plus-jakarta-sans text-transparent !bg-clip-text [background:linear-gradient(92.68deg,_#dddef2_10.1%,_#8ea1e6_44.71%,_#3037b4_76.92%,_#101464)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-left cursor-pointer"
                onClick={onSignUpHereClick}
              >
                Sign Up Here
              </b>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DONESignInPage;
