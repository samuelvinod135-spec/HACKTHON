import { useState } from 'react';

function getInitials(name, email) {
  if (name && typeof name === 'string' && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email && typeof email === 'string' && email.includes('@')) {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  }
  return 'LX';
}

// Consistent curated gradients based on string hash
const GRADIENTS = [
  'from-sky-500 to-indigo-600',
  'from-blue-600 to-cyan-500',
  'from-indigo-500 to-purple-600',
  'from-teal-500 to-sky-600',
  'from-sky-600 to-blue-700',
];

function getGradient(str) {
  let hash = 0;
  const s = str || 'default';
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[idx];
}

export default function UserAvatar({
  name = '',
  email = '',
  avatarUrl = '',
  size = 'md',
  className = '',
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const sizeClasses = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm font-bold',
    lg: 'h-14 w-14 text-base font-extrabold',
    xl: 'h-24 w-24 text-2xl font-black',
  }[size] || 'h-10 w-10 text-sm font-bold';

  const initials = getInitials(name, email);
  const grad = getGradient(name || email);
  const hasValidImg = Boolean(avatarUrl && !imgFailed && !avatarUrl.includes('/clay/avatar.jpg'));

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full shadow-xs border border-white/80 select-none flex items-center justify-center ${sizeClasses} ${className}`}
    >
      {hasValidImg ? (
        <img
          src={avatarUrl}
          alt={name || 'Student Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className={`h-full w-full flex items-center justify-center bg-gradient-to-tr ${grad} text-white tracking-wider font-sans`}
        >
          <span>{initials}</span>
        </div>
      )}
    </div>
  );
}
