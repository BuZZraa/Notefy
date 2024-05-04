import React from "react";

// KeyFeatures component
function KeyFeatures() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Key Features</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Organize your notes with ease.</li>
        <li>Quickly search through your notes.</li>
        <li>Use your voice to ease up note-taking.</li>
        <li>Secure your notes with password protection.</li>
      </ul>
    </div>
  );
}

// Testimonials component
function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "I've been using this notes app for a while now, and it's made my life so much easier. Highly recommended!",
      author: "John Doe, Student",
    },
    {
      id: 2,
      text: "As a professional, I rely on this app to keep track of my tasks and ideas. It's simple yet powerful.",
      author: "Jane Smith, Project Manager",
    },
    {
      id: 3,
      text: "The synchronization feature is a game-changer for me. Now I can access my notes from anywhere!",
      author: "David Brown, Freelancer",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Testimonials</h2>
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-gray-50 p-4 rounded-lg shadow-md mb-4"
        >
          <p className="text-gray-700">{testimonial.text}</p>
          <p className="text-gray-600 text-sm mt-2">{testimonial.author}</p>
        </div>
      ))}
    </div>
  );
}

// AboutUs component
function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg my-4">
        <h1 className="text-3xl font-bold mb-4">About Our Notes App</h1>
        <p className="text-gray-700 mb-4 text-justify">
          Our notes app is designed to help you organize your thoughts, ideas,
          tasks, and more. Whether you're a student, professional, or just
          someone who loves jotting down notes, our app provides a simple yet
          powerful platform to keep your notes organized and accessible from
          anywhere.
        </p>
        <KeyFeatures />
        <p className="text-gray-700 mb-4 text-justify">
          We are committed to continuously improving our app to meet the
          evolving needs of our users. Your feedback is invaluable to us, so
          please don't hesitate to reach out with any suggestions or questions.
        </p>
        <Testimonials />
        <p className="text-gray-700 mb-4 text-justify">
          Thank you for choosing our notes app to accompany you on your journey
          of productivity and creativity!
        </p>
        <p className="text-gray-700 mb-4">- The Notefy Team</p>
      </div>
    </div>
  );
}

export default AboutUs;
