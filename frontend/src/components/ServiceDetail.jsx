import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  Clock,
  Users,
  Target,
  CheckCircle,
  Star,
  Download,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Zap,
  Settings,
  Wrench,
  Package,
  Cpu,
  Factory,
  Shield,
  Gauge,
  Cog,
  Hammer,
  Sparkles,
  Paintbrush,
  BrushCleaning
} from 'lucide-react';
import Button from './UI/Button';
import ServiceHero3D from './services/ServiceHero3D';
import laserCutting3 from '../assets/infrastructurePhotoes/laserCutting3.jpeg';
import CNCBending1 from '../assets/infrastructurePhotoes/CNCBending1.jpeg';
import Assembly1 from '../assets/infrastructurePhotoes/Assembly1.jpeg';
import CompleteWork1 from '../assets/infrastructurePhotoes/CompleteWork1.jpeg';
import Painting1 from '../assets/infrastructurePhotoes/Painting1.jpeg';
import Raw1 from '../assets/infrastructurePhotoes/Raw1.jpeg';
import Raw2 from '../assets/infrastructurePhotoes/Raw2.jpeg';
import SandBlasting1 from '../assets/infrastructurePhotoes/SandBlasting1.jpeg';
import Scrap1 from '../assets/infrastructurePhotoes/Scrap1.jpeg';
import Welding from '../assets/infrastructurePhotoes/Welding.png';

