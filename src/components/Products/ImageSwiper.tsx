import React from 'react'
import Swiper from 'react-id-swiper'
import NoImage from '../../assets/img/src/no_image.png'
import 'swiper/css/swiper.css'

const ImageSwiper = (props: any) => {
  const [params] = React.useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    spaceBetween: 30,
  })

  const pictures = props.images

  return (
    <Swiper {...params}>
      {pictures.length === 0 ? (
        <div className="p-media__thumb">
          <img src={NoImage} alt="デフォルト商品画像" />
        </div>
      ) : (
        pictures.map((picture: any) => (
          <div className="p-media__thumb" key={picture.id}>
            <img src={picture.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  )
}

export default ImageSwiper
