import {useState, useEffect} from 'react';
import MealItem from "./MealItem";


const Loading = ()=>{
  return <p style={{textAlign:'center', fontSize:'1.5rem'}}>Loading ...</p>
}

const MenuList = (props) => {
  const [isLoading , setIsLoading] = useState(true);
  const [hasError , setHasError] = useState(null);
  const [list,setList] = useState([]);

  useEffect(()=>{

      const mealListApi = async function(){
        const response = await fetch('https://food-order-app-e3eaa-default-rtdb.firebaseio.com/meals.json');
       
        if(!response.ok){
          
          throw new Error('something went wrong');
        } 
       
        const data = await  response.json(); 
        const loadedList = [];
          for(let key in data){
            
            loadedList.push({
              id: key,
              name : data[key].name,
              description: data[key].description,
              price: data[key].price
            })
        
          }
        setList(loadedList)
        setIsLoading(false);
        
          
         }

       
          mealListApi().catch(error => {
          setIsLoading(false)
          setHasError(error.message);
        })
          
        
         
  },[])


  return (
  <>
  { isLoading ? <Loading/> : 
    <ul>
      {list.map((l) => (
        <MealItem id={l.id} key={l.id} name={l.name} description={l.description} price={l.price}/>
      ))}  
      {hasError && <p>somthing went wrong {hasError}</p>}
    </ul>
}
    </>
    
 
  );
};

export default MenuList;
