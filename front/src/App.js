import React from 'react';
import helloworld from './services/helloworld';
import { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState('')

  useEffect(() => {
    helloworld
      .helloWorld()
      .then(response => {
        setMessage(response.data)
      })
  }, [])

  return (
    <div>
      {message}
    </div>
  );
}

export default App;
