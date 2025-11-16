export default function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md border border-stone-300 bg-white shadow-sm active:scale-95"
    >
      <svg
        className="w-6 h-6 text-stone-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" 
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}
