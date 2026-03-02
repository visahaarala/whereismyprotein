const CloseIcon = ({ strokeWidth }: { strokeWidth?: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100%' height='100%'>
    <path
      d='M20 20 L80 80 M20 80 L80 20'
      stroke='currentColor'
      strokeWidth={strokeWidth || 8}
      fill='none'
      strokeLinecap='round'
    />
  </svg>
);

export default CloseIcon;
