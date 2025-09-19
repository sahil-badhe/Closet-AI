import { Sparkles, Zap, Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import male_alex from "../assets/man-1.jpg";
import male_morgan from "../assets/man-2.jpg";
import female_Jamie from "../assets/female-1.jpg";
import female_taylor from "../assets/female-2.jpg";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Jamie Smith",
      role: "Founder & CEO",
      image: female_Jamie,
      bio: "Fashion tech entrepreneur with 10+ years in AI development",
    },
    {
      name: "Alex Wong",
      role: "Lead AI Engineer",
      image: male_alex,
      bio: "Machine learning specialist focused on personalization algorithms",
    },
    {
      name: "Taylor Reed",
      role: "Fashion Director",
      image: female_taylor,
      bio: "Former stylist bringing industry expertise to our recommendations",
    },
    {
      name: "Morgan Chen",
      role: "UX Designer",
      image: male_morgan,
      bio: "Creates seamless experiences between fashion and technology",
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
                <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-indigo-600 font-medium">Our Story</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl py-3 font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                Revolutionizing Fashion with AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                We're transforming how people discover and develop their
                personal style through artificial intelligence.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Our Origin Story
                </h2>
                <p className="text-gray-600 mb-4">
                  Closet AI was founded in 2022 when our CEO, Jamie Smith,
                  noticed a recurring problem: despite the abundance of fashion
                  content online, people still struggled to find styles that
                  truly resonated with them.
                </p>
                <p className="text-gray-600 mb-4">
                  Combining her passion for fashion with her background in
                  artificial intelligence, Jamie assembled a team of experts to
                  create a solution that would democratize personal styling.
                </p>
                <p className="text-gray-600">
                  Today, our platform serves thousands of users worldwide,
                  helping them discover their unique style identity with the
                  power of machine learning and fashion expertise.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-100"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Closet AI team working"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                These principles guide everything we do at Closet AI
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Personalization
                </h3>
                <p className="text-gray-600">
                  We believe style is deeply personal. Our AI crafts
                  recommendations tailored to your unique body type, lifestyle,
                  and aesthetic preferences.
                </p>
              </motion.div>

              {/* Value 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We continuously refine our algorithms to deliver the most
                  accurate, up-to-date fashion recommendations powered by the
                  latest AI advancements.
                </p>
              </motion.div>

              {/* Value 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Inclusivity
                </h3>
                <p className="text-gray-600">
                  Fashion should be accessible to all. We serve diverse body
                  types, ages, genders, and cultural backgrounds with equal care
                  and attention.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">
                Meet The Team
              </h2>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                The passionate individuals behind Closet AI's vision
              </p>
          </div>
          <div className="flex justify-center items-center px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >

            </motion.div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="relative h-64">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-indigo-600 font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-500 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                Ready to Discover Your Style?
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
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
