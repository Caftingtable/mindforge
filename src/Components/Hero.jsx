import { Link } from "react-router-dom";
import hero from "../assets/hero.svg";

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white pt-[100px]">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-12 py-12 lg:py-24">
          {/* Text Content */}
          <div className="text-center lg:text-left lg:max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Empower Your Learning Journey with <span className="text-accent">MindForge</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-8">
              Discover expert tutors, book real-time sessions, and unlock your potential. Whether you're mastering a subject or preparing for exams, MindForge connects you to the support you need — anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/registration">
                <button className="px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end mb-10 lg:mb-0">
            <img
              src={hero}
              alt="MindForge Hero"
              className="h-72 sm:h-80 lg:h-96 xl:h-[480px] object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Choose MindForge */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-primary">MindForge?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We’re more than just a tutoring platform — we’re your learning partner. Here’s what sets us apart.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-primary mb-2">Verified Expert Tutors</h3>
              <p className="text-sm text-gray-600">
                All tutors are vetted for qualifications and teaching ability to ensure top-tier learning experiences.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-primary mb-2">Flexible Booking</h3>
              <p className="text-sm text-gray-600">
                Schedule sessions anytime that fits your calendar — day or night, weekday or weekend.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-primary mb-2">Seamless Online Experience</h3>
              <p className="text-sm text-gray-600">
                Interactive video sessions, integrated materials, and instant feedback for better engagement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
