import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);


  return (
    <main>
      <div className="container">
        <div>
          <input 
            type="text"
            value={inputValue} 
            onChange={(e) => e.target.value}
          />
        </div>
      </div>
      
    </main>
  )
}

export default App
