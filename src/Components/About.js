import React, { Component } from "react";
import { Fade } from "react-awesome-reveal";

class About extends Component {
    render() {
        if (!this.props.data) return null;

        const name = this.props.data.name;
        const profilepic = "images/" + this.props.data.image;
        const bio = this.props.data.bio;
        const street = this.props.data.address.street;
        const city = this.props.data.address.city;
        const state = this.props.data.address.state;
        const zip = this.props.data.address.zip;
        const phone = this.props.data.phone;
        const email = this.props.data.email;
        const resumeDownload = this.props.data.resumedownload;

        return(
            <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src={profilepic}
                alt="Profile Pic"
              />
            </div>
            <div className="nine columns main-col">
              <h2>About Me</h2>

              <p>{bio}</p>
              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <p className="address">
                    <span>{name}</span>
                    <br />
                    <span>
                      {street}
                      <br />
                      {city} {state}, {zip}
                    </span>
                    <br />
                    <span>{phone}</span>
                    <br />
                    <span>{email}</span>
                  </p>
                </div>
                <div className="columns download">
                  <p>
                    <a href={resumeDownload} className="button">
                      <i className="fa fa-download"></i>Download Resume
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
        // <div>
        //     <h1> Welcome to My Resume!!</h1>
        //     <p>
        //     I am a seasoned Full Stack Developer with 3 years of hands-on experience in crafting robust and scalable applications. 
        //     My expertise spans a diverse technology stack, showcasing proficiency in Java, Spring Boot,
        //     React, Angular, Bootstrap, MSSQL, PostGreSQL, and Google Cloud Platform. My journey in the tech world has equipped me with the skills 
        //     to seamlessly integrate frontend and backend technologies, ensuring a holistic and efficient development process. 
        //     Whether it's creating dynamic and responsive user interfaces with React, implementing server-side logic with Java and Spring Boot, 
        //     or managing databases on MSSQL and PostgreSQL, I am dedicated to delivering top-notch solutions.
        //     </p>
        // </div>
    );
}
}

export default About;