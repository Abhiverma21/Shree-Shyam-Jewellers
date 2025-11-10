import React from "react";
import Hero from "./Hero" ;
import  Category from "./Category" ;
import Rate from "../Rate/Rates";
import Collect from "../Collection/Collect" ;  
import Gallery from "./Gallery" ; 
import TestimonialsSection from "../Testimonials/TestimonialSection";
import AllCard from "../Jewellery/AllCard";
import Pop from "../PopUp/Pop" ;
import DailyWear from "./DailyWear";
import Assurance from "./Assurance";

export default function Home() {
    return (
        <>
            <Hero />
            {/* <Category /> */}
            {/* <Rate /> */}
            <Collect />
            <DailyWear />
             <AllCard />
            <Gallery />
            <Assurance />   


            <TestimonialsSection />
            <Pop />
           
        </>
    )
}