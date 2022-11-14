import { useState, useEffect } from 'react'
import './App.css'

function App() {

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

  useEffect(() => {

    const fetchData = async () => {
      return await getData();
    }

    fetchData();
  }, [query])

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => setQuery('tablet')}>
          Tablet
        </button>
        <button onClick={() => setQuery('smartphone')}>
          Smartphone
        </button>
        <button onClick={() => setQuery('notebook')}>
          Notebook
        </button>
        <button onClick={() => setQuery(null)}>
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
            <>
              <h1><strong>{product.nome}</strong></h1>
              <h3>R$ {product.preco}</h3>
              <p>{product.descricao}</p>
              <p>Status: {product.vendido ? 'Vendido' : 'Disponível'}</p>
              <img src={product.fotos[0].src} alt="" />
            </>
            : null
        }
      </main>
    </div>
  )
}

export default App
