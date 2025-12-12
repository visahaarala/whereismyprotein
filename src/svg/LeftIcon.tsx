const LeftIcon = ({ strokeWidth }: { strokeWidth?: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
    <path
      // d='M8 2 L2 10 L8 18'
      d='M15 2 L5 10 L15 18'
      stroke='currentColor'
      strokeWidth={strokeWidth || '1.3'}
      fill='none'
    />
  </svg>
);

export default LeftIcon;
