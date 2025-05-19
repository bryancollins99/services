import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function ModerationQueue() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading testimonials
    setTimeout(() => {
      setTestimonials([
        {
          id: 1,
          name: 'John Doe',
          role: 'Software Engineer',
          content: 'Great product! Really helped me improve my workflow.',
          created_at: new Date().toISOString(),
          status: 'pending',
          photo_url: null
        },
        {
          id: 2,
          name: 'Jane Smith',
          role: 'Product Manager',
          content: 'Excellent service and support team.',
          created_at: new Date().toISOString(),
          status: 'approved',
          photo_url: null
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleModeration = async (id, status) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, status } : t))
    );
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Testimonial Moderation</h1>
      
      <div className="space-y-6">
        {testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            className="border rounded-lg p-6 bg-white shadow-sm"
          >
            <div className="flex items-start gap-4">
              {testimonial.photo_url && (
                <img
                  src={testimonial.photo_url}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(testimonial.created_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {testimonial.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleModeration(testimonial.id, 'approved')}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleModeration(testimonial.id, 'rejected')}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {testimonial.status === 'approved' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                        Approved
                      </span>
                    )}
                    {testimonial.status === 'rejected' && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{testimonial.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 