import React, { useState, useEffect } from 'react';

function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  // Optional: Auto-hide banner after 10 seconds

  if (!isVisible) return null;

  return (
    <div className="w-full bg-yellow-400 text-black py-3 px-6 flex justify-between items-center z-10">
      <span className="font-bold text-lg">
        🚀 Oferta especial: Desenvolvimento de site a partir de R$500,00! 🚀
      </span>
      <button 
        onClick={() => setIsVisible(false)} 
        className="text-black font-bold"
        aria-label="Close promotion"
      >
        X
      </button>
    </div>
  );
}

export default PromoBanner;
