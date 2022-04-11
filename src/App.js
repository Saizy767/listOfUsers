import React, { useReducer, useState , useEffect} from "react";
import styles from './App.module.scss'
import Input from './components/Input/Input.jsx'
import Table from "./components/Table/Table.jsx";
import { ContextApp, initialState, reducer } from "./components/Reducers/CleanReducer.jsx";
import {initialStateResult, reducerResult} from "./components/Reducers/ResultReducer.jsx"
import {initialStateRating, reducerRating} from "./components/Reducers/RatingReducer.jsx"
import {initialStateReg, reducerReg} from "./components/Reducers/DataRegistrationReducer.jsx"
import {initialStateAlert, reducerAlert} from "./components/Reducers/AlertReducer.jsx"
import {initialStateDelete, reducerDelete} from "./components/Reducers/DeleteReducer";
import {initialStateStart, reducerStart } from "./components/Reducers/StartReducer";
import {initialStateEnd, reducerEnd } from "./components/Reducers/EndReducer";
import {initialStatePage, reducerPage} from './components/Reducers/PageReducer'
import Alert from "./components/Alert/Alert";
//import { data } from "./components/data";


const App = () => {
  const [isUser, setIsUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClean, setIsClean] = useReducer(reducer, initialState)
  const [isResult, setIsResult] = useReducer(reducerResult, initialStateResult)
  const [isRating, setIsRating] = useReducer(reducerRating, initialStateRating)
  const [isDataRegistrate, setIsDataRegistrate] = useReducer(reducerReg, initialStateReg)
  const [isActiveAlert, setIsActiveAlert] = useReducer(reducerAlert, initialStateAlert)
  const [DeleteId, setDeleteId] = useReducer (reducerDelete, initialStateDelete)
  const [isStart, setIsStart] = useReducer (reducerStart, initialStateStart)
  const [isEnd, setIsEnd] = useReducer(reducerEnd, initialStateEnd)
  const [isPage, setIsPage] = useReducer(reducerPage, initialStatePage)

  let counter = Math.ceil(isResult.condition.length / 5)

  const fetchUsers = async () =>{
    const temp = await fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users')
        .then((res)=>res.json())
    setIsUser(temp)
    setIsResult({type:'setResult', array: temp})
    setIsLoading(false)
  }

  useEffect(()=>{
      fetchUsers()
      //setIsResult({type:'setResult', array: data})
  },[])

  useEffect(()=>{
      setIsStart({type:'setStart', start:(isPage.condition-1)*5})
      setIsEnd({type:'setEnd', end:(isPage.condition)*5})
  },[isPage.condition])

  return (
    <ContextApp.Provider value={{isClean, setIsClean,
      isResult, setIsResult,
      isRating, setIsRating,
      isDataRegistrate, setIsDataRegistrate,
      isActiveAlert, setIsActiveAlert,
      DeleteId, setDeleteId,
      isStart, setIsStart,
      isEnd, setIsEnd,
      isPage, setIsPage,
     }}>
      <main style={{filter: isActiveAlert.condition ? 'blur(1px)' : 'none',
                    overflow: window.innerWidth<600? 'hidden' : 'none'}}>
        <div className={styles.header}>
          <div>
            <h1>Список пользователей</h1>
          </div>
        </div>
          <Input isUser={isUser}/>
          <Table isLoading={isLoading}/>
          <div className={styles.pagination}>
            {[...Array(counter)].map((value, index)=>{
              index+=1
              return(
                <button className={styles.pagination__page}
                        key={index}
                        onClick={()=>setIsPage({type:'setPage',page: index})}
                        style={{backgroundColor: index===isPage.condition ? '#0CB4F1': '#ECEFF0'}}>{index}</button>
              )
            })}
          </div>
      </main>
      {isActiveAlert.condition && <Alert/>}
    </ContextApp.Provider>
  );
}

export default App
