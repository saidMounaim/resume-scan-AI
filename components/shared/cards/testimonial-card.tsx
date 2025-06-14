import React from "react";

interface TestimonialCardProps {
  content: string;
  avatar: string;
  name: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  content,
  avatar,
  name,
  role,
}) => (
  <div className="border-0 shadow-sm bg-white rounded-lg p-6 h-full flex flex-col">
    <p className="text-gray-600 mb-6 italic flex-1">{content}</p>
    <div className="flex items-center mt-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
