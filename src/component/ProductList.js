import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { useDispatch } from 'react-redux';
import { selectProduct, goProduct, reset } from '../redux/view';

export default function ProductList() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

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

    const filteredProducts = products.filter(product =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getProductsForPage = () => {
        const startIndex = (page - 1) * 9;
        const endIndex = startIndex + 9;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };


    const splitProductsIntoRows = (products) => {
        const rows = [];
        for (let i = 0; i < products.length; i += 3) {
            rows.push(products.slice(i, i + 3));
        }
        return rows;
    };

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
                    {splitProductsIntoRows(getProductsForPage()).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map(product => (
                                <td key={product._id}>
                                    <div>
                                        <p>{product.description}</p>
                                        <p>{product.price.toString()}</p>
                                        <p>{product.score.toString()}</p>
                                        <Button variant="outlined" onClick={() => handleValidation(product)}>
                                            Voir le produit
                                        </Button>
                                    </div>
                                </td>
                            ))}

                            {row.length < 3 && (
                                <React.Fragment>
                                    {Array.from({ length: 3 - row.length }, (_, index) => (
                                        <td key={`empty_${index}`} />
                                    ))}
                                </React.Fragment>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                count={Math.ceil(filteredProducts.length / 9)}
                page={page}
                color="primary"
                onChange={handleChangePage}
            />
        </div>
    );
}
