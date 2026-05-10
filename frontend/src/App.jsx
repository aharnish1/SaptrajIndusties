import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import About from './pages/About';
import Infrastructure from './pages/Infrastructure';
import Quality from './pages/Quality';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Gallery from './pages/Gallery';
import Projects from './pages/Projects';
import Careers from './pages/Careers';
import Certifications from './pages/Certifications';
import Industries from './pages/Industries';
import IndustryDetail from './components/IndustryDetail';
import ServiceDetail from './components/ServiceDetail';
import Manufacturing from './pages/Manufacturing';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-deep-black text-metallic-silver font-sans">
        <Navbar />
        
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/quality-assurance" element={<Quality />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:industryId" element={<IndustryDetail />} />
            <Route path="/manufacturing-process" element={<Manufacturing />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
