import React, { useState }  from "react"
import axios from "axios";
import { Link } from "gatsby"
import Layout from "../components/layout"
const MyForm = () => {

    const [serverState, setServerState] = useState({
        submitting: false,
        status: null
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg }
        });
        if (ok) {
            form.reset();
        }
    };
    const handleOnSubmit = e => {
        e.preventDefault();
        const form = e.target;
        setServerState({ submitting: true });
        axios({
            method: "post",
            url: "https://formspree.io/f/xqkwlddv",
            data: new FormData(form)
        })
            .then(r => {
                handleServerResponse(true, "Thanks!", form);
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form);
            });
    };
    return (
        <Layout>

            <div>
                <div className="col-md-8 mt-5">
                    <h3>Getform.io Gatsby Form Example</h3>
                    <form onSubmit={handleOnSubmit}>
                        <input type="email" name="email" placeholder="Your Email">
                            <input type="text" name="name" placeholder="Your Name">
                                <input type="text" name="message" placeholder="Your Message">
                                    <button type="submit">Send</button>
                    </form>
                </div>
            </div>

        </Layout>
);
};

export default MyForm;