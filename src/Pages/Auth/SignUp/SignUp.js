import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Learner from './Learner/Learner';
import Rider from './Rider/Rider';
import "./SignUp.css";

const SignUp = () => {
    const [active, setActive] = useState('rider');

    return (
        <div className='auth-container container'>
            <ButtonGroup size="md" className="mb-2">
                <Button variant='success' onClick={() =>{setActive('rider')}}>Join as A Rider</Button>
                <Button variant='success' onClick={() => {setActive('learner')}}>Join as a Driving Learner</Button>
            </ButtonGroup>
            {active === 'rider' && <Rider/>}
            {active === 'learner' && <Learner/>}
        </div>
    );
};

export default SignUp;