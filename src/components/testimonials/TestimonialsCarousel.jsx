import { useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Testimonials.css';

const TestimonialsCarousel = () => {
  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1170: {
        items: 3
      }
    }
  };

  return (
    
    <div className="testimonials-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <OwlCarousel id="customers-testimonials" className="owl-carousel owl-theme" {...options}>
              <div className="item">
                <div className="shadow-effect">
                  <img className="img-circle" src="https://lh3.googleusercontent.com/a-/ALV-UjW0yGspFNUsiCtWyU4VUx1VWOhsHs6o7fGLsLQKP8S70G9K_tWx=w60-h60-p-rp-mo-br100" alt="Client 1" />
                  <p>Overall puas dengan pelayanan disini. Hasil cuci bersih, waktu pengerjaan cepat, pelayanan ramah, dan yang penting affordable price. Good job, keep it up. 🔥</p>
                </div>
                <div className="testimonial-name">Breezy Breeze</div>
              </div>

              <div className="item">
                <div className="shadow-effect">
                  <img className="img-circle" src="https://lh3.googleusercontent.com/a-/ALV-UjUNmrwLz-q4NFeQeYBU1nHjz-fBHO1RaZW5IowK_KpRMOLt0N7c=w60-h60-p-rp-mo-br100" alt="Client 2" />
                  <p>Bersih bangettttt, recommended banget guysss kamacleans the best.</p>
                </div>
                <div className="testimonial-name">Irwan Satryawan</div>
              </div>

              <div className="item">
                <div className="shadow-effect">
                  <img className="img-circle" src="https://lh3.googleusercontent.com/a-/ALV-UjVO-eaVpKDs7n3Rvi6U6PdtcYorYHKOli4mZLV1ez_PXiGN5C1w=w60-h60-p-rp-mo-br100" alt="Client 3" />
                  <p>Pelayanan ramah, hasil cuci sepatunya oke punya juga.</p>
                </div>
                <div className="testimonial-name">putut widodo</div>
              </div>

              <div className="item">
                <div className="shadow-effect">
                  <img className="img-circle" src="https://lh3.googleusercontent.com/a-/ALV-UjWo290LTcN_XTCbpsdzQ44zOuPjms9Yf_suPSgZ8lXWr0KX3Fo=w60-h60-p-rp-mo-br100" alt="Client 4" />
                  <p>Bersih ... cepat like a new... Recommended banget siii 👍</p>
                </div>
                <div className="testimonial-name">ucokwfs</div>
              </div>

              <div className="item">
                <div className="shadow-effect">
                  <img className="img-circle" src="https://lh3.googleusercontent.com/a-/ALV-UjUmri0gHhD_Myaex6bUviv3zPKYfAeRTUfVTjtlXQK51DlBZUQvjQ=w60-h60-p-rp-mo-br100" alt="Client 5" />
                  <p>Selalu jadi langganan sih disini, hasilnya bersih bgt seperti baru dan tidak merusak sepatu❤️ Thank you Kamacleans🤝</p>
                </div>
                <div className="testimonial-name">Tanzalla Azzahra</div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;