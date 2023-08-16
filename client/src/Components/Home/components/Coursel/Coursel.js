import React, { useState, useEffect, useRef, useCallback } from "react";

import "../Coursel/Coursel.css";

import { Container } from "react-bootstrap";

const cards = [
 { id: 1, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 2, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 3, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 4, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 5, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 6, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 7, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 8, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 9, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },
 { id: 10, image: "https://im.rediff.com/cricket/2020/oct/23dhoni2.jpg" },

];




const Coursel = () => {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [translateValue, setTranslateValue] = useState(0);



 const cardRef = useRef(null);
 const sliderRef = useRef(null);



 const cardWidth = useRef(0);
 const sliderWidth = useRef(0);



 useEffect(() => {
 if (cardRef.current) {
  cardWidth.current = cardRef.current.clientWidth;
 }



 if (sliderRef.current) {
  sliderWidth.current = sliderRef.current.clientWidth;
 }
 }, []);



 const visibleCards = Math.floor(sliderWidth.current / cardWidth.current);
 const lastIndex = cards.length - visibleCards;



 useEffect(() => {
 const interval = setInterval(() => {
  const shouldResetIndex = currentIndex === lastIndex;
  const index = shouldResetIndex ? 0 : currentIndex + 1;
  const translate = shouldResetIndex
   ? 0
   : translateValue - cardWidth.current;
  setCurrentIndex(index);
  setTranslateValue(translate);
 }, 1500);
 return () => clearInterval(interval);
 }, [currentIndex, translateValue, lastIndex]);



 const handlePrevClick = useCallback(() => {
 const shouldResetIndex = currentIndex === 0;
 const index = shouldResetIndex ? lastIndex : currentIndex - 1;
 const translate = shouldResetIndex
  ? -cardWidth.current * (lastIndex + 1) +
   cardWidth.current * (visibleCards - 1)
  : translateValue + cardWidth.current;
 setCurrentIndex(index);
 setTranslateValue(translate);
 }, [currentIndex, translateValue, lastIndex, visibleCards]);
 const handleNextClick = useCallback(() => {
 const shouldResetIndex = currentIndex === lastIndex;
 const index = shouldResetIndex ? 0 : currentIndex + 1;
 const translate = shouldResetIndex ? 0 : translateValue - cardWidth.current;
 setCurrentIndex(index);
 setTranslateValue(translate);
 }, [currentIndex, translateValue, lastIndex]);



 return (
 <Container>
  <h3>Sample Carousel</h3>
  <div className="slider-container">
   <div className="slider" ref={sliderRef}>
    <div
    className="cards-wrapper"
    style={{
     transform: `translateX(${translateValue}px)`,
     transition: "transform ease-out 0.45s",
    }}
    >
    {cards.map((card, index) => (
     <div className="card" key={card.id} ref={cardRef}>
      <img src={card.image} alt="" />
     </div>
    ))}
    </div>
   </div>
   <button className="prev-btn" onClick={handlePrevClick}>
    Prev
   </button>
   <button className="next-btn" onClick={handleNextClick}>
    Next
   </button>
  </div>
 </Container>
 );

};




export default Coursel;