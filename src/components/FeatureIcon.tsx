const paths: Record<string, string> = {
  levels: 'M4 20V14M10 20V9M16 20V4M22 20H2',
  listen: 'M3 14v-2a9 9 0 0 1 18 0v2M3 14h3v6H4a1 1 0 0 1-1-1v-5zm18 0h-3v6h2a1 1 0 0 0 1-1v-5z',
  vocab: 'M4 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4zM20 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z',
  grammar: 'M4 6h16M4 12h10M4 18h7M17 15l4 4m0-4-4 4',
  topik: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  heart: 'M12 20s-8-4.6-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.4 12 20 12 20z',
  history: 'M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5M12 7v5l3 3',
  note: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5',
};

export function FeatureIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name] ?? paths.note} />
    </svg>
  );
}
