import React from "react";
import { Link } from "react-router-dom";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImage = [hero1, hero2, hero3, hero4];

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl capitalize">
          We are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatibus, cumque, voluptates, quia voluptas sit aspernatur aut
          odit aut fugit. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam voluptatibus, cumque, voluptates, quia voluptas sit
          aspernatur aut odit aut fugit.
        </p>
        <div className="mt-10">
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
        </div>
      </div>
      <div className=" z-10 hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImage.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img src={image} className="rounded-box h-full w-80" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
