'use client';

import { ReactNode } from 'react';

interface AccordionItemProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function AccordionItem({ title, subtitle, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <button
        onClick={onToggle}
        className="w-full p-5 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-start flex-1">
          <svg className="w-5 h-5 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
        </div>
        <svg
          className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-8 pb-5 sm:pb-8 border-t border-gray-100">
          <div className="mt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
