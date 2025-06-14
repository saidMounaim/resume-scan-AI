import React from "react";
import TestimonialCard from "../cards/testimonial-card";
import { testimonials } from "@/constants";

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Job Seekers Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            See what our users have to say about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              avatar={testimonial.avatar}
              content={testimonial.content}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
