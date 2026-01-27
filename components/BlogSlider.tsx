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
    <div className="blog-slider-container relative overflow-visible">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mb-20"
        centeredSlides={true}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} className="flex justify-center">
            <div className="max-w-2xl w-full mx-auto">
              <PostCard post={post} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .blog-slider-container {
          overflow: visible !important;
        }

        .blog-slider-container .swiper {
          padding-bottom: 40px !important;
          margin-bottom: 0 !important;
        }

        .blog-slider-container .swiper-wrapper {
          overflow: visible !important;
        }

        .blog-slider-container .swiper-button-next,
        .blog-slider-container .swiper-button-prev {
          color: var(--primary-green);
          background: white;
          width: 40px;
          height: 40px;
          padding: 8px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          top: auto;
          bottom: 28px;
          transition: all 0.3s ease;
        }

        .blog-slider-container .swiper-button-next:hover,
        .blog-slider-container .swiper-button-prev:hover {
          background: var(--primary-green);
          color: white;
          transform: scale(1.1);
        }

        .blog-slider-container .swiper-button-next {
          right: calc(50% - 100px);
        }

        .blog-slider-container .swiper-button-prev {
          left: calc(50% - 100px);
        }

        .blog-slider-container .swiper-button-next:after,
        .blog-slider-container .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }

        .blog-slider-container .swiper-pagination {
          position: relative !important;
          bottom: auto !important;
          margin-top: 24px;
        }

        .blog-slider-container .swiper-pagination-bullet {
          background: var(--primary-green);
          opacity: 0.4;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        .blog-slider-container .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 5px;
        }

        @media (max-width: 640px) {
          .blog-slider-container .swiper-button-next {
            right: 10px;
          }

          .blog-slider-container .swiper-button-prev {
            left: 10px;
          }
        }
      `}</style>
    </div>
  )
}
