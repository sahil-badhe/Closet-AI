import {
  ChevronDown,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  Shield,
  FileText,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LegalSupportPage() {
  const faqs = [
    {
      question: "How does the AI select clothing recommendations?",
      answer:
        "Our AI analyzes your preferences (age, gender, season, style, skin tone) along with current trends and your past selections to create personalized recommendations. It uses machine learning to improve suggestions over time.",
    },
    {
      question: "Can I adjust my style preferences after signing up?",
      answer:
        "Yes, you can update your style profile anytime in your account settings. The AI will immediately incorporate your new preferences into future recommendations.",
    },
    {
      question: "How often are the clothing recommendations updated?",
      answer:
        "Recommendations refresh daily based on new inventory from our partners and seasonal trends. You can also manually request new suggestions anytime.",
    },
    {
      question: "Do you offer plus-size or petite options?",
      answer:
        "Absolutely! Our AI considers body type in its recommendations. You can specify your size preferences during setup or in your profile settings.",
    },
    {
      question: "How do the purchase links work?",
      answer:
        "We partner with major retailers. When you click a buy link, you'll go directly to their product page. We may earn a small commission at no extra cost to you.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-28 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center mb-4 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm"
              >
                <HelpCircle className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-indigo-600 font-medium">
                  Support Center
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl py-3 font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                We're Here to Help
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Find answers to common questions or contact our support team for
                personalized assistance.
              </motion.p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about Closet AI's personalized
                styling service
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-lg text-gray-900">
                          {faq.question}
                        </span>
                        <ChevronDown className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <p className="mt-4 text-gray-600">{faq.answer}</p>
                    </details>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Contact Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have a specific question? Reach out through any of these
                channels
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Email Us
                </h3>
                <p className="text-gray-600 mb-4">
                  For general inquiries and support
                </p>
                <a
                  href="mailto:support@closetai.com"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  support@closetai.com
                </a>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Call Us
                </h3>
                <p className="text-gray-600 mb-4">For immediate assistance</p>
                <a
                  href="tel:+18005551234"
                  className="text-purple-600 font-medium hover:underline"
                >
                  +1 (800) 555-1234
                </a>
              </motion.div>

              {/* Chat */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Live Chat
                </h3>
                <p className="text-gray-600 mb-4">Available 9am-9pm EST</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  Start Chat
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Legal Sections */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Legal Information
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Important documents regarding your use of Closet AI
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Privacy Policy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Privacy Policy
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last updated: June 15, 2023
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Learn how we collect, use, and protect your personal data when
                  you use our AI styling service.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-3 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  View Privacy Policy
                </motion.button>
              </motion.div>

              {/* Terms of Service */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Terms of Service
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last updated: June 15, 2023
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  The legal agreement between you and Closet AI regarding use of
                  our platform and services.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-3 bg-purple-50 text-purple-600 font-medium rounded-lg hover:bg-purple-100 transition-colors"
                >
                  View Terms of Service
                </motion.button>
              </motion.div>

              {/* Refund Policy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mr-4">
                    <ShoppingBag className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Refund Policy
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last updated: June 15, 2023
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Information about returns and refunds for purchases made
                  through our platform.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-3 bg-pink-50 text-pink-600 font-medium rounded-lg hover:bg-pink-100 transition-colors"
                >
                  View Refund Policy
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Ready to Discover Your Perfect Style?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Take our style quiz and get personalized recommendations in
                minutes
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all inline-flex items-center"
              >
                Start Your Style Profile
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
