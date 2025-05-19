import React from 'react';
import { FaYoutube, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import logo from '../assets/logo-black.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10 pb-4 transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Mind Forge Logo" className="h-12 mb-3" />
          <p className="text-sm opacity-80">
            CONNECTING MINDS, EMPOWERING LEARNING
          </p>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-accent mb-2">RESOURCES</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/all_session_user" className="hover:underline">Sessions</a></li>
            <li><a href="/tutors" className="hover:underline">Tutors</a></li>
            <li><a href="/contact_us" className="hover:underline">Contact Us</a></li>
            <li><a href="/about_us" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-accent mb-2">SUPPORT</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Conditions</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-accent mb-2">CONTACT US</h4>
          <p className="text-sm">Sydney, Australia</p>
          <p className="text-sm">studyatmindforge@gmail.com</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center">
        <div className="flex justify-center space-x-4 text-xl mb-2">
          <a href="#" className="hover:text-accent"><FaYoutube /></a>
          <a href="#" className="hover:text-accent"><FaFacebook /></a>
          <a href="#" className="hover:text-accent"><FaLinkedin /></a>
          <a href="#" className="hover:text-accent"><FaGithub /></a>
        </div>
        <p className="text-sm opacity-80">
          © Copyright 2025. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;