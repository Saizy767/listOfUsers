import React, {useContext, useCallback, useState, useEffect} from "react";
import { ContextApp } from "../Reducers/CleanReducer";
import styles from './Table.module.scss'
import CancelIcon from './icon/cancel.svg'

const Table = () =>{
    const { setIsClean, isResult, setIsResult,isRating,
            isDataRegistrate, setIsDataRegistrate, setIsRating,
            setIsActiveAlert, setDeleteId, isStart, isEnd} = useContext(ContextApp)

    const [orderReg, setOrderReg] = useState("ASC")
    const [orderRating, setOrderRating] = useState("DSC") 
    const Result = isResult.condition
    const rating = isRating.condition
    const dataRegistrate = isDataRegistrate.condition
    
    useEffect(()=>{
        if (rating === false){
            setOrderRating("DSC")
        }
        if (dataRegistrate === false){
            setOrderReg("ASC")
        }},
        [rating,dataRegistrate])

    const handlerClickReg = useCallback((col)=>{
        setIsClean({type: 'on'})
        setIsRating({type:'off'})
        setIsDataRegistrate({type:'on'})
        if (orderReg === "ASC"){
            const sorted = [...Result].sort((a,b)=>{
                return a[col] < b[col] ? 1 : -1
            })
            setIsResult({type:'setResult', array:sorted})
            setOrderReg("DSC")
        }
        else if (orderReg === "DSC"){
            const sorted = [...Result].sort((a,b)=>{
                return a[col] > b[col] ? 1 : -1
            })
            setIsResult({type:'setResult', array:sorted})
            setOrderReg("ASC")
        }

    },[setIsClean, Result,setIsResult, setIsRating, setIsDataRegistrate, orderReg])

    const handlerClickRat = useCallback((col)=>{
        setIsClean({type: 'on'})
        setIsRating({type:'on'})
        setIsDataRegistrate({type:'off'})
        if (orderRating === "ASC"){
            const sorted = [...Result].sort((a,b)=>{
                return a[col] < b[col] ? 1 : -1
            })
            setIsResult({type:'setResult', array:sorted})
            setOrderRating("DSC")
        }
        else if (orderRating === "DSC"){
            const sorted = [...Result].sort((a,b)=>{
                return a[col] > b[col] ? 1 : -1
            })
            setIsResult({type:'setResult', array:sorted})
            setOrderRating("ASC")
        }
    },[setIsClean, Result,setIsResult, setIsRating, setIsDataRegistrate, orderRating])

    const handleClickDelete = useCallback((id) => {
        setIsActiveAlert({type:'on'})
        setDeleteId({type: 'setId', id:id})
    },[setIsActiveAlert, setDeleteId])
    return(
        <>
            <div className={styles.sort}>
                <span className={styles.sort__name}>Сортировка:</span>
                <button className={styles.sort__button} 
                        onClick={()=>handlerClickReg("registration_date")}
                        style={{
                            color: dataRegistrate ? '#333333' : '#9EAAB4',
                            borderBottomColor: dataRegistrate ? '#333333' : '#9EAAB4',
                        }}
                        >Дата регистрации</button>
                <button className={styles.sort__button} 
                        onClick={()=>handlerClickRat("rating")}
                        style={{
                            color: rating ? '#333333' : '#9EAAB4',
                            borderBottomColor: rating ? '#333333' : '#9EAAB4',
                        }}
                        >Рейтинг</button>
            </div>
            <div className={styles.sort__table}>
                <div className={styles.sort__row}>
                    <div className={styles.sort__row_box}>
                        <h3 className={styles.sort__row_example}>Имя пользователя</h3>
                    </div>
                    <div className={styles.sort__row_box}>
                        <h3 className={styles.sort__row_example}>E-mail</h3>
                    </div>
                    <div className={styles.sort__row_box}>
                        <h3 className={styles.sort__row_example}>Дата регистрации</h3>
                    </div>
                    <div className={styles.sort__row_box}>
                        <h3 className={styles.sort__row_example}>Рейтинг</h3>
                    </div>
                </div>
                {Result.slice(isStart.condition,isEnd.condition).map((el)=>{
                        return(
                            <div className={styles.sort__row} key={el.id}>
                                <div className={styles.sort__row_box}>
                                    <h3 className={styles.sort__row_username}>{el.username}</h3>
                                </div>
                                <div className={styles.sort__row_box}>
                                    <h3 className={styles.sort__row_text}>{el.email}</h3>
                                </div>
                                <div className={styles.sort__row_box}>
                                    <h3 className={styles.sort__row_text}>{(el.registration_date).slice(0,10)}</h3>
                                </div>
                                <div className={styles.sort__row_box}>
                                    <h3 className={styles.sort__row_text}>{el.rating}</h3>
                                    <div className={styles.sort__row_icon} onClick={()=>handleClickDelete(el.id)}>
                                        <img src={CancelIcon} alt='Cancel Icon'/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Table