// Service data with comprehensive information
const serviceData = {
  'cnc-laser-cutting': {
    id: 'cnc-laser-cutting',
    title: 'CNC Laser Cutting',
    subtitle: 'Advanced Precision Cutting Technology',
    tagline: 'Precision Cutting Technology',
    description: 'Advanced CNC laser cutting services delivering unparalleled precision and speed for complex metal fabrication projects.',
    heroImage: laserCutting3,
    model: '/models/cnc-laser-machine.glb',
    features: [
      '±0.1mm precision accuracy',
      'High-speed cutting up to 35m/min',
      'Complex geometries support',
      'Clean, burr-free edges',
      'Automated material handling',
      'Real-time quality monitoring'
    ],
    overview: {
      technology: 'State-of-the-art Bodor Fiber Laser cutting systems with advanced CNC control',
      precision: '±0.1mm tolerance accuracy for intricate designs and tight specifications',
      materials: 'Expertise in cutting stainless steel, mild steel, aluminum, brass, and copper',
      quality : 'Smooth, burr-free edges with minimal heat distortion and strict dimensional inspection',
      capacity: 'Cutting capacity up to 25mm thickness with 12kW laser power',
      speed: 'High-speed cutting up to 35m/min for optimal productivity',
      automation: 'Fully automated material handling and nesting optimization'
    },
    capabilities: [
      {
        icon: Target,
        title: 'Precision Cutting',
        description: 'Ultra-precise cutting with ±0.1mm tolerance for complex geometries',
        features: ['±0.1mm accuracy', 'Complex geometries', 'Clean edges', 'No material distortion']
      },
      {
        icon: Zap,
        title: 'High-Speed Processing',
        description: 'Rapid cutting speeds with optimized nesting for maximum efficiency',
        features: ['35m/min speed', 'Automated nesting', 'Quick setup', 'Continuous operation']
      },
      {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'Rigorous quality control with inspection and certification',
        features: ['ISO standards', 'Quality inspection', 'Material testing', 'Documentation']
      },
      {
        icon: Cog,
        title: 'Advanced Technology',
        description: 'Latest fiber laser technology with intelligent control systems',
        features: ['12kW power', 'CNC control', 'Auto-focus', 'Real-time monitoring']
      }
    ],
    materials: [
      { name: 'Stainless Steel', thickness: '0.5mm - 25mm', applications: 'Food equipment, architectural panels' },
      { name: 'Mild Steel', thickness: '0.5mm - 25mm', applications: 'Structural components, machinery parts' },
      { name: 'Aluminum', thickness: '0.5mm - 15mm', applications: 'Aerospace, automotive, decorative' },
      { name: 'Brass & Copper', thickness: '0.5mm - 10mm', applications: 'Electrical components, decorative items' }
    ],
    industries: [
      { name: 'Automotive', applications: 'Body panels, chassis components, decorative trim' },
      { name: 'Aerospace', applications: 'Precision parts, structural components, brackets' },
      { name: 'Architecture', applications: 'Facade panels, decorative elements, structural components' },
      { name: 'Electronics', applications: 'Enclosures, heat sinks, precision components' }
    ],
    process: [
      {
        step: 1,
        title: 'Design & Programming',
        description: 'CAD design conversion to CNC programs with optimal nesting'
      },
      {
        step: 2,
        title: 'Material Preparation',
        description: 'Material selection, cleaning, and positioning on cutting bed'
      },
      {
        step: 3,
        title: 'Laser Cutting',
        description: 'Precision cutting with real-time monitoring and quality control'
      },
      {
        step: 4,
        title: 'Quality Inspection',
        description: 'Dimensional inspection and quality verification'
      },
      {
        step: 5,
        title: 'Finishing & Delivery',
        description: 'Deburring, finishing, and timely delivery'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'ISO 9001:2015 Certified',
        description: 'Internationally recognized quality management system'
      },
      {
        icon: Gauge,
        title: '±0.1mm Precision',
        description: 'Industry-leading accuracy for tight tolerance requirements'
      },
      {
        icon: Zap,
        title: '12kW Laser Power',
        description: 'High-power cutting for thick materials and fast processing'
      },
      {
        icon: Clock,
        title: '24/7 Operation',
        description: 'Continuous operation for urgent project requirements'
      }
    ],
    stats: [
      { value: '±0.1mm', label: 'Cutting Precision' },
      { value: '25mm', label: 'Max Thickness' },
      { value: '35m/min', label: 'Cutting Speed' },
      { value: '500+', label: 'Projects Completed' }
    ]
  },
  'cnc-bending': {
    id: 'cnc-bending',
    title: 'CNC Bending',
    subtitle: 'Precision Metal Forming Technology',
    tagline: 'Precision Metal Forming',
    description: 'Advanced CNC bending services ensuring perfect angles and tight tolerances for sheet metal fabrication.',
    heroImage: CNCBending1,
    model: '/models/cnc-bending-machine.glb',
    features: [
      '±0.5° angle accuracy',
      '200 ton bending capacity',
      '4m maximum length',
      'Complex bend sequences',
      'Automated angle compensation',
      'Multi-axis control'
    ],
    overview: {
      technology: 'Advanced CNC press brakes with precision control systems',
      precision: '±0.5mm angle accuracy for complex bending operations',
      materials: 'Expertise in bending stainless steel, mild steel, aluminum alloys',
      capacity: 'Bending capacity up to 4m length with 200 tons pressure',
      tooling: 'Extensive tooling library for various bend radii and profiles',
      automation: 'CNC programming with automatic angle compensation',
      quality: ' Accurate bend consistency with comprehensive dimensional and angle verification '
    },
    capabilities: [
      {
        icon: Target,
        title: 'Angle Precision',
        description: 'Precise angle control with ±0.5 degree accuracy',
        features: ['±0.5° accuracy', 'Complex bends', 'Multi-axis control', 'Repeatable results']
      },
      {
        icon: Hammer,
        title: 'Heavy Capacity',
        description: 'High-capacity bending for thick materials and large parts',
        features: ['200 ton capacity', '4m length', 'Thick materials', 'Large parts']
      },
      {
        icon: Cog,
        title: 'Advanced Tooling',
        description: 'Comprehensive tooling library for various applications',
        features: ['Extensive tooling', 'Custom tools', 'Quick changeover', 'Versatile profiles']
      },
      {
        icon: Shield,
        title: 'Quality Control',
        description: 'Rigorous quality inspection and process validation',
        features: ['Angle verification', 'Quality checks', 'Process control', 'Documentation']
      }
    ],
    materials: [
      { name: 'Stainless Steel', thickness: '0.5mm - 6mm', applications: 'Enclosures, brackets, decorative' },
      { name: 'Mild Steel', thickness: '0.5mm - 8mm', applications: 'Structural components, machinery' },
      { name: 'Aluminum', thickness: '0.5mm - 6mm', applications: 'Aerospace, automotive components' },
      { name: 'Galvanized Steel', thickness: '0.5mm - 4mm', applications: 'Outdoor structures, enclosures' }
    ],
    industries: [
      { name: 'Automotive', applications: 'Brackets, reinforcements, structural components' },
      { name: 'Construction', applications: 'Structural components, framing systems' },
      { name: 'Manufacturing', applications: 'Machine enclosures, safety guards' },
      { name: 'Electronics', applications: 'Cabinet frames, mounting brackets' }
    ],
    process: [
      {
        step: 1,
        title: 'Design & Programming',
        description: 'Bend sequence planning and CNC programming'
      },
      {
        step: 2,
        title: 'Tool Selection',
        description: 'Optimal tool selection based on material and geometry'
      },
      {
        step: 3,
        title: 'Setup & Calibration',
        description: 'Machine setup and angle calibration'
      },
      {
        step: 4,
        title: 'Precision Bending',
        description: 'CNC-controlled bending with real-time monitoring'
      },
      {
        step: 5,
        title: 'Quality Inspection',
        description: 'Angle verification and final quality checks'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'ISO 9001:2015 Certified',
        description: 'Internationally recognized quality management system'
      },
      {
        icon: Gauge,
        title: '±0.5° Accuracy',
        description: 'Precision angle control for tight tolerances'
      },
      {
        icon: Hammer,
        title: '200 Ton Capacity',
        description: 'High-capacity bending for heavy-duty applications'
      },
      {
        icon: Cog,
        title: 'Advanced CNC',
        description: 'State-of-the-art CNC control systems'
      }
    ],
    stats: [
      { value: '±0.5°', label: 'Angle Accuracy' },
      { value: '200 tons', label: 'Bending Capacity' },
      { value: '4m', label: 'Max Length' },
      { value: '300+', label: 'Projects Completed' }
    ]
  },
  'mig-arc-welding': {
    id: 'mig-arc-welding',
    title: 'MIG & Arc Welding',
    subtitle: 'Professional Welding Technology',
    tagline: 'Professional Welding Solutions',
    description: 'Expert MIG and arc welding services by certified professionals for high-strength industrial assemblies.',
    heroImage: Welding,
    model: '/models/welding-machine.glb',
    features: [
      'AWS D1.1 certified',
      '50mm material thickness',
      '100% quality pass rate',
      'High-strength joints',
      'Non-destructive testing',
      'Certified welders'
    ],
    overview: {
      technology: 'Advanced MIG and arc welding equipment with certified welders',
      quality: 'AWS D1.1 certified welding procedures and qualified personnel',
      precision : 'High-strength welds with consistent penetration and dimensional accuracy ',
      automation : 'Semi-automatic MIG welding systems for efficient and repeatable production',
      materials: 'Expertise in welding carbon steel, stainless steel, aluminum alloys',
      capacity: 'Welding capacity for structural components and heavy assemblies',
      inspection: 'Non-destructive testing and quality verification',
      safety: 'Comprehensive safety protocols and quality assurance'
    },
    capabilities: [
      {
        icon: Sparkles,
        title: 'Certified Welding',
        description: 'AWS certified welding procedures and qualified personnel',
        features: ['AWS D1.1 certified', 'Qualified welders', 'Proven procedures', 'Quality assurance']
      },
      {
        icon: Shield,
        title: 'Quality Control',
        description: 'Rigorous inspection and testing protocols',
        features: ['NDT testing', 'Visual inspection', 'Weld verification', 'Documentation']
      },
      {
        icon: Hammer,
        title: 'Heavy Capacity',
        description: 'Welding capacity for large structural assemblies',
        features: ['Heavy components', 'Structural welding', 'Large assemblies', 'Industrial strength']
      },
      {
        icon: Target,
        title: 'Precision Welding',
        description: 'Accurate welding with proper penetration and fusion',
        features: ['Proper penetration', 'Quality fusion', 'Strong joints', 'Durable results']
      }
    ],
    materials: [
      { name: 'Carbon Steel', thickness: '1mm - 50mm', applications: 'Structural components, machinery' },
      { name: 'Stainless Steel', thickness: '1mm - 30mm', applications: 'Food equipment, architectural' },
      { name: 'Aluminum', thickness: '1mm - 20mm', applications: 'Lightweight structures, marine' },
      { name: 'Alloy Steel', thickness: '1mm - 40mm', applications: 'High-strength components' }
    ],
    industries: [
      { name: 'Construction', applications: 'Structural steel, building frameworks' },
      { name: 'Manufacturing', applications: 'Machine frames, industrial equipment' },
      { name: 'Infrastructure', applications: 'Bridges, platforms, support structures' },
      { name: 'Energy', applications: 'Power plant equipment, renewable energy' }
    ],
    process: [
      {
        step: 1,
        title: 'Joint Preparation',
        description: 'Material preparation and joint design'
      },
      {
        step: 2,
        title: 'Welding Setup',
        description: 'Equipment setup and parameter configuration'
      },
      {
        step: 3,
        title: 'Welding Execution',
        description: 'Certified welding with proper procedures'
      },
      {
        step: 4,
        title: 'Inspection',
        description: 'Quality inspection and testing'
      },
      {
        step: 5,
        title: 'Finishing',
        description: 'Post-weld treatment and finishing'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'AWS D1.1 Certified',
        description: 'American Welding Society certified procedures'
      },
      {
        icon: Users,
        title: 'Certified Welders',
        description: 'Highly qualified and experienced welding personnel'
      },
      {
        icon: Shield,
        title: 'Quality Testing',
        description: 'Comprehensive non-destructive testing'
      },
      {
        icon: Target,
        title: 'Strong Joints',
        description: 'High-strength welds for critical applications'
      }
    ],
    stats: [
      { value: 'AWS D1.1', label: 'Certification' },
      { value: '50mm', label: 'Max Thickness' },
      { value: '100%', label: 'Quality Pass Rate' },
      { value: '400+', label: 'Projects Completed' }
    ]
  },
  'structural-fabrication': {
    id: 'structural-fabrication',
    title: 'Structural Fabrication',
    subtitle: 'Heavy-Duty Steel Technology',
    tagline: 'Heavy-Duty Steel Solutions',
    description: 'Comprehensive structural steel fabrication for large-scale industrial projects with precision engineering.',
    heroImage: CompleteWork1,
    model: '/models/fabrication-machine.glb',
    features: [
      '150mm material thickness',
      '600mm beam capacity',
      '500 tons monthly capacity',
      'Large-scale assembly',
      'Precision engineering',
      'Structural integrity testing'
    ],
    overview: {
      technology: 'Advanced structural fabrication with precision engineering',
      capacity : 'Fabrication of heavy-duty structures, platforms, frames, and industrial assemblies ',
      automation : 'CNC cutting, precision fabrication, and streamlined assembly workflows ',
      scale: 'Large-scale fabrication capacity for major industrial projects',
      precision : '±1mm fabrication accuracy for structural frames, platforms, and heavy steel assemblies.',
      materials: 'Expertise in structural steel, heavy plates, and beams',
      equipment: 'State-of-the-art fabrication equipment and handling systems',
      quality: 'Rigorous quality control and structural integrity testing',
      delivery: 'Complete fabrication, finishing, and delivery solutions'
    },
    capabilities: [
      {
        icon: Hammer,
        title: 'Heavy Fabrication',
        description: 'Large-scale structural steel fabrication capabilities',
        features: ['Heavy components', 'Large assemblies', 'Industrial strength', 'Precision engineering']
      },
      {
        icon: Target,
        title: 'Precision Engineering',
        description: 'Accurate fabrication with tight tolerance capacity',
        features: ['Tight tolerances', 'Accurate cutting', 'Precise assembly', 'Quality control']
      },
      {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'Comprehensive testing and quality verification',
        features: ['Structural testing', 'Quality inspection', 'Compliance checks', 'Documentation']
      },
      {
        icon: Factory,
        title: 'Advanced Equipment',
        description: 'State-of-the-art fabrication and handling equipment',
        features: ['Modern equipment', 'Handling systems', 'Precision tools', 'Efficient processes']
      }
    ],
    materials: [
      { name: 'Structural Steel', thickness: '6mm - 100mm', applications: 'Beams, columns, frameworks' },
      { name: 'Heavy Plates', thickness: '10mm - 150mm', applications: 'Base plates, connections' },
      { name: 'H-Beams', size: '100mm - 600mm', applications: 'Structural support, columns' },
      { name: 'I-Beams', size: '100mm - 500mm', applications: 'Floor systems, bridges' }
    ],
    industries: [
      { name: 'Construction', applications: 'Building frameworks, structural support' },
      { name: 'Infrastructure', applications: 'Bridges, tunnels, industrial facilities' },
      { name: 'Energy', applications: 'Power plants, renewable energy structures' },
      { name: 'Manufacturing', applications: 'Factory structures, equipment frames' }
    ],
    process: [
      {
        step: 1,
        title: 'Engineering Design',
        description: 'Structural design and engineering analysis'
      },
      {
        step: 2,
        title: 'Material Procurement',
        description: 'Quality material selection and procurement'
      },
      {
        step: 3,
        title: 'Fabrication',
        description: 'Precision cutting, forming, and assembly'
      },
      {
        step: 4,
        title: 'Quality Testing',
        description: 'Structural testing and quality verification'
      },
      {
        step: 5,
        title: 'Installation Support',
        description: 'On-site installation and support'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'ISO 9001:2015 Certified',
        description: 'Quality management system for structural fabrication'
      },
      {
        icon: Hammer,
        title: 'Heavy Capacity',
        description: 'Large-scale fabrication capabilities'
      },
      {
        icon: Target,
        title: 'Precision Engineering',
        description: 'Accurate fabrication with tight tolerances'
      },
      {
        icon: Shield,
        title: 'Structural Integrity',
        description: 'Comprehensive testing and quality assurance'
      }
    ],
    stats: [
      { value: '150mm', label: 'Max Thickness' },
      { value: '600mm', label: 'Max Beam Size' },
      { value: '500 tons', label: 'Monthly Capacity' },
      { value: '200+', label: 'Major Projects' }
    ]
  },
  'sheet-metal-fabrication': {
    id: 'sheet-metal-fabrication',
    title: 'Sheet Metal Fabrication',
    subtitle: 'Comprehensive Metal Technology',
    tagline: 'Comprehensive Metal Solutions',
    description: 'End-to-end sheet metal fabrication from prototyping to mass production with precision engineering.',
    heroImage: Raw1,
    model: '/models/sheet-metal-machine.glb',
    features: [
      '0.5mm - 8mm thickness range',
      '10,000+ monthly parts capacity',
      'Complete fabrication solutions',
      'Design to delivery workflow',
      'High-volume production',
      'Precision manufacturing'
    ],
    overview: {
      technology: 'Comprehensive sheet metal fabrication with advanced equipment',
      precision : '±0.2mm fabrication accuracy for complex sheet metal componentss ' ,
      materials : 'Expertise in stainless steel, mild steel, galvanized steel, aluminum, and sheets',
      automation : 'CNC laser cutting, precision bending, and automated fabrication workflows ',
      range: 'Complete fabrication from thin gauge to heavy sheet metal',
      processes: 'Cutting, bending, forming, welding, and assembly services',
      quality: 'Rigorous quality control and precision manufacturing',
      capacity: 'High-volume production capabilities with flexible scheduling',
      integration: 'Integrated fabrication and assembly solutions'
    },
    capabilities: [
      {
        icon: Package,
        title: 'Complete Solutions',
        description: 'End-to-end fabrication from design to finished product',
        features: ['Complete fabrication', 'Design to delivery', 'Integrated processes', 'Quality control']
      },
      {
        icon: Target,
        title: 'Precision Manufacturing',
        description: 'Accurate fabrication with tight tolerance capacity',
        features: ['Tight tolerances', 'Precision cutting', 'Accurate forming', 'Quality assembly']
      },
      {
        icon: Zap,
        title: 'High Volume',
        description: 'Large-scale production capabilities',
        features: ['Mass production', 'High capacity', 'Efficient processes', 'Quick turnaround']
      },
      {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'Comprehensive quality control systems',
        features: ['Quality inspection', 'Process control', 'Testing', 'Documentation']
      }
    ],
    materials: [
      { name: 'Stainless Steel', thickness: '0.5mm - 6mm', applications: 'Enclosures, decorative components' },
      { name: 'Mild Steel', thickness: '0.5mm - 8mm', applications: 'General fabrication, structural' },
      { name: 'Aluminum', thickness: '0.5mm - 6mm', applications: 'Lightweight components, aerospace' },
      { name: 'Galvanized Steel', thickness: '0.5mm - 4mm', applications: 'Outdoor applications, enclosures' }
    ],
    industries: [
      { name: 'Electronics', applications: 'Enclosures, chassis, mounting hardware' },
      { name: 'Automotive', applications: 'Body components, brackets, interior parts' },
      { name: 'Appliances', applications: 'Housings, frames, decorative panels' },
      { name: 'Construction', applications: 'Architectural panels, decorative elements' }
    ],
    process: [
      {
        step: 1,
        title: 'Design & Prototyping',
        description: 'CAD design and rapid prototyping'
      },
      {
        step: 2,
        title: 'Material Preparation',
        description: 'Material selection and preparation'
      },
      {
        step: 3,
        title: 'Fabrication',
        description: 'Cutting, bending, forming, and assembly'
      },
      {
        step: 4,
        title: 'Finishing',
        description: 'Surface treatment and finishing'
      },
      {
        step: 5,
        title: 'Quality Control',
        description: 'Final inspection and delivery'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'ISO 9001:2015 Certified',
        description: 'Quality management system for sheet metal fabrication'
      },
      {
        icon: Package,
        title: 'Complete Solutions',
        description: 'End-to-end fabrication capabilities'
      },
      {
        icon: Zap,
        title: 'High Volume',
        description: 'Large-scale production capacity'
      },
      {
        icon: Target,
        title: 'Precision Quality',
        description: 'High-precision manufacturing'
      }
    ],
    stats: [
      { value: '0.5mm', label: 'Min Thickness' },
      { value: '8mm', label: 'Max Thickness' },
      { value: '10,000+', label: 'Monthly Parts' },
      { value: '600+', label: 'Projects Completed' }
    ]
  },
  'electric-panel-fabrication': {
    id: 'electric-panel-fabrication',
    title: 'Electric Panel Fabrication',
    subtitle: 'Custom Control Technology',
    tagline: 'Custom Control Solutions',
    description: 'Custom engineered electric control panels built to exact specifications with precision manufacturing.',
    heroImage:Raw2,
    model: '/models/electric-panel-machine.glb',
    features: [
      'IEC/UL compliant',
      'Custom design engineering',
      'Full assembly service',
      'Electrical testing',
      'Technical documentation',
      'Quality certification'
    ],
    overview: {
      technology: 'Advanced electrical panel fabrication with precision engineering',
      precision : 'Precision panel assembly with organized wiring and industry-standard layouts',
      materials : 'Fabrication using CRCA sheets, stainless steel, aluminum enclosures, copper busbars, and electrical components',
      capacity : ' Custom-built electrical panels for industrial, commercial, and automation applications' ,
      automation : 'Modern assembly techniques with CNC panel fabrication and precision component integration ',
      quality : 'Thorough electrical testing, inspection, and compliance with industry safety standardss '
    },
    capabilities: [
      {
        icon: Cpu,
        title: 'Custom Engineering',
        description: 'Tailored panel design and engineering solutions',
        features: ['Custom design', 'Engineering support', 'Specification compliance', 'Technical documentation']
      },
      {
        icon: Shield,
        title: 'Quality Compliance',
        description: 'IEC and UL compliant manufacturing process',
        features: ['IEC standards', 'UL compliance', 'Safety standards', 'Quality certification']
      },
      {
        icon: Target,
        title: 'Precision Assembly',
        description: 'Accurate component assembly and integration',
        features: ['Precision assembly', 'Component integration', 'Wiring quality', 'Connection reliability']
      },
      {
        icon: Zap,
        title: 'Testing & Verification',
        description: 'Comprehensive electrical testing and validation',
        features: ['Electrical testing', 'Safety verification', 'Performance testing', 'Quality assurance']
      }
    ],
    materials: [
      { name: 'Stainless Steel', thickness: '1mm - 3mm', applications: 'Industrial enclosures, harsh environments' },
      { name: 'Mild Steel', thickness: '1mm - 2mm', applications: 'General purpose panels, cost-effective' },
      { name: 'Aluminum', thickness: '1mm - 4mm', applications: 'Lightweight panels, portable equipment' },
      { name: 'Galvanized Steel', thickness: '1mm - 2mm', applications: 'Outdoor panels, weather resistance' }
    ],
    industries: [
      { name: 'Manufacturing', applications: 'Machine control panels, automation systems' },
      { name: 'Energy', applications: 'Power distribution, renewable energy control' },
      { name: 'Infrastructure', applications: 'Building management, traffic control' },
      { name: 'Telecommunications', applications: 'Network equipment, data centers' }
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Technical requirements and specifications analysis'
      },
      {
        step: 2,
        title: 'Design Engineering',
        description: 'Panel design and engineering documentation'
      },
      {
        step: 3,
        title: 'Fabrication',
        description: 'Precision panel fabrication and component preparation'
      },
      {
        step: 4,
        title: 'Assembly & Wiring',
        description: 'Component assembly and electrical wiring'
      },
      {
        step: 5,
        title: 'Testing & Delivery',
        description: 'Electrical testing and quality delivery'
      }
    ],
    features: [
      {
        icon: Award,
        title: 'IEC/UL Compliant',
        description: 'International standards compliance'
      },
      {
        icon: Cpu,
        title: 'Custom Engineering',
        description: 'Tailored design solutions'
      },
      {
        icon: Shield,
        title: 'Quality Testing',
        description: 'Comprehensive electrical testing'
      },
      {
        icon: Target,
        title: 'Precision Assembly',
        description: 'High-quality component assembly'
      }
    ],
    stats: [
      { value: 'IEC/UL', label: 'Compliance' },
      { value: '100%', label: 'Testing Pass Rate' },
      { value: '500+', label: 'Panels Delivered' },
      { value: '50+', label: 'Custom Designs' }
    ]
  },
  'industrial-painting-services': {
    id: 'industrial-painting-services',
    title: 'Industrial Painting Services',
    subtitle: 'Professional Surface Coating Technology',
    tagline: 'Advanced Painting & Coating Solutions',
    description: 'Professional industrial painting and protective coating services for fabricated structures, machinery, and industrial equipment.',
    heroImage: Painting1,
    model: '/models/painting-machine.glb',

    features: [
      'Powder coating solutions',
      'Anti-corrosion protection',
      'Industrial spray painting',
      'Surface preparation',
      'Heat resistant coatings',
      'Premium finish quality'
    ],

    overview: {
      technology: 'Advanced industrial spray painting and powder coating systems with precision finishing.',
      precision: 'Uniform coating thickness with superior adhesion and long-lasting durability.',
      materials: 'Expertise in coating mild steel, stainless steel, aluminum, and fabricated structures.',
      capacity: 'Large-scale industrial painting for machinery, panels, structures, and fabricated products.',
      automation: 'Modern spray systems and controlled curing processes for premium quality finishes.',
      quality: 'Strict surface preparation and coating quality inspection for long-term performance.'
    },

    capabilities: [
      {
        icon: Paintbrush,
        title: 'Premium Finishing',
        description: 'High-quality industrial finishing with smooth and durable coatings.',
        features: [
          'Smooth finish',
          'Uniform coating',
          'Premium aesthetics',
          'Long durability'
        ]
      },
      {
        icon: Shield,
        title: 'Anti-Corrosion Protection',
        description: 'Protective coatings to prevent rust and environmental damage.',
        features: [
          'Rust prevention',
          'Weather resistance',
          'Chemical resistance',
          'Industrial protection'
        ]
      },
      {
        icon: Factory,
        title: 'Large Scale Painting',
        description: 'Industrial painting solutions for heavy machinery and structures.',
        features: [
          'Heavy structures',
          'Machine coating',
          'Fabricated parts',
          'Bulk processing'
        ]
      },
      {
        icon: Zap,
        title: 'Modern Coating Technology',
        description: 'Advanced spray systems and powder coating technology.',
        features: [
          'Powder coating',
          'Spray painting',
          'Fast curing',
          'Efficient process'
        ]
      }
    ],

    materials: [
      {
        name: 'Mild Steel',
        thickness: 'All Sizes',
        applications: 'Industrial structures, fabricated products'
      },
      {
        name: 'Stainless Steel',
        thickness: 'All Sizes',
        applications: 'Decorative and corrosion-resistant applications'
      },
      {
        name: 'Aluminum',
        thickness: 'All Sizes',
        applications: 'Lightweight industrial components'
      },
      {
        name: 'Heavy Fabricated Parts',
        thickness: 'Custom',
        applications: 'Industrial machinery and structures'
      }
    ],

    industries: [
      {
        name: 'Manufacturing',
        applications: 'Industrial machines, fabricated structures'
      },
      {
        name: 'Construction',
        applications: 'Structural steel and architectural components'
      },
      {
        name: 'Automotive',
        applications: 'Industrial vehicle and component coatings'
      },
      {
        name: 'Infrastructure',
        applications: 'Outdoor industrial structures and equipment'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Surface Preparation',
        description: 'Cleaning, grinding, and preparation for coating adhesion.'
      },
      {
        step: 2,
        title: 'Primer Application',
        description: 'Application of industrial-grade primer coating.'
      },
      {
        step: 3,
        title: 'Painting & Coating',
        description: 'Precision spray painting or powder coating process.'
      },
      {
        step: 4,
        title: 'Curing Process',
        description: 'Controlled curing for maximum durability and finish.'
      },
      {
        step: 5,
        title: 'Quality Inspection',
        description: 'Final inspection for coating quality and consistency.'
      }
    ],

    stats: [
      {
        value: '100%',
        label: 'Coating Coverage'
      },
      {
        value: '500+',
        label: 'Projects Completed'
      },
      {
        value: 'Anti-Rust',
        label: 'Protection'
      },
      {
        value: 'Premium',
        label: 'Finish Quality'
      }
    ]
  },

  'metal-surface-treatment': {
    id: 'metal-surface-treatment',
    title: 'Metal Surface Treatment',
    subtitle: 'Advanced Surface Enhancement Technology',
    tagline: 'Surface Protection & Treatment',
    description: 'Professional surface treatment services including shot blasting, rust removal, polishing, and chemical treatment for industrial components.',
    heroImage: SandBlasting1,
    model: '/models/surface-treatment-machine.glb',

    features: [
      'Shot blasting',
      'Rust removal',
      'Chemical treatment',
      'Surface polishing',
      'Protective finishing',
      'Industrial durability'
    ],

    overview: {
      technology: 'Advanced surface preparation and treatment technologies for industrial-grade durability.',
      precision: 'Uniform surface finishing and treatment processes for enhanced coating adhesion.',
      materials: 'Surface treatment expertise for steel, stainless steel, aluminum, and fabricated components.',
      capacity: 'Large-scale processing for industrial components and fabricated structures.',
      automation: 'Modern blasting and polishing equipment for efficient production.',
      quality: 'Strict inspection and quality standards for surface cleanliness and finish.'
    },

    capabilities: [
      {
        icon: BrushCleaning,
        title: 'Surface Preparation',
        description: 'Professional preparation for coating and fabrication.',
        features: [
          'Cleaning',
          'Deburring',
          'Grinding',
          'Preparation'
        ]
      },
      {
        icon: Shield,
        title: 'Rust Protection',
        description: 'Protective treatment to improve durability and lifespan.',
        features: [
          'Rust removal',
          'Corrosion control',
          'Protection',
          'Long durability'
        ]
      },
      {
        icon: Sparkles,
        title: 'Polishing & Finishing',
        description: 'Premium polishing and aesthetic surface finishing.',
        features: [
          'Smooth finish',
          'Industrial polishing',
          'Surface shine',
          'Visual quality'
        ]
      },
      {
        icon: Factory,
        title: 'Industrial Processing',
        description: 'High-capacity treatment solutions for industrial fabrication.',
        features: [
          'Bulk processing',
          'Heavy structures',
          'Machine components',
          'Industrial scale'
        ]
      }
    ],

    materials: [
      {
        name: 'Carbon Steel',
        thickness: 'All Sizes',
        applications: 'Industrial structures and fabricated parts'
      },
      {
        name: 'Stainless Steel',
        thickness: 'All Sizes',
        applications: 'Food-grade and decorative finishing'
      },
      {
        name: 'Aluminum',
        thickness: 'All Sizes',
        applications: 'Lightweight industrial components'
      },
      {
        name: 'Heavy Machinery Parts',
        thickness: 'Custom',
        applications: 'Industrial machine restoration and finishing'
      }
    ],

    industries: [
      {
        name: 'Manufacturing',
        applications: 'Machine parts and fabricated structures'
      },
      {
        name: 'Construction',
        applications: 'Structural steel preparation and finishing'
      },
      {
        name: 'Automotive',
        applications: 'Vehicle and component treatment'
      },
      {
        name: 'Industrial Equipment',
        applications: 'Heavy equipment restoration and protection'
      }
    ],

    process: [
      {
        step: 1,
        title: 'Inspection',
        description: 'Surface inspection and treatment planning.'
      },
      {
        step: 2,
        title: 'Cleaning & Preparation',
        description: 'Removal of contaminants and preparation process.'
      },
      {
        step: 3,
        title: 'Surface Treatment',
        description: 'Sand blasting, polishing, or chemical treatment.'
      },
      {
        step: 4,
        title: 'Protection Process',
        description: 'Protective finishing and treatment application.'
      },
      {
        step: 5,
        title: 'Final Quality Check',
        description: 'Inspection for finish quality and durability.'
      }
    ],

    stats: [
      {
        value: '100%',
        label: 'Surface Coverage'
      },
      {
        value: 'Anti-Rust',
        label: 'Protection'
      },
      {
        value: 'Industrial',
        label: 'Grade Finish'
      },
      {
        value: '400+',
        label: 'Projects Completed'
      }
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [hoveredCapability, setHoveredCapability] = useState(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const y = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    const serviceInfo = serviceData[serviceId];
    if (serviceInfo) {
      setService(serviceInfo);
      // Update page title
      document.title = `${serviceInfo.title} - SAPTRAJ Industries`;
    }
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-deep-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-gray-400 mb-8">The requested service page could not be found.</p>
          <Link to="/services" className="text-industrial-yellow hover:text-yellow-400">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-black">
      <div className="container mx-auto px-6 md:px-12 pt-3">
  <Link
    to="/services"
    className="
      inline-flex
      items-center
      gap-2

      text-industrial-yellow
      hover:text-yellow-400

      text-sm
      md:text-base

      font-medium

      transition-all
      duration-300
    "
  >
    <span>←</span>
    <span>Back to Services</span>
  </Link>
</div>

      {/* 3D Hero Section */}
      <ServiceHero3D service={service} />

      {/* Service Overview Section */}
      <section className="py-20 bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Service Overview
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Technology</h3>
                  <p className="text-gray-300 leading-relaxed">{service.overview.technology}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Precision</h3>
                  <p className="text-gray-300 leading-relaxed">{service.overview.precision}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Materials</h3>
                  <p className="text-gray-300 leading-relaxed">{service.overview.materials}</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Capacity</h3>
                <p className="text-gray-300 leading-relaxed">{service.overview.capacity}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Automation</h3>
                <p className="text-gray-300 leading-relaxed">{service.overview.automation}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-industrial-yellow mb-2">Quality</h3>
                <p className="text-gray-300 leading-relaxed">{service.overview.quality}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Key Capabilities</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Advanced capabilities and technologies that make our {service.title.toLowerCase()} services exceptional
            </p>
          </motion.div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCapability(index)}
                onMouseLeave={() => setHoveredCapability(null)}
                className="relative group"
              >
                <div className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 hover:border-industrial-yellow/50 transition-all duration-300 hover:shadow-lg hover:shadow-industrial-yellow/20">

                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: hoveredCapability === index ? 1.1 : 1,
                      rotate: hoveredCapability === index ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-xl flex items-center justify-center mb-4"
                  >
                    <capability.icon size={32} className="text-black" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{capability.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{capability.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-gray-400 text-sm">
                        <CheckCircle size={14} className="text-industrial-yellow" />
                        {typeof feature === 'string' ? feature : feature.title || feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glow Effect */}
                {hoveredCapability === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-industrial-yellow/10 to-transparent pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 bg-gunmetal-gray">
        <div className="container mx-auto px-6 md:px-12">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Materials We Work With</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Expertise in working with various materials for optimal results
            </p>
          </motion.div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.materials.map((material, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] border border-[#333] rounded-xl p-6 hover:border-industrial-yellow/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{material.name}</h3>
                <p className="text-industrial-yellow font-semibold mb-2">{material.thickness}</p>
                <p className="text-gray-300 text-sm">{material.applications}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="py-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Trusted partner for diverse industrial applications
            </p>
          </motion.div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] border border-[#333] rounded-xl p-6 hover:border-industrial-yellow/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-gray-300 text-sm">{industry.applications}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-20 bg-gunmetal-gray relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h3 className="text-sm md:text-base tracking-[3px] uppercase text-gray-400 mb-4">
              PROCESS
            </h3>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Our {service.title} Process
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Streamlined workflow ensuring precision, efficiency, and quality at every stage
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-industrial-yellow/50 via-industrial-yellow/30 to-industrial-yellow/50 transform -translate-x-1/2 origin-top"
            />

            {/* Process Steps */}
            <div className="space-y-16 md:space-y-24">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                                index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                >
                  {/* Content Card */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}
                  >
                    <div className="bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-industrial-yellow/50 transition-all duration-300">

                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-industrial-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 bg-industrial-yellow/20 rounded-full flex items-center justify-center">
                            <span className="text-industrial-yellow font-bold text-sm">{step.step}</span>
                          </div>
                          <div className="h-px bg-industrial-yellow/30 flex-1" />
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-industrial-yellow transition-colors duration-300">
                          {step.title}
                        </h3>

                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Accent Border */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-industrial-yellow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>

                  {/* Timeline Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="relative">
                      {/* Glow */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="absolute inset-0 bg-industrial-yellow rounded-full blur-lg opacity-50"
                      />

                      {/* Node */}
                      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-full flex items-center justify-center font-bold text-black text-lg md:text-xl shadow-lg shadow-industrial-yellow/30">
                        {step.step}
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty Space for Alternating Layout */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:ml-auto' : 'md:pr-10'}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features & Stats Section */}
      <section className="pt-20 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              What makes our {service.title.toLowerCase()} services exceptional
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-industrial-yellow to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{typeof feature === 'string' ? feature : feature.title || feature}</h3>
                <p className="text-gray-300 text-sm">Precision cutting with advanced technology and quality assurance</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-deep-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-yellow/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.1)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need {service.title} Solutions?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Get in touch with our expert team to discuss your specific requirements and discover how we can help you achieve your manufacturing goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/quote">
                <Button variant="primary" className="px-8 py-4">
                  Request Quote
                </Button>
              </Link>
              <Link to="/contact-us">
                <Button variant="outline" className="px-8 py-4">
                  Contact Expert
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
