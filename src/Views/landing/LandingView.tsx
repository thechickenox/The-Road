import React, { useRef } from "react";
import Presentacion from "../../Components/Models/Landing/Presentacion";
import Header from "../../Components/Models/Landing/Header";
import OfferSection from "../../Components/Models/Landing/OfferSection";
import AboutUsSection from "../../Components/Models/Landing/AboutUsSection";
import Footer from "../../Components/Models/Landing/Footer";


export default function LandingView(){
    const presentacionRef = useRef(null);
    const offerSectionRef = useRef(null);
    const aboutUsSectionRef = useRef(null);

    const scrollToSection = (ref: any) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Header scrollToSection={scrollToSection} presentacionRef={presentacionRef} offerSectionRef={offerSectionRef} aboutUsSectionRef={aboutUsSectionRef} />
            <div ref={presentacionRef}>
                <Presentacion />
            </div>
            <div ref={offerSectionRef}>
                <OfferSection />
            </div>
            <div ref={aboutUsSectionRef}>
                <AboutUsSection />
            </div>
            <Footer scrollToSection={scrollToSection} presentacionRef={presentacionRef} offerSectionRef={offerSectionRef} aboutUsSectionRef={aboutUsSectionRef} />
        </>
    );
}