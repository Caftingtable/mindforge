import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from './Modal';
import auth from './firebase.config'; // This is the auth instance
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const JoinUs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState(null); // 'student' or 'tutor'
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Signed in as ${result.user.displayName} (${role})`);
      setModalOpen(false);
    } catch (error) {
      alert('Google sign-in failed: ' + error.message);
      console.error(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Save form info and role to your DB here
    alert(`Registered ${form.name} as ${role}`);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section className="text-center pt-28 pb-16 px-6 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Become a part of MindForge</h1>
        <p className="text-lg mb-6">
          Join as a tutor or student and unlock powerful learning opportunities.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-white text-primary border border-primary px-6 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition"
            onClick={() => { setRole('student'); setModalOpen(true); }}
          >
            Join as Student
          </button>
          <button
            className="bg-white text-primary border border-primary px-6 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition"
            onClick={() => { setRole('tutor'); setModalOpen(true); }}
          >
            Join as Tutor
          </button>
        </div>
      </section>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Join as {role === 'student' ? 'Student' : 'Tutor'}</h2>
        <button
          className="w-full bg-red-500 text-white py-2 rounded mb-4 flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
        <div className="text-center text-gray-500 mb-2">or</div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="w-full border px-3 py-2 rounded mb-2"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded mb-2"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded mb-4"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            className="w-full bg-primary text-white py-2 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
      </Modal>

      {/* Info Sections */}
      <section className="py-16 px-6 grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Student */}
        <div>
          <h2 className="text-2xl font-bold mb-4">For Students</h2>
          <ul className="space-y-3 text-lg list-disc list-inside">
            <li>Access top-rated tutors across various subjects</li>
            <li>Book flexible, real-time sessions</li>
            <li>Get personalized academic help anytime</li>
            <li>Affordable, transparent pricing</li>
          </ul>
        </div>

        {/* Tutor */}
        <div>
          <h2 className="text-2xl font-bold mb-4">For Tutors</h2>
          <ul className="space-y-3 text-lg list-disc list-inside">
            <li>Work from anywhere, anytime</li>
            <li>Grow your student base globally</li>
            <li>Get paid securely for every session</li>
            <li>Join a community of passionate educators</li>
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {["Choose Role", "Create Profile", "Get Matched", "Start Learning/Teaching"].map((step, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-4">{i + 1}</div>
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-xl">What's the difference between tutor and student accounts?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Students can book sessions, while tutors can create offerings and get paid for teaching.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-xl">How does the tutor application work?</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Tutors submit an application and go through a short approval process to ensure quality.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-10 bg-blue-600 text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
        <Link to="/registration">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
            Join MindForge Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default JoinUs;
