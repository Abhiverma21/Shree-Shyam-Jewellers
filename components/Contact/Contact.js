"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
       const {name, email, subject, message} = formData;
    const phone = "919812992001";
     const text = `New enquiry from Jewellery Website:%0A%0AName: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
  const whatsappUrl = `https://wa.me/${phone}?text=${text}`;
  window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
 
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 md:px-6 py-12 md:py-16">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch ✨
        </motion.h1>
        <motion.p
          className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We’d love to hear from you! Whether it’s a question, feedback, or a
          custom request, fill out the form below or find us at our store.
        </motion.p>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.form
          className="bg-white shadow-lg rounded-2xl p-6 md:p-10 flex flex-col gap-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 transition resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Send Message
          </button>

          {submitted && (
            <motion.p
              className="text-green-600 font-medium mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your message has been sent successfully!
            </motion.p>
          )}
        </motion.form>

        {/* Contact Info + Map */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact Info */}
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Office
            </h2>
            <p className="text-gray-600">📍 Shop No. 53, Shree Shyam Jewellers,Sector 3,Kurukshetra</p>
            <p className="text-gray-600">📞 +91 98765 43210</p>
            <p className="text-gray-600">✉️ contact@shyamjewellers.com</p>
            <p className="text-gray-600">⏰ Mon - Sat: 10:00 AM - 7:00 PM</p>
          </div>

          {/* Map Embed */}
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6913.304512434896!2d76.89177999495118!3d29.96067957434251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1761400016581!5m2!1sen!2sin" 
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6913.304512434896!2d76.89177999495118!3d29.96067957434251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1761400016581!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>