import React from 'react';
import Text from '../../design/Text/Text';

interface ClimateFactsSlideProps {
}

const ClimateFactsSlide: React.FC<ClimateFactsSlideProps> = () => {
    return (
        <div className='bg-grey-bg'>
            <div className='py-16 max-w-6xl m-auto flex justify-center'>
                <table className='w-full'>
                    <tbody>
                        <tr>
                            <td className='border-r border-[#A0A0A0] justify-items-center'>
                                <div className='w-3/5'>
                                    <Text textSize='h1' color='secondary' align='center'>1.3%</Text>
                                    <Text textSize='sub2' align='center'>Of global carbon emissions are from ammonia production</Text>
                                </div>
                            </td>
                            <td className='justify-items-center'>
                                <div className='w-3/5'>
                                    <Text textSize='h1' color='secondary' align='center'>565 million</Text>
                                    <Text textSize='sub2' align='center'>Metric tons of CO2 produced by Canada in 2018</Text>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClimateFactsSlide;