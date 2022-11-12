import style from './Menu.module.css';
import MenuList from './MenuList';
const Menu = props =>{
    return (
        <div className={style.container}>
               <MenuList/>
        </div>
    )
}

export default Menu;