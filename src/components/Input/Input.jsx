import React,{useCallback, useContext, useState} from "react";
import styles from './Input.module.scss'
import SearchLogo from './icon/search.svg'
import CleanLogo from './icon/clean.svg'
import { ContextApp } from "../Reducers/CleanReducer.jsx";

const Input = (props)=>{
    const {isClean, setIsClean, setIsResult, setIsRating, setIsDataRegistrate, setIsPage} = useContext(ContextApp) 
    const [isText, setIsText] = useState('')
    
    const handlerClickOn = useCallback(()=>{
        setIsClean({type: 'on'})
        const newFilter = props.isUser.filter((value) => {
            if (value.username.toLowerCase().includes(isText.toLowerCase())){
                return value
            }
            else if (value.email.toLowerCase().includes(isText.toLowerCase())){
                return value
            }
            else{
                return ''
            }
        })
        if (isText === ""){
            setIsResult({type:'setResult',array: props.isUser})
        } else{
            setIsResult({type:'setResult',array:newFilter})
        }

    },[isText,setIsClean, props.isUser,setIsResult])

    const handlerClickOff = useCallback(() =>{
        setIsClean({type: 'off'})
        setIsRating({type: 'off'})
        setIsPage({type:'setPage', page:1})
        setIsDataRegistrate({type: 'off'})
        setIsText('')
        
    },[setIsClean,setIsDataRegistrate,setIsRating, setIsPage])

    const handlerKeyPress = useCallback((target)=>{
        if (target.charCode === 13){
            setIsClean({type: 'on'})
            const newFilter = props.isUser.filter((value) => {
                if (value.username.toLowerCase().includes(isText.toLowerCase())){
                    return value
                }
                else if (value.email.toLowerCase().includes(isText.toLowerCase())){
                    return value
                }
                else{
                    return ''
                }
            })
            if (isText === ""){
                setIsResult({type:'setResult',array: props.isUser})
            } else{
                setIsResult({type:'setResult',array:newFilter})
            }
            setIsClean({type: 'on'})
            console.log(isText)
            console.log(newFilter)

        }
    },[isText, setIsClean,setIsResult,props.isUser])

    return (
        <div className={styles.input}>
          <div className={styles.input__place}>
            <div className={styles.input__box}>
                <img src={SearchLogo} alt='search logo' className={styles.input__logo} onClick={handlerClickOn}/>
                <input className={styles.input__search} placeholder={'Поиск по имени или по e-mail'}
                                                        value={isText}
                                                        onChange={(e)=>{setIsText(e.target.value)}}
                                                        onKeyPress={(e)=>{handlerKeyPress(e)}}></input>
            </div>
            {isClean.condition && 
            <div className={styles.clear} onClick={handlerClickOff}>
                <div className={styles.clear__box}>
                    <img src={CleanLogo} alt='clear logo' className={styles.clear__logo}/>
                </div>
                <span className={styles.clear__text}>Очистить фильтр</span>
            </div>}
          </div>
        </div>
    )
}

export default Input