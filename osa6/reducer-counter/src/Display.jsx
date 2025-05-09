import CounterContext, { useCounterValue } from './CounterContext';

const Display = () => {
  const value = useCounterValue()
  return <div>{value}</div>;
};

export default Display