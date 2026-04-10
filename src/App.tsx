import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import BeforeAfter from './components/BeforeAfter';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

export default function App() {
  return (
    <div id="main-scroll-container" className="h-screen overflow-y-auto snap-y snap-mandatory bg-white selection:bg-primary-500 selection:text-white scroll-smooth">
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <BeforeAfter />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
