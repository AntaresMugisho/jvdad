'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import PostCard from '@/components/cards/PostCard'
import { Post } from '@/lib/types'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface BlogSliderProps {
    posts: Post[]
}

export default function BlogSlider({ posts }: BlogSliderProps) {
    return (
        <div className="blog-slider-container">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="pb-12"
            >
                {posts.map((post) => (
                    <SwiperSlide key={post.id}>
                        <PostCard post={post} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
        .blog-slider-container .swiper-button-next,
        .blog-slider-container .swiper-button-prev {
          color: var(--primary-green);
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .blog-slider-container .swiper-button-next:after,
        .blog-slider-container .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .blog-slider-container .swiper-pagination-bullet {
          background: var(--primary-green);
          opacity: 0.5;
        }

        .blog-slider-container .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
        </div>
    )
}
