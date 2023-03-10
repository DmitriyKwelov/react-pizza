import React, {FC, useCallback, useContext, useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import {useSelector} from "react-redux";
import {ISort, selectFilter, setCategoryId, setFilters} from "../redux/slices/filterSlice";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";
import {useAppDispatch} from "../redux/store";

const Home: FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {categoryId, sort, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const getPizzas = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        dispatch(
            fetchPizzas({
            order,
            sortBy,
            category
        })
        )
    }

    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //         })
    //
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [sort.sortProperty, categoryId])

    // useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1))
    //         let sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
    //         dispatch(
    //             setFilters({
    //                 categoryId: Number(params.categoryId),
    //                 sort: sort || sortList[0]
    //             })
    //         )
    //         isSearch.current = true
    //     }
    // }, [])
    useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, searchValue])

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //
    //     if (!isSearch.current) {
    //         getPizzas()
    //     }
    //
    //     isSearch.current = false
    // }, [categoryId, sort.sortProperty, searchValue])


    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const pizza = items.filter((obj: any) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        } else {
            return false
        }
    }).map((pizza: any) =>
            <PizzaBlock
                key={pizza.id}
                id={pizza.id}
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
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>?????????????????? ???????????? ????</h2>
                    <p>?? ??????????????????, ???? ?????????????? ???????????????? ??????????. ???????????????????? ?????????????????? ?????????????? ??????????.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading'
                        ? skeleton
                        : pizza
                    }
                </div>
            )}
        </div>
    );
};

export default Home;