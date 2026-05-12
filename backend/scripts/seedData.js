const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Project = require('../models/Project');
const Inquiry = require('../models/Inquiry');
const Contact = require('../models/Contact');

// Load environment variables
dotenv.config();

// Sample data
const sampleProducts = [
  {
    name: 'Precision Laser Cut Components',
    category: 'Laser Cutting',
    description: 'High-precision laser cut components for automotive and industrial applications with tight tolerances.',
    specifications: {
      material: 'Mild Steel, Stainless Steel, Aluminum',
      thickness: '0.5mm - 25mm',
      tolerance: '±0.1mm',
      capacity: '300 MT/month'
    },
    images: ['product1-1.jpg', 'product1-2.jpg'],
    status: 'Active'
  },
  {
    name: 'CNC Bent Sheet Metal Parts',
    category: 'CNC Bending',
    description: 'Precision CNC bent sheet metal components for various industrial applications.',
    specifications: {
      material: 'Mild Steel, Stainless Steel, Aluminum',
      thickness: '0.5mm - 6mm',
      bendingLength: 'Up to 3000mm',
      capacity: '200 MT/month'
    },
    images: ['product2-1.jpg', 'product2-2.jpg'],
    status: 'Active'
  },
  {
    name: 'Industrial Structural Fabrication',
    category: 'Structural Fabrication',
    description: 'Heavy-duty structural fabrication for industrial buildings and infrastructure projects.',
    specifications: {
      material: 'Structural Steel, MS Plates',
      capacity: '500 MT/month',
      welding: 'MIG, Arc, TIG',
      standards: 'IS 2062, IS 800'
    },
    images: ['product3-1.jpg', 'product3-2.jpg'],
    status: 'Active'
  },
  {
    name: 'Custom Sheet Metal Assemblies',
    category: 'Sheet Metal Assembly',
    description: 'Complete sheet metal assemblies with welding, fastening, and finishing.',
    specifications: {
      material: 'Various Metals',
      assemblySize: 'Up to 10 tons',
      processes: 'Cutting, Bending, Welding, Assembly',
      finish: 'Powder Coating, Galvanizing'
    },
    images: ['product4-1.jpg', 'product4-2.jpg'],
    status: 'Active'
  },
  {
    name: 'Electric Panel Fabrication',
    category: 'Electric Panel',
    description: 'Custom electrical panels and enclosures for industrial and commercial applications.',
    specifications: {
      material: 'CRCA, Stainless Steel, Aluminum',
      thickness: '1mm - 3mm',
      standards: 'IP 55, IP 65',
      finish: 'Powder Coating, SS Finish'
    },
    images: ['product5-1.jpg', 'product5-2.jpg'],
    status: 'Active'
  }
];

const sampleProjects = [
  {
    title: 'Automotive Component Manufacturing',
    client: 'Leading Automotive OEM',
    industry: 'automotive',
    description: 'Precision laser cutting and fabrication of automotive chassis components with tight tolerances.',
    technologies: ['CNC Laser Cutting', 'MIG Welding', 'Quality Inspection'],
    duration: '3 months',
    value: '₹2.5 Crore',
    images: ['project1-1.jpg', 'project1-2.jpg', 'project1-3.jpg'],
    status: 'completed',
    date: new Date('2026-03-15')
  },
  {
    title: 'Textile Machinery Structure',
    client: 'TexCorp Industries',
    industry: 'textile',
    description: 'Complete structural fabrication for textile manufacturing plant with custom components.',
    technologies: ['Sheet Metal Fabrication', 'CNC Bending', 'Assembly'],
    duration: '4 months',
    value: '₹1.8 Crore',
    images: ['project2-1.jpg', 'project2-2.jpg'],
    status: 'completed',
    date: new Date('2026-02-20')
  },
  {
    title: 'Power Plant Support Structures',
    client: 'Energy Solutions Ltd',
    industry: 'power',
    description: 'Heavy-duty structural components for power generation facility with corrosion-resistant coating.',
    technologies: ['Structural Fabrication', 'Arc Welding', 'Surface Treatment'],
    duration: '6 months',
    value: '₹4.2 Crore',
    images: ['project3-1.jpg', 'project3-2.jpg'],
    status: 'in-progress',
    date: new Date('2026-01-10')
  },
  {
    title: 'Railway Platform Components',
    client: 'National Railways',
    industry: 'railways',
    description: 'Precision fabrication of railway platform safety components and structural elements.',
    technologies: ['CNC Cutting', 'Precision Welding', 'Quality Control'],
    duration: '2 months',
    value: '₹1.2 Crore',
    images: ['project4-1.jpg', 'project4-2.jpg'],
    status: 'completed',
    date: new Date('2025-12-15')
  },
  {
    title: 'Agricultural Equipment Frames',
    client: 'AgriTech Solutions',
    industry: 'agriculture',
    description: 'Robust agricultural equipment frames with weather-resistant coating and precision assembly.',
    technologies: ['Heavy Fabrication', 'MIG Welding', 'Assembly'],
    duration: '3 months',
    value: '₹95 Lakh',
    images: ['project5-1.jpg', 'project5-2.jpg'],
    status: 'completed',
    date: new Date('2025-11-20')
  }
];

const sampleInquiries = [
  {
    name: 'Rajesh Kumar',
    company: 'Tech Manufacturing Ltd',
    email: 'rajesh@techmanufacturing.com',
    phone: '+91 98765 43210',
    requirement: 'Need 1000 precision laser cut components for automotive application',
    materialType: 'Stainless Steel 304',
    quantity: '1000 pieces',
    message: 'We require high-precision laser cut components for our automotive assembly line. Please provide quote.',
    status: 'New',
    date: new Date('2026-05-08')
  },
  {
    name: 'Priya Sharma',
    company: 'Infrastructure Builders',
    email: 'priya@infrastructure.com',
    phone: '+91 87654 32109',
    requirement: 'Structural steel fabrication for warehouse project',
    materialType: 'Structural Steel',
    quantity: '50 tons',
    message: 'Looking for reliable fabrication partner for our new warehouse construction project.',
    status: 'In Progress',
    date: new Date('2026-05-07')
  },
  {
    name: 'Amit Patel',
    company: 'Electrical Systems Inc',
    email: 'amit@electricalsystems.com',
    phone: '+91 76543 21098',
    requirement: 'Custom electrical panel enclosures',
    materialType: 'CRCA Steel',
    quantity: '200 panels',
    message: 'Need custom electrical panel enclosures with IP65 rating. Please send technical specifications.',
    status: 'Completed',
    date: new Date('2026-05-06')
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing data
    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await Project.deleteMany({});
    await Inquiry.deleteMany({});
    await Contact.deleteMany({});
    console.log('Existing data cleared!');

    // Insert sample data
    console.log('Inserting sample products...');
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} products inserted!`);

    console.log('Inserting sample projects...');
    await Project.insertMany(sampleProjects);
    console.log(`${sampleProjects.length} projects inserted!`);

    console.log('Inserting sample inquiries...');
    await Inquiry.insertMany(sampleInquiries);
    console.log(`${sampleInquiries.length} inquiries inserted!`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seed function
seedDatabase();
