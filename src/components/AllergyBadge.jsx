import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function AllergyBadge({ allergy }) {
  if (!allergy) return null;

  const { substance, severity, reaction, type } = allergy;

  let badgeClass = 'allergy-badge info';
  if (severity.toLowerCase() === 'high' || severity.toLowerCase() === 'severe') {
    badgeClass = 'allergy-badge danger';
  } else if (severity.toLowerCase() === 'moderate') {
    badgeClass = 'allergy-badge warning';
  } else if (severity.toLowerCase() === 'low') {
    badgeClass = 'allergy-badge success';
  }

  return (
    <div className={badgeClass} title={`Type: ${type} | Reaction: ${reaction}`}>
      <AlertCircle size={14} />
      <span>{substance} ({severity} - {reaction})</span>
    </div>
  );
}
