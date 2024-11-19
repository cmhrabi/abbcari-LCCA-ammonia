import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import homeBg from '../assets/home_bg.png';
import Text from '../design/Text/Text';
import { useNavigate } from 'react-router-dom';
import Button from '../design/Button/Button';
import TitleSlide from '../components/HomeSlides/TitleSlide';
import VisualizeSlide from '../components/HomeSlides/VisualizeSlide';
import AboutSlide from '../components/HomeSlides/AboutSlide';
import ClimateFactsSlide from '../components/HomeSlides/ClimateFactsSlide';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='overflow-visible'>
            <NavBar title="LCCA" type='home' />
            <TitleSlide/>
            <VisualizeSlide/>
            <AboutSlide/>
            <ClimateFactsSlide/>
        </div>
    );
}

export default Home;