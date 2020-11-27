import React from 'react';
import { render } from 'react-dom';
import Carousel from "./components/Carousel/Carousel"


render(<Carousel infinite={false} min_distance={50} />,document.getElementById('root'));