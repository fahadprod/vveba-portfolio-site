'use client'

import { useState, useEffect } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const url = 'https://script.google.com/macros/s/AKfycbxJuTnczwQAS10VyjiObzQYtDhZiUg58QUXP6mxFpv8kwjtKoZYwCPoTSxFdz5_TMc/exec';

  // Auto-dismiss messages after 3 seconds
  useEffect(() => {
    let timer;
    if (errors.length > 0 || submitSuccess) {
      timer = setTimeout(() => {
        setErrors([]);
        setSubmitSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [errors, submitSuccess]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = [];
    
    if (formData.user.length < 5) {
      newErrors.push('Name needs to be 5 or more characters');
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }
    
    if (formData.subject.trim() === '') {
      newErrors.push('Subject is required');
    }
    
    if (formData.message.trim() === '') {
      newErrors.push('Message is required');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors([]);

    try {
      const formDataObj = new FormData();
      formDataObj.append('user', formData.user);
      formDataObj.append('email', formData.email);
      formDataObj.append('subject', formData.subject);
      formDataObj.append('message', formData.message);

      const response = await fetch(url, {
        method: 'POST',
        body: formDataObj,
        redirect: 'follow'
      });

      if (response.redirected) {
        const result = await fetch(response.url);
        const data = await result.text();
        console.log('Success:', data);
        
        setFormData({
          user: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitSuccess(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(['There was an error submitting the form. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <h1 className="section-bg-heading">Contact Me</h1>
      <h1 className="section-heading">Contact</h1>
      <h3 className="sub-heading">Let&apos;s <span>Have Some Talk</span></h3>
      <div className="section-border"></div>
      <div className="contact-content">
        <div className="contact-left">
          <div className="address">
            <i className="fa-solid fa-location-dot"></i>
            <div className="contact-info">
              <span>Address</span>
              <span>New York, USA</span>
            </div>
          </div>
          <div className="freelance">
            <i className="fa-regular fa-user"></i>
            <div className="contact-info">
              <span>Freelance</span>
              <span>Available Right Now</span>
            </div>
          </div>
          <div className="email">
            <i className="fa-regular fa-envelope"></i>
            <div className="contact-info">
              <span>Email</span>
              <span>johnsmith@webdev.com</span>
            </div>
          </div>
          <div className="phone">
            <i className="fa-solid fa-phone"></i>
            <div className="contact-info">
              <span>Phone</span>
              <span>+123 456 7890</span>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <form id="signup" onSubmit={handleSubmit}>
           
            
            <div className="input-groups">
              <div className="input-group">
                <label htmlFor="user">
                  Your full name <i className="fa-solid fa-asterisk"></i>
                </label>
                <input 
                  type="text" 
                  id="user" 
                  name="user"
                  value={formData.user}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">
                  Your email address <i className="fa-solid fa-asterisk"></i>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="subject">
                Your subject <i className="fa-solid fa-asterisk"></i>
              </label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="message">
                Your message <i className="fa-solid fa-asterisk"></i>
              </label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="contact-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

             {errors.length > 0 && (
            <div className="output" style={{ 
              display: 'block', 
              color: 'red', 
              marginBottom: '1rem', 
              fontSize: '14px',
              animation: 'fadeOut 3s forwards' // Added fade-out animation
            }}>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          
          {submitSuccess && (
            <div className="output" style={{ 
              display: 'block', 
              color: 'green', 
              marginBottom: '1rem', 
              fontSize: '14px',
              animation: 'fadeOut 3s forwards' // Added fade-out animation
            }}>
              Message sent successfully!
            </div>
          )}
          </form>
        </div>
      </div>
    </section>
  );
}