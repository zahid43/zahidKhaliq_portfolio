'use client';

import { useState, useId } from 'react';
import { motion } from 'framer-motion';

interface BaseProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

interface InputProps extends BaseProps {
  as?: 'input';
  type?: string;
}

interface TextareaProps extends BaseProps {
  as: 'textarea';
  rows?: number;
}

type FloatingFieldProps = InputProps | TextareaProps;

export default function FloatingField(props: FloatingFieldProps) {
  const { label, name, value, onChange, disabled, required, className = '' } = props;
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const isTextarea = props.as === 'textarea';

  const fieldClass = [
    'w-full rounded-2xl border bg-foreground/[0.03] dark:bg-foreground/[0.04]',
    'px-4 pt-6 pb-3 text-sm text-foreground outline-none',
    'transition-colors duration-200 disabled:opacity-40',
    focused
      ? 'border-accent/60 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]'
      : 'border-foreground/10 hover:border-foreground/25',
    isTextarea ? 'resize-none' : '',
    className,
  ].join(' ');

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          required={required}
          rows={(props as TextareaProps).rows ?? 5}
          className={fieldClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={(props as InputProps).type ?? 'text'}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          required={required}
          className={fieldClass}
        />
      )}

      {/* Animated label */}
      <motion.label
        htmlFor={id}
        animate={floated ? 'floated' : 'resting'}
        variants={{
          resting: {
            top: isTextarea ? 16 : '50%',
            y: isTextarea ? 0 : '-50%',
            fontSize: '0.875rem',
            color: 'var(--color-muted)',
            opacity: 0.7,
          },
          floated: {
            top: 8,
            y: 0,
            fontSize: '0.65rem',
            color: focused ? 'var(--color-accent)' : 'var(--color-muted)',
            opacity: 1,
          },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="pointer-events-none absolute left-4 font-semibold uppercase tracking-wider leading-none"
      >
        {label}
      </motion.label>

      {/* Focus underline glow */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-accent origin-left"
      />
    </div>
  );
}
