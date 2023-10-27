import React, { useState } from 'react';
import { Navbar, Container, Card, Row, Col, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const products = [
  { id: 1, name: 'Product 1', price: 10, category: 'Category A', description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', price: 20, category: 'Category B', description: 'Description for Product 2' },
 
];

function App() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('all'); 
  const [sort, setSort] = useState('none'); 

 
  function addToCart(product) {
    setCart([...cart, product]);
  }

  
  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  
  function handleSortChange(event) {
    setSort(event.target.value);
  }

 
  const filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter);

  
  const sortedProducts = sort === 'none'
    ? filteredProducts
    : filteredProducts.slice().sort((a, b) => {
        if (sort === 'priceLowToHigh') {
          return a.price - b.price;
        } else if (sort === 'priceHighToLow') {
          return b.price - a.price;
        } else if (sort === 'nameAtoZ') {
          return a.name.localeCompare(b.name);
        } else if (sort === 'nameZtoA') {
          return b.name.localeCompare(a.name);
        }
        return 0;
      });

  return (
    <div>
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#">Product Catalog</Navbar.Brand>
          <Navbar.Text className="ml-auto">
            Cart: {cart.length} items
          </Navbar.Text>
        </Container>
      </Navbar>

     
      <Container className="mt-3">
        <Row>
          <Col md={6}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="filter-dropdown">
                Filter by Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilter('all')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter('Category A')}>Category A</Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter('Category B')}>Category B</Dropdown.Item>
                {/* Add more categories as needed */}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={6}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="sort-dropdown">
                Sort by
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSort('none')}>None</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort('priceLowToHigh')}>Price (Low to High)</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort('priceHighToLow')}>Price (High to Low)</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort('nameAtoZ')}>Name (A to Z)</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort('nameZtoA')}>Name (Z to A)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      
      <Container className="mt-3">
        <Row>
          {sortedProducts.map((product) => (
            <Col key={product.id} sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Img variant="top" src="product-image.jpg" alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text className="text-primary">${product.price}</Card.Text>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)} 
                  >
                    Add to Cart
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;