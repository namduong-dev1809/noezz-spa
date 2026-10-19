// Thin line icons for each treatment (decorative, the card title names the service).
const paths: Record<string, React.ReactNode> = {
  // oil bottle with a falling drop
  body: (
    <>
      <path d="M20 8h8v5l3 4v21a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V17l3-4z" />
      <path d="M17 24h14" />
      <path d="M38 22c0 0-3 3.5-3 5.5a3 3 0 0 0 6 0c0-2-3-5.5-3-5.5z" />
    </>
  ),
  // stacked stones with a sprout
  stone: (
    <>
      <ellipse cx="24" cy="38" rx="13" ry="4.5" />
      <ellipse cx="24" cy="29" rx="9.5" ry="3.8" />
      <ellipse cx="24" cy="21.5" rx="6.5" ry="3" />
      <path d="M24 18.5V12" />
      <path d="M24 13c0-3 2.5-5 6-5 0 3-2.5 5-6 5zM24 14c0-2.5-2-4.5-5-4.5 0 2.5 2 4.5 5 4.5z" />
    </>
  ),
  // basin with flowing water and drops
  head: (
    <>
      <path d="M8 26h32a16 12 0 0 1-32 0z" />
      <path d="M17 38v4M31 38v4M14 42h20" />
      <path d="M16 20c2-2 4 2 6 0s4 2 6 0 4 2 6 0" />
      <path d="M22 9c0 0-2.5 3-2.5 4.5a2.5 2.5 0 0 0 5 0C24.5 12 22 9 22 9zM30 12c0 0-2 2.4-2 3.6a2 2 0 0 0 4 0c0-1.2-2-3.6-2-3.6z" />
    </>
  ),
  // face with closed eyes and a leaf
  facial: (
    <>
      <path d="M24 6c-8 0-13 7-13 16 0 10 6 20 13 20s13-10 13-20c0-9-5-16-13-16z" />
      <path d="M17 22c1.5 1.5 3.5 1.5 5 0M26 22c1.5 1.5 3.5 1.5 5 0" />
      <path d="M21 32c2 1.5 4 1.5 6 0" />
      <path d="M33 10c4-1 8 1 9 5-4 1-8-1-9-5z" />
    </>
  ),
  // lotus
  combo: (
    <>
      <path d="M24 12c4 5 4 14 0 22-4-8-4-17 0-22z" />
      <path d="M24 34c-2-7-7-12-14-13 0 7 6 13 14 13zM24 34c2-7 7-12 14-13 0 7-6 13-14 13z" />
      <path d="M24 34c-5-2-11-2-17 1M24 34c5-2 11-2 17 1" />
      <path d="M10 41h28" />
    </>
  ),
};

export default function ServiceIcon({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[id]}
    </svg>
  );
}
