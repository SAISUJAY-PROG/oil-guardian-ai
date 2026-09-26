import React from 'react';
import { motion } from 'framer-motion';

export default function RiskCard({ title, score, level, index }) {
  // Determine color based on risk level
  const getBadgeColor = (level) => {
    if (level === 'High') return '#ef4444'; // Red
    if (level === 'Medium') return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  return (
    <motion.div
      // This makes the cards stagger in one after another
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className="risk-card"
      style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        color: '#f8fafc',
        cursor: 'pointer'
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#94a3b8' }}>{title}</h3>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>
        {score}%
      </div>
      <span style={{
        background: getBadgeColor(level),
        color: 'white',
        padding: '4px 12px',
        borderRadius: '999px',
        fontSize: '0.85rem',
        fontWeight: 'bold'
      }}>
        {level} Risk
      </span>
    </motion.div>
  );
}