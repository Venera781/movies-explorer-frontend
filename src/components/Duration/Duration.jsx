const Duration = ({ value, className }) => {
  const hours = Math.trunc(value / 60);
  const minutes = Math.trunc(value % 60);
  return (
    <p
      className={className}
    >{`${hours === 0 ? '' : hours + 'ч '}${minutes + 'м'}`}</p>
  );
};
export default Duration;
