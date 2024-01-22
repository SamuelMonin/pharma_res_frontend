import React from 'react';
import {Component, useEffect, useState} from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux'
import { selectProduct, goProduct, reset } from '../redux/login'



export default function ProductList() {

    const dispatch = useDispatch()


    const[products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5501/api/products')
          .then(response => {
            console.log(response.data);
            response.data.forEach(product => {
              console.log("Nom du produit :", product.description);
              console.log("Prix du produit :", product.prix);

            });
            setProducts(response.data);
          })    
          .catch(err => console.log(err));
      }, []);

    const handleValidation = (product) => {

        dispatch(selectProduct(product))
        dispatch(reset())
        dispatch(goProduct())
    };


    return(
        <div>
        <h1>Les produits</h1>
          <table>
            <thead>
              <tr>
                <th>
                    Description
                </th>
                <th>
                    Price
                </th>
                <th>
                    Score
                </th>
              </tr>
            </thead>

            <tbody>
            
            {products.map(product => (
            <tr key={product._id}>
                <td>{product.description}</td>
                <td>{product.price.toString()}</td>
                <td>{product.score.toString()}</td>
                {console.log(product)}
                <Button variant="outlined" onClick={() => handleValidation(product)}>
                    Voir le produit
                </Button>

            </tr>
            
            ))}

            </tbody>
          </table>

          <Pagination count={10} color="primary" />

        </div>
      )
}