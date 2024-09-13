import './aboutUsInfo.sass'
import ImageSlider from '../../../../Components/ImageSlider/slider';

const AboutUsInfo = () => {
    return (
        <div id="aboutUsInfo">
            <div className="description" >
                <h1 className='title'>About Us</h1>
                <div className="text">
                Welcome to Bella Vista, a pizzeria dedicated to delivering an unforgettable Italian dining experience, created by Maksymilian Olejnik. At Bella Vista, we bring the heart of Italy to your plate, offering authentic, wood-fired pizzas crafted from the finest ingredients. Our passion for traditional flavors and modern culinary techniques ensures that every bite transports you to the vibrant streets of Italy.
                <br /><br />
                Whether you're looking for a cozy spot to enjoy a slice or the perfect place to gather with friends and family, Bella Vista offers a warm and inviting atmosphere. Join us in celebrating the art of pizza-making, where quality, tradition, and taste come together.
                <br /><br />
                <span className='logo'>Bella Vista</span> – Where every meal feels like a taste of Italy.
                </div>
                <div className="image" />
            </div>
        </div>
    );
}

export default AboutUsInfo;