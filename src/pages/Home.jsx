import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {SearchContext} from "../App";

const Home = () => {

    const {searchValue} = useContext(SearchContext);
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности (DESC)',
        sortProperty: 'rating'
    })

    useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        fetch(`https://63c8e85d320a0c4c953cd10d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`).then((res) => {
            return res.json()
        }).then((josn) => {
            setItems(josn)
            setIsLoading(false)
        });
        window.scrollTo(0,0)
    }, [categoryId, sortType])

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizza = items.filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        } else{
            return false
        }
    }).map((pizza) =>
        <PizzaBlock
            key={pizza.id}
            imageUrl={pizza.imageUrl}
            title={pizza.title}
            price={pizza.price}
            sizes={pizza.sizes}
            types={pizza.types}
        />
    )

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)}/>
                <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeleton
                    : pizza
                }
            </div>
        </div>
    );
};

export default Home;