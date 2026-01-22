"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapLocationDot,
} from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// import "@/globals.css";
import MyImage from "../my_image";

export default function SlideComponent({
  img1,
  img2,
  img3,
}: {
  img1: string;
  img2: string;
  img3: string;
}) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation === "object"
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      className="custom-swiper  h-full "
      pagination={{ clickable: true }}
      autoplay={{ delay: 9000 }}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onInit={(swiper) => {
        if (
          swiper.params.navigation &&
          typeof swiper.params.navigation === "object"
        ) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;

          swiper.navigation.init();
          swiper.navigation.update();
        }
      }}
    >
      <SwiperSlide className="bg-gray-100 dark:bg-green-950  ">
        <MyImage imgPath={img1} alt="" />
      </SwiperSlide>
      <SwiperSlide className="bg-gray-100 dark:bg-green-950 ">
        <MyImage imgPath={img2} alt="" />
      </SwiperSlide>
      <SwiperSlide className="bg-gray-100 dark:bg-green-950 ">
        <MyImage imgPath={img3} alt="" />
      </SwiperSlide>
    </Swiper>
  );
}
