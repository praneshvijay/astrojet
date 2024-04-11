import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  {
    url: 'https://app-static-prod-skyplus6e.goindigo.in/content/dam/skyplus6e/in/en/assets/homepage/homepage-banners/Hotel_hp_1.jpg',
  },
  {
    url: 'https://app-static-prod-skyplus6e.goindigo.in/content/dam/skyplus6e/in/en/assets/homepage/images/Saudi__HP.jpg',
  },
  {
    url: 'https://app-static-prod-skyplus6e.goindigo.in/content/dam/skyplus6e/in/en/assets/homepage/homepage-banners/Lakshadweep_homepage.jpg',
  },
];

const Slideshow = () => {
    return (
        <div className="slide-container" lay>
          <Fade>
            {fadeImages.map((fadeImage, index) => (
              <div key={index}>
                <img style={{ width: '100%' }} src={fadeImage.url} alt='slideshow'/>
              </div>
            ))}
          </Fade>
        </div>
      )
}
 
export default Slideshow
;