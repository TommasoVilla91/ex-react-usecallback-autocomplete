import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  const getProducts = async() => {
    if(inputValue.trim() !== "") {
      try {
        const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${inputValue}`);
        const [obj] = await response.json();
        setProducts([...products, obj]);
      } catch(err) {
        console.error(err);
      } finally {
        setShow(true);
      }
    } else {
      setShow(false)
    }
  }

  useEffect(() => {
    getProducts();
  }, [inputValue])

  
  return (
    <main>
      <div className="container">
        <section>
          <div>
            <input 
              type="text"
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </section>

        <section>
          <div>
            {show && (
              <details>
                <summary>Prodotti</summary>
                {products.map((p, i) => (
                  <div key={i}>
                    <h3>{p.name}</h3>
                  </div>
                ))}
              </details>
            )}
          </div>
        </section>
      </div>
      
    </main>
  )
}

export default App
