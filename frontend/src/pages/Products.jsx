import React from 'react';
import Card from '../components/UI/Card';

const Products = () => {
  const products = [
    'Laser Cut Components', 'Structural Assemblies', 'CNC Bent Parts', 
    'Electric Control Panels', 'Industrial Enclosures', 'Welded Structures'
  ];

  return (
    <div className="w-full">
      <div className="bg-gunmetal-gray py-20 border-b border-[#333]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Products</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Precision manufactured parts engineered to exacting specifications.</p>
        </div>
      </div>
      
      <section className="py-24 bg-deep-black">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <Card key={i}>
              <div className="aspect-video bg-[#111] mb-6 flex items-center justify-center border border-[#222]">
                <span className="text-gray-600 font-mono text-xs uppercase">[Product Image]</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">{product}</h3>
              <p className="text-gray-400 text-sm">Industrial grade manufactured per client specifications.</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
