import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {

    const [pizza, setPizza] = useState()

    const navigate = useNavigate()
    const {id} = useParams();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://63c8e85d320a0c4c953cd10d.mockapi.io/items/${id}`)
                setPizza(data);
            } catch (error) {
                alert("Ошибка при получении пиццы!")
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return (
            <div className="container">
                Загрузка...
            </div>
        )
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;