import { useState, useEffect, useCallback } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  // utility function debounce
  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay)
    }
  }

  const getProducts = useCallback(
    // async va all'interno degli argomenti del debounce
    debounce(async(value) => {
        if(value.trim() !== "") {
          try {
            const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${value}`);
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
    }, 300), []
  );

  useEffect(() => {
    // in fase invocativa gli passo i valori specifici
    getProducts(inputValue);
  // nell'array di dipendenze si passa anche la funzione getProducts perchè se questa cambia, useEffect lo deve sapere
  }, [inputValue, getProducts]);

  
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
