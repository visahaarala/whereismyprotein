const USDA = ({ show }: { show: boolean }) => {
  return (
    <div style={show ? { display: 'flex' } : { display: 'none' }}>
      <h2>usda</h2>
    </div>
  );
};

export default USDA;
