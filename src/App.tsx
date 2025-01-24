import { useEffect } from "react";

function App() {
  useEffect(() => {
    const test = async () => {
      const response = await fetch('http://localhost:3000/tasks')
      const data = await response.json();
      console.log(data);
    }

    test();
  }, [])

  return <h1 className="p-4 text-3xl text-blue-600">This is a title</h1>;
}

export default App;
