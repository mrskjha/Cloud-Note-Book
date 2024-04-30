import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 h-screen bg-gray-500 font-serif text-white ">
        <h1 className="text-3xl font-bold mb-4 flex align-middle justify-center">About Us</h1>
      <div className="ml-10 mt-20">
        <p className="text-xl mb-4">Welcome to our note-taking application!</p>
        <p className="text-xl mb-4">
          This application allows you to create, edit, and delete notes, helping
          you stay organized and productive.
        </p>
        <p className="text-xl mb-4">
          With our user-friendly interface, you can easily manage your notes and
          access them from any device.
        </p>
        <p className="text-xl mb-4">
          Whether you're a student, professional, or anyone in need of a digital
          notebook, our app is designed to meet your needs.
        </p>
        <p className="text-xl mb-4">
          Thank you for choosing our application. We hope you find it useful and
          enjoy using it!
        </p>
      </div>
    </div>
  );
};

export default About;
