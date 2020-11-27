import React from "react";
import './carousel.css'
import images from './data'

export default class Carousel extends React.Component{


    constructor(props) {
        super(props);

        this.state = {
            currentSlide: 0,
            data: images, // Fetch smth from API
            infinite: this.props.infinite, // Set to true if u want infinite scrolling
            min_distance: this.props.min_distance
        };

        this.nextSlide = this.nextSlide.bind(this)
        this.prevSlide = this.prevSlide.bind(this)
        this.goToSlide = this.goToSlide.bind(this)
        this.rotateImages = this.rotateImages.bind(this)
    }

    prevSlide() {
        let index = this.state.currentSlide;
        let len = this.state.data.length

        if(index < 1 && this.state.infinite) {
            index = len - 1
        } else if(index >= 1) {
            index--;
        }

        this.setState({
            currentSlide: index
        })
        
        this.rotateImages(index)
    }

    nextSlide() {
        let index = this.state.currentSlide;
        let len = this.state.data.length

        if(index === len - 1 && this.state.infinite) {
            index = 0
        } else if(index < len - 1) {
            index++;
        }
        this.setState({
            currentSlide: index
        })
        this.rotateImages(index)
    }

    goToSlide(index) {
        this.setState({
            currentSlide: index
        })
        this.rotateImages(index)
    }

    setClass(index) {
        if(index === this.state.currentSlide) {
            return("carousel-item active")
        }
        return("carousel-item inactive")
    }

    rotateImages(index) {
        let imgs = document.querySelectorAll('.carousel-item')

        let width = imgs[0].clientWidth
        imgs.forEach(img => {
            img.style.transform = `translateX(${-1 * width * index}px)`
        })
    }

    trackSwipe(node) {
        let min_distance = this.state.min_distance; // minimal distance for swipes
        let swipe_start = {
            x: 0,
            y: 0
        }

        let swipe_end = new Object

        node.addEventListener('touchstart',e => {
            swipe_start.x = e.touches[0].clientX
            swipe_start.y = e.touches[0].clienty
        })

        node.addEventListener('touchmove',e => {
            swipe_end.x = e.touches[0].clientX
            swipe_end.Y = e.touches[0].clientY
        })

        node.addEventListener('touchend',e => {      
            if(swipe_end.x - swipe_start.x > min_distance) {
                this.prevSlide()
            } else if(swipe_end.x - swipe_start.x < -1 * min_distance) {
                this.nextSlide()
            }
        })
        
    }

    componentDidMount() {
        let items = document.querySelectorAll('.carousel-item')
        items.forEach(item => this.trackSwipe(item))
    }

    render() {
        return (
            <>
                <div class="carousel-wrap">
                    <div class="carousel">
                        {this.state.data.map((src,index) => {
                            return(
                                <div class={this.setClass(index)} data-index={index}>
                                    <img src={src}></img>
                                    orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                     and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                     orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                     and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div class="carousel-nav">
                    <div class="carousel-dots">
                        {this.state.data.map((item,index) => {
                            return(
                                <div class={index === this.state.currentSlide ? 'dot active' : 'dot'}
                                    onClick={() => this.goToSlide(index)}>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}