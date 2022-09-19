import { useEffect, useState } from "react";

export const TestComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  return (<>Test React Component, Counter: {count}</>);
}
