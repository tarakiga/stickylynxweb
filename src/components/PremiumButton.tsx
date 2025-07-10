import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
  loading?: boolean;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
  loading?: boolean;
};

type PremiumButtonProps = ButtonProps | AnchorProps;

function isAnchorProps(props: PremiumButtonProps): props is AnchorProps {
  return props.as === 'a';
}

export const PremiumButton: React.FC<PremiumButtonProps> = (props) => {
  const {
    children,
    variant = 'primary',
    icon,
    loading = false,
    ...rest
  } = props;

  const base =
    'relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2';
  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-400 hover:to-yellow-600 focus:ring-yellow-300/60',
    secondary:
      'bg-gradient-to-br from-blue-900 to-blue-700 text-white hover:from-blue-800 hover:to-blue-600 focus:ring-blue-400/60',
    danger:
      'bg-gradient-to-br from-red-600 to-red-400 text-white hover:from-red-700 hover:to-red-500 focus:ring-red-400/60',
  };
  const state =
    ('disabled' in props && props.disabled) || loading
      ? 'opacity-60 cursor-not-allowed pointer-events-none'
      : 'cursor-pointer hover:cursor-pointer hover:scale-105 active:scale-95';

  if (isAnchorProps(props)) {
    // Anchor
    return (
      <a className={`${base} ${variants[variant]} ${state}`} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : icon && <span className="-ml-1">{icon}</span>}
        {children}
      </a>
    );
  }
  // Button
  return (
    <button
      className={`${base} ${variants[variant]} ${state}`}
      disabled={('disabled' in props && props.disabled) || loading}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : icon && <span className="-ml-1">{icon}</span>}
      {children}
    </button>
  );
};

export default PremiumButton; 