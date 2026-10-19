// Thin botanical line drawing used as decoration.
export default function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 260" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className}>
      <path d="M100 255C100 190 98 120 104 10" />
      <path d="M101 200c-30-6-55-28-62-60 32 4 55 26 62 60z" />
      <path d="M102 150c28-8 50-32 54-62-30 6-50 30-54 62z" />
      <path d="M102 105c-24-8-42-28-46-54 26 6 42 26 46 54z" />
      <path d="M103 62c20-8 34-26 36-48-22 6-34 24-36 48z" />
      <path d="M50 140c14 6 30 9 51 60M150 88c-14 10-28 28-48 62M58 52c12 8 26 20 44 53M138 14c-10 10-22 24-35 48" />
    </svg>
  );
}
