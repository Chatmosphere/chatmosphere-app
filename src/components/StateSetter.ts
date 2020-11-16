import React, { useState, useContext, useEffect, useCallback, Dispatch, SetStateAction } from "react"
import {omit,merge} from "lodash";

type IDynamicKeyValue<T> = {
  [key in keyof T]: IDynamicKeyValue<ValueOf<T>> | IDynamicKeyValue<ValueOf<T>>[]
}
type IDynamicObject<T> = {
  [key in keyof T]: IDynamicObject<ValueOf<T>> | IDynamicKeyValue<ValueOf<T>> | IDynamicKeyValue<ValueOf<T>>[]
}

type ValueOf<T> = T[keyof T]

type IDynamicValueSetter<T> = {
  set: (newValue: SetStateAction<T>) => void // | ( ((val: T) => T) => void )
  setKey: (key: string, value: ValueOf<T>) => void
}
type IKeyValue<T> = {
  [key in keyof T]: IDynamicObjectSetter<ValueOf<T>>
}

type IDynamicKeyValueSetter<T extends Object> = {
  [key in keyof T]: IDynamicObjectSetter<T[key]>
} & T
/* {
  set: (newValue: ValueOf<T>) => void
  // setKey: (key: keyof T, value: ValueOf<T>) => void
  setKey: (key: string, value: ValueOf<T>) => void
} */

type PrimitiveValueSetter<T> = IDynamicValueSetter<T>
type ObjectValueSetter<T extends Object> = T & IDynamicObjectSetter<T>

type IDynamicObjectSetter<T extends Object> = IDynamicValueSetter<T> & IDynamicKeyValueSetter<T>

type IDynamicValueOrSetter<T> = IDynamicKeyValueSetter<T> | IDynamicObjectSetter<T>

// type extractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never

export default function createStateSetter<T extends Object>(
  props: [T, Dispatch<SetStateAction<T>>]
): [T, IDynamicObjectSetter<T>/* , Dispatch<SetStateAction<T>> */] {
  let circularReferenceChecker = new Set<object>()
  let newState=props[0], newStateSetter, setState=props[1]
  //  let newSetState=props[1]
  const changedCallback= (newValue: T)=>{

    circularReferenceChecker.clear()
    newState = newValue
    props[1]((prevState)=>{
      let returnedSetter = createStateSetterReqursive(newValue, changedCallback,circularReferenceChecker)
      newState = returnedSetter[0]
      console.log("StateSetter changedCallback store:",{prevState,newState,newValue})
      newStateSetter = returnedSetter[1]
      return newValue
    })
  }
  let returnedSetter = createStateSetterReqursive(newState, changedCallback,circularReferenceChecker)
  newState = returnedSetter[0]
  newStateSetter = returnedSetter[1]
  /* newSetState = ((callBack:(x: T) => T) => {
    props[1]((prevState:T)=>{
      const newState=callBack(prevState)
      console.log("StateSetter setState store:",{prevState,newState})
      changedCallback(newState)
      return newState
    })
  }) as Dispatch<SetStateAction<T>> */
  // console.log("circularReferenceChecker:",circularReferenceChecker)
  circularReferenceChecker.clear()
  return [newState, newStateSetter]//, newSetState]
}

function createStateSetterReqursive<T extends Object>(
  val: T,
  changedCallback: (newValue: T) => void, circularReferenceChecker:Set<object>
): [T, IDynamicObjectSetter<T>] {
  let newState = val

  let stateSetter: any = {
    // ...newState,
    setKey: (key: string, value: ValueOf<T>) => {
      newState = { ...newState, [key]: value }
      changedCallback(newState)
    },
    set: (newValue: T | ((stateValue: T) => T)) => {
      const setStateAction = newValue as ((stateValue: T) => T)
      if (setStateAction && typeof setStateAction==="function") {
        newState = setStateAction({ ...newState })
      } else {
        const tValue = newValue as T
        if (tValue) {
          newState = { ...tValue }
        }
      }
      changedCallback(newState)
    }
  }
  if(val!==undefined&&val!==null && !circularReferenceChecker.has(val))
  {
    circularReferenceChecker.add(val)//check for circular referance

    Object.keys(val).forEach((key: string) => {
      const obj = val as any
      type valueType = typeof val
      let value = obj[key]
      // console.log("typeof value:",typeof value)
      if (!(typeof value === "object"||typeof value === "undefined")) {
        let [newPrimitiveValue, valuePrimitiveSetter] = createStateSetterPrimitive(value, (newValue) => {
          newState = { ...newState, [key]: newValue }
          stateSetter[key] = valuePrimitiveSetter
          changedCallback(newState)
        })
        stateSetter[key] = valuePrimitiveSetter
      } /*   if (Array.isArray(val)) {
        let valueSetter: IDynamicValueOrSetter<T> = {...newState,
          set: (newValue: T) => {
            newState = newValue
            changedCallback && changedCallback(newState)
          }
        }
        return [newState, valueSetter]
      }else */ else {
        let [newValue, valueSetter] = createStateSetterReqursive(value, (newValue: valueType) => {
        newState = { ...newState, [key]: newValue }
        stateSetter[key] = valueSetter // gives error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'IDynamicObjectSetter<T>'. No index signature with a parameter of type 'string' was found on type 'IDynamicObjectSetter<T>'.ts(7053)
        changedCallback(newState)
      },circularReferenceChecker)
      stateSetter[key] = valueSetter
    }
    // stateSetter[key] = valueSetter

    /* type valuetype = typeof value
        stateSetter[key] = valueSetter
        stateSetter[key] = {
          ...newValue,
          set: (newValue: valuetype) => {
            newState = { ...newState, [key]: newValue }
          }
        } */
  })
}

  return [newState, stateSetter as IDynamicObjectSetter<T>]
}

function createStateSetterPrimitive<T extends string | number | boolean>(
  val: T,
  changedCallback: (newValue: T) => void
): [T, IDynamicValueSetter<T>] {
  let newState = val
  let valueSetter: IDynamicValueSetter<T> = {
    set: (newValue: T | ((stateValue: T) => T)) => {
      if (typeof newValue === "function") {
        newState = newValue(newState)
      } else {
        newState = newValue
      }
      changedCallback(newState)
    },

    setKey: (key: string, value: ValueOf<T>) => {}
  }
  return [newState, valueSetter]
}
