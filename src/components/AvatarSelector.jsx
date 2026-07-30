import React, { useState } from 'react';
import { BUILTIN_AVATARS } from '../data/enterpriseData';
import { Upload, Check, User, Camera } from 'lucide-react';

export default function AvatarSelector({ selectedAvatar, onSelectAvatar, isDoctor = false }) {
  const [customFile, setCustomFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomFile(reader.result);
        onSelectAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <Camera size={15} style={{ color: 'var(--teal-600)' }} />
        <span>{isDoctor ? "Professional Profile Photo / Avatar (Mandatory for Doctors)" : "Profile Avatar / Photo (Optional)"}</span>
      </label>

      {/* Selected Preview */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-md)' }}>
        {selectedAvatar ? (
          <img src={selectedAvatar} alt="Selected Avatar" style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--teal-500)' }} />
        ) : (
          <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'var(--slate-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <User size={28} />
          </div>
        )}
        <div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-900)' }}>
            {selectedAvatar ? "Selected Profile Picture" : "No Profile Picture Selected"}
          </span>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0' }}>
            Select from clinical avatars or upload your custom high-resolution photo.
          </p>
        </div>
      </div>

      {/* Built-in Avatars Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.85rem' }}>
        {BUILTIN_AVATARS.map((av) => {
          const isSelected = selectedAvatar === av.url;
          return (
            <button
              key={av.id}
              type="button"
              onClick={() => onSelectAvatar(av.url)}
              style={{
                position: 'relative',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: isSelected ? '3px solid var(--teal-500)' : '2px solid var(--border-color)',
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'var(--bg-main)'
              }}
              title={av.label}
            >
              <img src={av.url} alt={av.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {isSelected && (
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(20, 184, 166, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                  <Check size={18} strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Upload Button */}
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--teal-600)', backgroundColor: '#ffffff', border: '1px solid var(--teal-500)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s ease' }}>
        <Upload size={14} />
        <span>Upload Custom Photo</span>
        <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
      </label>
    </div>
  );
}
