import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';

const Form = () => {
  const [newItemName, setNewItemName] = useState('');
  const queryClient = useQueryClient();

  //destr - mutate comes from the axios obj.
  const { mutate:createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }), 
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['tasks']})  //invalidate = refetch data from the specified query or data source - here from the queryKey
      toast.success('task added')
      setNewItemName("")
    }, 
    onError: (error)=>{
      toast.error(error.response.data.msg)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        {/* disable button while it is submitting the task (so while loading) */}
        <button type='submit' className='btn' disabled={ isLoading }> 
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
