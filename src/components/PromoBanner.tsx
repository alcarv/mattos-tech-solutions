import React, { useState, useEffect } from 'react';

function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-yellow-400 text-black py-3 px-4 text-sm flex justify-between items-center z-50">
      <span className="font-semibold">
        🚀 Promoção: Site a partir de <strong>R$500,00</strong>! 🚀
      </span>
      <button
        onClick={() => setIsVisible(false)}
        className="font-bold"
        aria-label="Fechar promoção"
      >
        X
      </button>
    </div>
  );
}

export default PromoBanner;
