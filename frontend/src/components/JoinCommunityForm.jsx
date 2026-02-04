import React, { useState } from 'react';
import Button from './ui/Button';
import InputField from './ui/InputField';
import { memberAPI } from '../utils/api';

const FormSelect = ({ label, options, value, onChange, error, required = false, placeholder = 'Select an option' }) => (
  <div className="space-y-2">
    <label className="block text-white font-bold">
      {label} {required && <span className="text-cyan-400">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-md bg-transparent border border-cyan-500 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 ${
        error ? "border-red-500 focus:ring-red-500" : ""
      }`}
    >
      <option value="" disabled className="bg-slate-900">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-slate-900">
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
  </div>
);

const initialFormData = {
  fullName: '', email: '', phone: '', university: '', year: '', 
  interests: '', motivation: '', experience: '', github: '', linkedin: '', newsletter: false
};

const yearOptions = [
  { value: '1st', label: '1st Year' },
  { value: '2nd', label: '2nd Year' },
  { value: '3rd', label: '3rd Year' },
  { value: '4th', label: '4th Year' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'other', label: 'Other' }
];

const experienceOptions = [
  { value: 'beginner', label: 'Beginner (0-1 years)' },
  { value: 'intermediate', label: 'Intermediate (1-3 years)' },
  { value: 'advanced', label: 'Advanced (3+ years)' },
  { value: 'professional', label: 'Professional (5+ years)' }
];

const JoinCommunityForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      fullName: 'Full name is required',
      email: 'Email is required',
      phone: 'Phone number is required',
      university: 'University name is required',
      year: 'Please select your year',
      interests: 'Tech interests required',
      motivation: 'Motivation required',
      experience: 'Experience level required'
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!formData[field]?.trim?.() && !formData[field]) {
        newErrors[field] = message;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await memberAPI.register(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData(initialFormData);
      } else {
        console.error('Registration failed:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          Join{" "}
          <span className="bg-gradient-to-r from-[#60a5fa] to-[#818cf8] bg-clip-text text-transparent">
            Nova Coders
          </span>
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Become part of Nova Coders and connect with fellow tech enthusiasts. Let's build something amazing together!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-gray-700/15 shadow-gray-900 shadow-5xl rounded-xl p-6 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.002] transition-all duration-300 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName ? { message: errors.fullName } : null}
            />
            <InputField
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email ? { message: errors.email } : null}
            />
            <InputField
              label="Phone Number"
              type="tel"
              placeholder="+91 00000000"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone ? { message: errors.phone } : null}
            />
            <InputField
              label="University/College"
              placeholder="Your university or college name"
              value={formData.university}
              onChange={(e) => handleInputChange('university', e.target.value)}
              error={errors.university ? { message: errors.university } : null}
            />
          </div>
        </div>

        {/* Academic & Experience Section */}
        <div className="bg-gray-700/15 shadow-gray-900 shadow-5xl rounded-xl p-6 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.002] transition-all duration-300 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Academic & Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Current Year"
              options={yearOptions}
              value={formData.year}
              onChange={(value) => handleInputChange('year', value)}
              error={errors.year}
              required
              placeholder="Select your current year"
            />
            <FormSelect
              label="Experience Level"
              options={experienceOptions}
              value={formData.experience}
              onChange={(value) => handleInputChange('experience', value)}
              error={errors.experience}
              required
              placeholder="Select your experience level"
            />
          </div>
        </div>

        {/* Tech Interests & Motivation Section */}
        <div className="bg-gray-700/15 shadow-gray-900 shadow-5xl rounded-xl p-6 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.002] transition-all duration-300 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Tech Interests & Motivation</h3>
          <div className="space-y-4">
            <InputField
              label="Tech Interests"
              placeholder="e.g., Web Development, AI/ML, Mobile Apps, Data Science..."
              value={formData.interests}
              onChange={(e) => handleInputChange('interests', e.target.value)}
              error={errors.interests ? { message: errors.interests } : null}
            />
            <div className="space-y-2">
              <label className="block text-white font-bold">
                Why do you want to join Nova Coders? <span className="text-cyan-400">*</span>
              </label>
              <textarea
                placeholder="Tell us about your motivation and what you hope to achieve..."
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                rows={4}
                className={`w-full rounded-md bg-transparent border border-cyan-500 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 resize-none ${
                  errors.motivation ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.motivation && (
                <p className="text-sm text-red-400 mt-1">{errors.motivation}</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Links & Newsletter Section */}
        <div className="bg-gray-700/15 shadow-gray-900 shadow-5xl rounded-xl p-6 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.002] transition-all duration-300 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Social Links & Newsletter</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="GitHub Profile"
                placeholder="https://github.com/yourusername"
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
              />
              <InputField
                label="LinkedIn Profile"
                placeholder="https://linkedin.com/in/yourusername"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
              />
            </div>
            <div className="flex items-start space-x-3 pt-2 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                className="mt-1 h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-cyan-500 bg-transparent rounded cursor-pointer"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-300 cursor-pointer">
                <span className="text-cyan-400 font-semibold">Stay Updated:</span> I would like to receive updates about Nova Coders events, workshops, and opportunities via email.
              </label>
            </div>
          </div>
        </div>


        {/* Submit Status Messages */}
        {submitStatus && (
          <div className={`rounded-lg p-4 text-center shadow-lg ${
            submitStatus === 'success' 
              ? 'bg-green-500/20 border border-green-500' 
              : 'bg-red-500/20 border border-red-500'
          }`}>
            <p className={`font-semibold text-lg ${
              submitStatus === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {submitStatus === 'success' 
                ? '🎉 Welcome to Nova Coders! Your application has been submitted successfully.'
                : '❌ Something went wrong. Please try again later.'
              }
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="px-12 py-4 text-lg justify-center w-full md:w-auto"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                Join the Community
                <span className="text-2xl ml-2">&#8594;</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JoinCommunityForm;
