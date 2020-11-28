import React from 'react';
import { render } from 'react-dom';
import Carousel from "./components/Carousel/Carousel"


render(<Carousel infinite={false} min_distance={50} side_control_distance={100}/>,document.getElementById('root'));