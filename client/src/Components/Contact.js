import axios from "axios";
import React, { Component } from "react";
import { Fade, Slide } from "react-awesome-reveal";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactName: "",
      contactEmail: "",
      contactSubject: "",
      contactMessage: "",
      success: false,
      error: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { contactName, contactEmail, contactSubject, contactMessage } =
      this.state;

    try {
      const response = await axios.post("/api/contact", {
        contactEmail,
        contactMessage,
        contactName,
        contactSubject,
      });
      if (response.data.success) {
        this.setState({ contactName: "",
        contactEmail: "",
        contactSubject: "",
        contactMessage: "",
        success: true, 
        error: false });
        setTimeout(() => {
          this.setState({ success: false });
        }, 5000);
      } else {
        this.setState({ success: false, error: true });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      this.setState({ success: false, error: true });
    }
  };

  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>
            <div className="eight columns">
              <form
                action=""
                method="post"
                id="contactForm"
                name="contactForm"
                onSubmit={this.handleSubmit}
              >
                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactName"
                      name="contactName"
                      value={this.state.contactName}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      value={this.state.contactEmail}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      value={this.state.contactSubject}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      cols="50"
                      rows="15"
                      id="contactMessage"
                      name="contactMessage"
                      value={this.state.contactMessage}
                      onChange={this.handleChange}
                    ></textarea>
                  </div>

                  <div>
                    <button className="submit" type="submit">
                      Submit
                    </button>
                    <span id="image-loader">
                      <img alt="" src="images/loader.gif" />
                    </span>
                  </div>
                </fieldset>
              </form>

              <div id="message-warning"> Error body</div>
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
              <div
                id="message-error"
                style={{ display: this.state.error ? "block" : "none" }}
              >
                <i className="fa fa-exclamation-triangle"></i>Oops! Something
                went wrong. Please try again.
              </div>
            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Address and Phone</h4>
                <p className="address">
                  {name}
                  <br />
                  {street} <br />
                  {city}, {state} {zip}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }
}

export default Contact;
