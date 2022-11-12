
import MealItem from "./MealItem";

const list = [
  {
    id: "l1",
    name: "Sushi",
    description: "Finest fish and vegetables",
    price: 22.99,
  },
  {
    id: "l2",
    name: "Schnitzel",
    description: "A german specialty !",
    price: 16.5,
  },
  {
    id: "l3",
    name: "Barbecue Burger",
    description: "American raw , meaty",
    price: 12.99,
  },
  {
    id: "l4",
    name: "German Bowl",
    description: "Healty... and green...",
    price: 18.99,
  },
];

const MenuList = (props) => {
  
  

  return (
    <ul>
      {list.map((l) => (
        <MealItem id={l.id} key={l.id} name={l.name} description={l.description} price={l.price}/>
      ))}
    </ul>
  );
};

export default MenuList;
