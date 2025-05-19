import React from 'react';
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";

const Contact_us = () => {
  return (
    <div className='mt-[120px]'>
      <div className="relative w-full lg:h-36 md:h-36 sm:h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">Contact Us</h1>
      </div>

      <section className="mb-32">
        <div className="relative h-[300px] overflow-hidden bg-cover bg-center bg-no-repeat">
          <iframe
            className="w-full h-[300px] border-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.684252891408!2d151.2052049152105!3d-33.87480252523726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae3e0726722b%3A0x5030bfbca83b0b0!2sVictoria%20University%20Sydney!5e0!3m2!1sen!2sau!4v1714886120982!5m2!1sen!2sau"
            allowFullScreen=""
            loading="lazy"
            title="MindForge Sydney Location"
          ></iframe>
        </div>

        <div className="container px-6 md:px-12 mx-auto">
          <div className="rounded-lg bg-white/80 backdrop-blur-xl border border-gray-300 shadow-lg px-6 py-12 md:px-12 md:py-16 -mt-[100px]">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-5/12 mb-12 lg:mb-0 md:px-3 lg:px-6">
                <form>
                  <div className="mb-6 relative">
                    <input type="text" id="contact-name" className="peer w-full border-2 rounded px-3 py-2 bg-transparent outline-none transition-all focus:border-primary" placeholder=" " />
                    <label htmlFor="contact-name" className="absolute text-gray-500 top-2 left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-[-0.8rem] peer-focus:text-sm transition-all">Name</label>
                  </div>
                  <div className="mb-6 relative">
                    <input type="email" id="contact-email" className="peer w-full border-2 rounded px-3 py-2 bg-transparent outline-none transition-all focus:border-primary" placeholder=" " />
                    <label htmlFor="contact-email" className="absolute text-gray-500 top-2 left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-[-0.8rem] peer-focus:text-sm transition-all">Email address</label>
                  </div>
                  <div className="mb-6 relative">
                    <textarea id="contact-message" rows="4" className="peer w-full border-2 rounded px-3 py-2 bg-transparent outline-none transition-all focus:border-primary" placeholder=" "></textarea>
                    <label htmlFor="contact-message" className="absolute text-gray-500 top-2 left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-[-0.8rem] peer-focus:text-sm transition-all">Message</label>
                  </div>

                  <div className="mb-6 flex items-start">
                    <input type="checkbox" id="copy" className="mr-2 mt-1" />
                    <label htmlFor="copy" className="text-sm">Send me a copy of this message</label>
                  </div>

                  <button type="submit" className="w-full bg-primary text-white rounded px-6 py-2 font-medium uppercase">Send</button>
                </form>
              </div>

              <div className="w-full lg:w-7/12 md:px-3 lg:px-6">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 xl:w-1/2 mb-8">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-4 rounded-md text-primary">
                        <CiMail className="text-xl" />
                      </div>
                      <div className="ml-6">
                        <p className="font-bold mb-1">Technical Support</p>
                        <p className="text-sm text-gray-600">studyatmindforge@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 xl:w-1/2 mb-8">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-4 rounded-md text-primary">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                      </div>
                      <div className="ml-6">
                        <p className="font-bold mb-1">Address</p>
                        <p className="text-sm text-gray-600">Sydney, Australia</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 xl:w-1/2 mb-8">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-4 rounded-md text-primary">
                        <FiPhoneCall className="text-xl" />
                      </div>
                      <div className="ml-6">
                        <p className="font-bold mb-1">Phone Number</p>
                        <p className="text-sm text-gray-600">0123456789</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 xl:w-1/2 mb-8">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-4 rounded-md text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5" />
                        </svg>
                      </div>
                      <div className="ml-6">
                        <p className="font-bold mb-1">Mobile App</p>
                        <p className="text-sm text-gray-600">Coming soon</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact_us;