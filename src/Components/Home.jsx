import React from "react";
import { Link } from "react-router-dom";
import Blog_Section from "./Blog_Section";
import Faq_section from "./Faq_section";
import Hero from "./Hero";
import Newsletter_card from "./Newsletter_card";
import Review_section from "./Review_section";
import Sponsorship from "./Sponsorship";

const Home = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section (contains Browse buttons inside Hero.jsx) */}
            <Hero />

            {/* Reviews */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800"></h2>
                    <Review_section />
                </div>
            </section>

            {/* Blog */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">From the Blog</h2>
                    <Blog_Section />
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>
                    <Faq_section />
                </div>
            </section>

            {/* Sponsorship */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Sponsorship />
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-[#f9fafb] py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Newsletter_card />
                </div>
            </section>
        </div>
    );
};

export default Home;
