import React from "react";
import staticData from "../staticData";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-800">
      {/* Mission Section */}
      <section className="bg-base-100 p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-4">
          Our Mission
        </h1>
        <p className="text-lg text-center text-base-content">
          At Grow Nature, our mission is to provide a comprehensive platform for
          all your gardening needs. We offer a variety of plants, fertilizers,
          and gardening accessories to help you create and maintain a thriving
          garden. In addition, we connect users with professional caretakers who
          can assist with gardening tasks, allowing users to book appointments
          and provide feedback on their services. Our goal is to foster a
          community of gardening enthusiasts who can share their passion for
          nature and sustainability.
        </p>
      </section>

      {/* Offerings Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-4">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {staticData.offerings.map((offering, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-lg shadow-lg flex flex-col items-center text-center text-base-content"
            >
              <img
                src={offering.src}
                alt={offering.title}
                className="w-64 mb-4 aspect-square object-cover rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">{offering.title}</h3>
              <p className="text-gray-600">{offering.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-x-6">
          {staticData.team.map((member, index) => (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-lg shadow-lg max-w-xs mb-6 text-base-content"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-64 aspect-square object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-center mb-2">
                {member.name}
              </h3>
              <p className="text-center text-gray-600 mb-2">{member.role}</p>
              <p className="text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
