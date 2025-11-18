'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    setStatus('success');
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="glass rounded-lg p-8 space-y-6"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-neon-cyan font-orbitron mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-cyber-dark border-2 border-neon-cyan/30 rounded px-4 py-3 text-neon-cyan focus:border-neon-pink focus:outline-none transition-colors"
          placeholder="Enter your name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-neon-cyan font-orbitron mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-cyber-dark border-2 border-neon-cyan/30 rounded px-4 py-3 text-neon-cyan focus:border-neon-pink focus:outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-neon-cyan font-orbitron mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-cyber-dark border-2 border-neon-cyan/30 rounded px-4 py-3 text-neon-cyan focus:border-neon-pink focus:outline-none transition-colors resize-none"
          placeholder="Your message here..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="neon-button w-full"
        disabled={status === 'success'}
      >
        {status === 'success' ? 'Message Sent!' : 'Send Message'}
      </button>

      {/* Success Message */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-neon-cyan p-4 bg-neon-cyan/10 rounded border border-neon-cyan"
        >
          ✓ Message transmitted successfully!
        </motion.div>
      )}
    </motion.form>
  );
}
