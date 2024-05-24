import { Button } from "antd";
export default function Contact(): JSX.Element {
    return (
        <>
            <div className="row">

                <form className="col s12">
                    <h3>Contact Us</h3>
                    <div className="row">

                        <div className="input-field col s6">
                            <input id="first_name" type="text" className="validate" />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate" />
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="text" className="validate" />
                            <label htmlFor="phone">Phone</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            Which is your favorite movie?
                            <div className="input-field inline">
                                <input id="movie" type="text" className="validate" />
                                <label htmlFor="movie">Movie</label>
                            </div>
                        </div>
                    </div>
                    <Button type="primary">
                        Send Message
                    </Button>
                </form>
            </div></>
    )
}