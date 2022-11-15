import { useState, useEffect } from 'react'
import Product from './components/Product'
import './App.css'

function App() {

  // localStorage.setItem('myCat', 'Tom');
  // localStorage.getItem('myCat');
  // localStorage.removeItem('myCat');
  // localStorage.clear();

  const PRODUCT_INITIAL = { id: null };

  const [isLoading, setLoading] = useState(false)
  const [query, setQuery] = useState(null)
  const [product, setProduct] = useState(PRODUCT_INITIAL)

  function getData() {

    if (!query) {
      setProduct(PRODUCT_INITIAL);
      setLoading(false);

      return;
    }

    setLoading(true);

    fetch(`https://ranekapi.origamid.dev/json/api/produto/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);

        setLoading(false);
        setProduct(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function loadProduct(product) {

    localStorage.setItem('FetchProduct', product);

    setQuery(product)
  }

  useEffect(() => {

    const productFromStorage = localStorage.getItem('FetchProduct');

    if (productFromStorage)
      setQuery(productFromStorage)

  }, [])

  useEffect(() => {

    const fetchData = async () => {
      return await getData();
    }

    fetchData();
  }, [query])

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => loadProduct('tablet')}>
          Tablet
        </button>
        <button onClick={() => loadProduct('smartphone')}>
          Smartphone
        </button>
        <button onClick={() => loadProduct('notebook')}>
          Notebook
        </button>
        <button onClick={() => loadProduct(null)}>
          X
        </button>
      </div>

      <main>
        {
          isLoading ? <p>Carregando...</p> : null
        }
        {
          (!isLoading && !product.id) ?
            <h1>Ready to fetch something</h1>
            : null}
        {
          (!isLoading && product.id) ?
            <Product product={product} />
            : null
        }
      </main>
    </div>
  )
}

export default App
