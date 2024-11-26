import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';


export default {
  title: 'Components/NavBar',
};

const NavBarDemo = () => {
  return (
    <BrowserRouter>
      <div className="grid grid-cols-1 gap-4 items-end">
          <NavBar title='LCCA' type='home'/>
          <NavBar title='LCCA'/>
      </div>
    </BrowserRouter>
  );
};

export const Variants = NavBarDemo.bind({});