import React,{useCallback, useContext} from "react";
import styles from './Alert.module.scss'
import { ContextApp } from "../Reducers/CleanReducer";


const Alert = ()=>{
    const {setIsActiveAlert, DeleteId, isResult,setIsResult} = useContext(ContextApp)
    
    const handleDelete= useCallback(() => {
        const result=isResult.condition.filter(i => i.id !== DeleteId.condition)
        setIsResult({type:'setResult', array: result})
        setIsActiveAlert({type:'off'})
        console.log(result)
    },[setIsResult, isResult, DeleteId, setIsActiveAlert])

    return(
        <>
            <div className={styles.alert__place}>
                <div className={styles.alert__box}>
                    <div className={styles.alert__warning}>
                        <h2 className={styles.alert__warning_text}>Вы уверены, что хотите удалить пользователя?</h2>
                    </div>
                    <div className={styles.alert__flex}>
                        <button className={styles.alert__flex_button} 
                                onClick={handleDelete}>Да</button>
                        <button className={styles.alert__flex_button}
                                onClick={()=>{setIsActiveAlert({type:'off'})}}>Нет</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Alert