import React from 'react';
import { render } from 'react-dom';
import Carousel from "./components/Carousel/Carousel"


render(<Carousel infinite={false} min_distance={50} side_control_distance={30}/>,document.getElementById('root'));