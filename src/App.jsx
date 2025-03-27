import { useState, useEffect, useCallback } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);

  // utility function debounce (npm loadash)
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

  // BONUS (ultima parte aggiunta con correzione)
  const handleClick = async(id) => {
    try {
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products/${id}`);
      const obj = await response.json();      
      setDetails(obj);
    } catch(err) {
      console.error(err);
    } finally {
      setShow(false);
    }
  }

  
  return (
    <main>
      <div className="container">
        <section>
          <div>
            <input 
              type="text"
              placeholder="Cerca un prodotto"
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </section>

        <section>
          {show && (
            <div>
              {products.length > 0 && (products.map(p => (
                <div key={p.id}>
                  <h3
                    value={details}
                    onClick={() => handleClick(p.id)}
                  >
                    {p.name}
                  </h3>
                </div>
                )))}
            </div>
          )}
          {details && (
            <div key={details.id}>
              <img src={details.image} alt={details.name} />
              <h2>{details.name}</h2>
              <p>{details.description}</p>
              <p>{details.price}€</p>
            </div>
          )}
        </section>
      </div>
      
    </main>
  )
}

export default App
