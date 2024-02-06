import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { useDispatch } from 'react-redux';
import { selectProduct, goProduct, reset } from '../redux/login';

export default function ProductList() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5501/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleValidation = (product) => {
        dispatch(selectProduct(product));
        dispatch(reset());
        dispatch(goProduct());
    };

    // Fonction de filtrage des produits en fonction du terme de recherche
    const filteredProducts = products.filter(product =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Les produits</h1>
            <TextField
                id="outlined-basic"
                label="Rechercher un produit"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product.description}</td>
                            <td>{product.price.toString()}</td>
                            <td>{product.score.toString()}</td>
                            <td>
                                <Button variant="outlined" onClick={() => handleValidation(product)}>
                                    Voir le produit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={10} color="primary" />
        </div>
    );
}
