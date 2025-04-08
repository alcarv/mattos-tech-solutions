import React, { useEffect, useState } from 'react';

const codeSnippets = [
  '// Bem-vindo à Mattos Tech & Solutions',
  'function greetVisitor() {',
  '  const visitor = {',
  '    status: "cliente valorizado",',
  '    interests: ["desenvolvimento web", "tecnologia"],',
  '  };',
  '',
  '  console.log("Bem-vindo a bordo! 🚀");',
  '  console.log("Vamos construir algo incrível juntos!");',
  '',
  '  return {',
  '    message: "Seu sucesso digital começa aqui",',
  '    team: "Mattos Tech",',
  '    mission: "Entregando excelência",',
  '  };',
  '}',
  '',
  'greetVisitor();'
];

export const CodeAnimation: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < codeSnippets.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, codeSnippets[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="bg-[#282a36] rounded-lg p-6 font-mono text-sm md:text-base overflow-hidden relative transform-gpu">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#6272a4]/10 to-[#bd93f9]/10 pointer-events-none"></div>
      {visibleLines.map((line, index) => (
        <div
          key={index}
          className="flex items-center space-x-4"
          style={{
            opacity: 0,
            animation: `fadeIn 0.3s ease-out ${index * 0.1}s forwards`,
          }}
        >
          <span className="text-[#6272a4] select-none w-6 text-right">{index + 1}</span>
          <span
            className={`
              ${line.startsWith('//') ? 'text-[#6272a4]' : ''}
              ${line.includes('function') ? 'text-[#50fa7b]' : ''}
              ${line.includes('const') ? 'text-[#ff79c6]' : ''}
              ${line.includes('console.log') ? 'text-[#bd93f9]' : ''}
              ${line.includes('return') ? 'text-[#ff79c6]' : ''}
              ${(!line.startsWith('//') && !line.includes('function') && !line.includes('const') && !line.includes('console.log') && !line.includes('return')) ? 'text-[#f8f8f2]' : ''}
            `}
            style={{ whiteSpace: 'pre' }}
          >
            {line}
          </span>
        </div>
      ))}
      <div className="absolute bottom-4 right-4 text-[#6272a4] text-sm">Dracula Theme</div>
    </div>
  );
};