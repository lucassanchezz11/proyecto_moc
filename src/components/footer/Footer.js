import React from "react";
import '../footer/Footer.css'

class Footer extends React.Component{
    render(){
        return(
            <div className="bg-dark text-center text-white p-3" id="footer">
                <h3>
                    Copyright © 2025 Lucas Sánchez San Román
                </h3>
            </div>
        );
    }
}
export default Footer;