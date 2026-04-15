import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';
import SEO from '../components/SEO';

const Home: NextPage = () => {
  return (
    <Layout>
      <SEO
        title="My Professional Portfolio"
        description="Showcasing my projects, skills, and experience as a full-stack developer."
        keywords="portfolio, web development, full-stack, Next.js, React, Node.js"
      />
      <main className="flex flex-col items-center justify-center">
        <section id="home" className="min-h-screen w-full flex items-center justify-center">
          <Hero />
        </section>
        <section id="about" className="min-h-screen w-full flex items-center justify-center py-16">
          <About />
        </section>
        <section id="skills" className="min-h-screen w-full flex items-center justify-center py-16 bg-gray-50 dark:bg-gray-800">
          <Skills />
        </section>
        <section id="projects" className="min-h-screen w-full flex items-center justify-center py-16">
          <Projects />
        </section>
        <section id="experience" className="min-h-screen w-full flex items-center justify-center py-16 bg-gray-50 dark:bg-gray-800">
          <Experience />
        </section>
        <section id="contact" className="min-h-screen w-full flex items-center justify-center py-16">
          <Contact />
        </section>
      </main>
    </Layout>
  );
};

export default Home;
