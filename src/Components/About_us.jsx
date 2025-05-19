import { Link } from 'react-router-dom';
import React from 'react';
import about_img from '../assets/about-img-2.jpg';
import { FaTools } from "react-icons/fa";
import { FaBuffer } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";

const About_us = () => {
  return (
    <div className='mt-[120px]'>
      {/* Top Banner */}
      <div className="relative w-full h-36 bg-primary flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">About Us</h1>
      </div>

      {/* Image + Intro Section */}
      <div className='w-4/5 mx-auto'>
        <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:my-12 xl:max-w-6xl">
          <div className="w-full h-64 lg:w-1/2 lg:h-auto">
            <img className="h-full w-full object-cover rounded-tr-[100px] rounded-bl-[100px]" src={about_img} alt="About MindForge" />
          </div>

          <div className="max-w-lg bg-white shadow-lg rounded-lg overflow-hidden md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12 p-12">
            <h2 className="text-2xl font-bold text-primary lg:text-4xl">
              Empowering Education Through Online Tutoring
            </h2>
            <p className="mt-4 text-paragraph">
              MindForge is your trusted platform for connecting learners with expert tutors. Book real-time sessions, get academic support, and start learning instantly—all from the comfort of your home.
            </p>
            <div className="mt-8">
              <Link to="/registration">
                <button className="px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary my-8">
        <section id="features" className="px-6 py-10 md:py-20 md:px-10 text-center">
          <span className="text-primary font-medium uppercase tracking-wider">
            Our Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-title mt-2">
            Transforming Tutoring With Technology
          </h2>
          <p className="max-w-xl mx-auto text-paragraph mt-4">
            Personalized, interactive learning with professional tutors. Book anytime, get expert help instantly, and build skills with tailored support.
          </p>

          <div className="grid gap-10 pt-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-md p-8 shadow text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-primary rounded-md">
                <FaTools className='text-white' />
              </div>
              <h3 className="mt-6 font-semibold text-title">Interactive Session Tools</h3>
              <p className="text-paragraph mt-3">
                Use whiteboards, screen sharing, and real-time quizzes to boost engagement.
              </p>
            </div>

            <div className="bg-white rounded-md p-8 shadow text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-primary rounded-md">
                <FaBuffer className='text-white' />
              </div>
              <h3 className="mt-6 font-semibold text-title">Flexible Scheduling</h3>
              <p className="text-paragraph mt-3">
                Schedule at your convenience with real-time calendar sync and notifications.
              </p>
            </div>

            <div className="bg-white rounded-md p-8 shadow text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center bg-primary rounded-md">
                <FaChalkboardTeacher className='text-white' />
              </div>
              <h3 className="mt-6 font-semibold text-title">Personalized Tutor Matching</h3>
              <p className="text-paragraph mt-3">
                Smart algorithms match students with the best tutors based on subject, goals, and availability.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* About MindForge Paragraphs */}
      <div className="bg-white py-16 px-6 lg:px-0 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Who We Are</h2>
        <p className="text-paragraph mb-4 text-justify">
          At MindForge, our mission is to bridge the gap between students and qualified tutors through a seamless and accessible online platform. We believe every learner deserves high-quality academic support regardless of location, time, or budget. With real-time scheduling, interactive tools, and expert guidance, we aim to transform traditional tutoring into a more inclusive and efficient experience.
        </p>
        <p className="text-paragraph mb-4 text-justify">
          Founded with a passion for education and innovation, MindForge has quickly grown into a trusted platform for learners and educators alike. We are committed to continuous improvement—integrating feedback from our community to refine the platform and introduce new, meaningful features that elevate the learning journey.
        </p>
        <p className="text-paragraph text-justify">
          Join us in shaping the future of online learning. Whether you're a student seeking clarity, a tutor eager to share knowledge, or a partner interested in empowering education, MindForge is the space where minds connect and growth begins.
        </p>
      </div>
    </div>
  );
};

export default About_us;
