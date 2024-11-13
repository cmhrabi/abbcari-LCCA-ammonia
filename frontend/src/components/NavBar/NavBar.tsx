import React from 'react';
import logo from '../../../public/logo.svg';
import Button from '../../design/Button/Button';
import Text from '../../design/Text/Text';
import { Bars3Icon } from '@heroicons/react/24/solid'

interface NavBarProps {
    title: string;
    type?: 'home' | 'default';
}

const NavBar: React.FC<NavBarProps> = ({ title, type = 'default' }) => {
    return (
        <nav className='flex flex-row justify-between items-center shadow-nav-bar py-2.5 px-9'>
            <div className='flex flex-row items-center'>
                <img src={logo} alt="logo" />
                <Text color='primary' textSize='nav-title' font='josefin'>{title}</Text>
                <div className='pl-6'>
                    {/* TODO: Change to text link */}
                    {type === 'home' && <Text textSize='sub2'>About</Text>}
                </div>
            </div>
            <div>
                {type === 'home' && 
                        <Button size='small'>Launch LCCA</Button>
                }{type === 'default' && 
                        /* TODO: Change to text link */
                        <div className='flex flex-row items-center space-x-3'>
                            <Text textSize='input'>Help</Text>
                            <Bars3Icon onClick={() => {}} className="size-6 cursor-pointer"/>
                        </div>
                }
            </div>
        </nav>
    );
};

export default NavBar;