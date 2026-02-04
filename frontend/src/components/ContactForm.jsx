import React, { useState } from 'react';
import Button from './ui/Button';
import InputField from './ui/InputField';
import { messageAPI } from '../utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categoryOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'event', label: 'Event Related' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.senderName.trim()) newErrors.senderName = 'Name is required';
    if (!formData.senderEmail.trim()) newErrors.senderEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.senderEmail)) newErrors.senderEmail = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await messageAPI.create(formData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          senderName: '',
          senderEmail: '',
          subject: '',
          message: '',
          category: 'general',
          priority: 'medium'
        });
      } else {
        console.error('Message failed:', result.error);
        setSubmitStatus('error');
      }
      
    } catch (error) {
      console.error('Message error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Contact Us</h2>
        <p className="text-gray-400">
          Have a question or want to get in touch? Send us a message!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#1a1a1f] rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Your Name"
              placeholder="Enter your full name"
              value={formData.senderName}
              onChange={(e) => handleInputChange('senderName', e.target.value)}
              error={errors.senderName ? { message: errors.senderName } : null}
            />
            <InputField
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.senderEmail}
              onChange={(e) => handleInputChange('senderEmail', e.target.value)}
              error={errors.senderEmail ? { message: errors.senderEmail } : null}
            />
          </div>
        </div>

        <div className="bg-[#1a1a1f] rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">Message Details</h3>
          <div className="space-y-4">
            <InputField
              label="Subject"
              placeholder="What is this about?"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              error={errors.subject ? { message: errors.subject } : null}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="py-2 px-2 w-full bg-transparent border-b-2 border-gray-400 text-white focus:outline-none focus:border-[#60a5fa] transition-all duration-300 rounded-xl"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="py-2 px-2 w-full bg-transparent border-b-2 border-gray-400 text-white focus:outline-none focus:border-[#60a5fa] transition-all duration-300 rounded-xl"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                placeholder="Tell us what's on your mind..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                className={`py-2 px-2 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-200 focus:outline-none focus:border-[#60a5fa] transition-all duration-300 rounded-xl resize-none ${
                  errors.message ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-400 mt-1">{errors.message}</p>
              )}
            </div>
          </div>
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-900/50 border border-green-500 rounded-lg p-4">
            <p className="text-green-400 font-medium">
              ✅ Message sent successfully! We'll get back to you soon.
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
            <p className="text-red-400 font-medium">
              ❌ Failed to send message. Please try again.
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="px-8 py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              'Send Message 📧'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;