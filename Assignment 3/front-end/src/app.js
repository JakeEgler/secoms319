import { useState, useEffect } from "react";

function App() {
    const [product, setProduct1] = useState([]);
    const [viewer1, setViewer1] = useState(false);
    const showAllItems = product.map((el) => (
        <div key={el._id}>
            <img src={el.image} width={30} /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rate: {el.rating.rate} and Count: {el.rating.count} <br />
        </div>
    ));


    return (
        <div>
            <button onClick={() => getAllProducts()}>Show All Products</button>
            
            <hr></hr>
            {viewer1 && <div>Products {showAllItems}</div>}
        </div>
    )
}

function getAllProducts() {
    fetch("http://localhost:3000")
        .then((response) => response.json())
        .then((data) => {
            console.log("Show Catalog of Products :");
            console.log(data);
            setProduct(data);
        });
    setViewer1(!viewer1);
}

export default App;