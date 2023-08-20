import SingleItem from './SingleItem';
import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';

const Items = () => {

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['tasks'], 
    // queryFn: () => customFetch.get('/') --> to avoid data.data.taskList, use async
    queryFn: async() => {
      const { data } = await customFetch.get('/')
      return data;
    }
  });
  
  if(isLoading) {
    return <p>Loading...</p>
  }

  // if(isError) {
  //   return <p>There was an error...</p> 
  // }

    if(error) {
    return <p>{error.response.data}</p> //prints error message from axios
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
