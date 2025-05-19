import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    testimonial: '',
    photo: null
  });
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setFormData(prev => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        role: '',
        testimonial: '',
        photo: null
      });
      setPreview(null);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Share Your Experience</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Role/Title</label>
          <input
            type="text"
            value={formData.role}
            onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Your Testimonial</label>
          <textarea
            required
            value={formData.testimonial}
            onChange={e => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
            className="w-full p-2 border rounded h-32"
            placeholder="Share your experience..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Photo (Optional)</label>
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded p-6 text-center cursor-pointer hover:border-blue-500"
          >
            <input {...getInputProps()} />
            {preview ? (
              <img src={preview} alt="Preview" className="mx-auto max-h-48" />
            ) : (
              <p>Drag & drop a photo here, or click to select one</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Testimonial'}
        </button>

        {status === 'success' && (
          <p className="text-green-600">Thank you for your submission!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
} 