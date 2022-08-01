import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';

export default function Tesswiper() {
	return (
		<>
	    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={3}
	  loop={true}
                autoplay={{
                    delay: 500,
                    disableOnInteraction: false
                }}
      navigation
      pagination={{ el: '.my-custom-pagination-div',
                    clickable: true,
                    renderBullet: (index, className) => {
                     return '<span class="' + className + '"></span>';
                    },}}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
		<SwiperSlide>Slide 1</SwiperSlide>
		<SwiperSlide>Slide 2</SwiperSlide>
		<SwiperSlide>Slide 3</SwiperSlide>
		<SwiperSlide>Slide 4</SwiperSlide>
		<SwiperSlide>Slide 5</SwiperSlide>
		<SwiperSlide>Slide 6</SwiperSlide>
		<SwiperSlide>Slide 7</SwiperSlide>
	  </Swiper>
	   <div className="my-custom-pagination-div" />
	   </>
	)
}