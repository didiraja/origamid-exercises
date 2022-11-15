const Product = ({ product }) => {

  return (
    <>
      <h1><strong>{product.nome}</strong></h1>
      <h3>R$ {product.preco}</h3>
      <p>{product.descricao}</p>
      <p>Status: {product.vendido ? 'Vendido' : 'Disponível'}</p>
      <img src={product.fotos[0].src} alt="" />
    </>
  )
}

export default Product