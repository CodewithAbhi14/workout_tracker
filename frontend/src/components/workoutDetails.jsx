import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext";


const workoutDetails = ({workout}) => {

    const { dispatch } = useWorkoutContext();
    const {user} = useAuthContext();

    const handleClick = async () => {
      if(!user){
        return;
      }
      try {
        const res = await fetch('/api/workouts/' + workout._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
    
        if (res.ok) {
          dispatch({ type: 'DELETE_WORKOUT', payload: workout._id }); 
          console.log('Workout deleted successfully');
        } else {
          console.error('Failed to delete workout');
        }
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    };
    

  return (
    <div key={workout._id} className='bg-white p-5 m-5 rounded-lg shadow-lg flex justify-between items-center '>
             <div> <h2 className="text-md font-bold text-green-600">{workout.title}</h2>
             <p><strong>Catagory :</strong>{workout.catagory}</p>
            <p><strong>Weights(kg) :</strong> {workout.weigths}</p>
            <p><strong>Sets :</strong> {workout.sets}</p>
            <p><strong>Reps :</strong> {workout.reps}</p>
            <p className="text-xs text-gray-500">{new Date(workout.createdAt).toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
})}</p></div>
<span onClick={handleClick} className="rounded-lg bg-red-500 text-white px-2 py-1 cursor-pointer w-100">Delete</span>
        </div>
  )
}

export default workoutDetails