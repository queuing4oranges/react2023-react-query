import SingleItem from './SingleItem';
import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';

const Items = ({ items }) => {

  const { isLoading, data } = useQuery({
    queryKey: ['tasks'], 
    queryFn: () => customFetch.get('/')
  });
  
  if(isLoading) {
    return <p>Loading...</p>
  }


  return (
    <div className='items'>
      {items.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
