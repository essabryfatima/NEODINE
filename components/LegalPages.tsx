import React from 'react';
import { motion as m } from 'framer-motion';
import { LEGAL_CONTENT } from '../constants';

const motion = m as any;

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = LEGAL_CONTENT[type];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 border-b border-neon-blue/30 pb-4 inline-block">
          {content.title}
        </h1>
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-line text-gray-300 leading-relaxed space-y-4">
            {content.content}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalPage;