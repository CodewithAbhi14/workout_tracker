import React from 'react'
import { useAuthContext } from './useAuthContext'
import { useWorkoutContext } from './useWorkoutContext'

const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch: workoutDispatch} = useWorkoutContext()

    const logout = () => {
        localStorage.removeItem('user')
  dispatch({type: 'LOGOUT'})
  workoutDispatch({type: 'SET_WORKOUTS', payload: null})

    }   
    return {logout}
  
}

export default useLogout