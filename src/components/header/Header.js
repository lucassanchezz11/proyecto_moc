import React from "react";
import images from '../../img/images.jpg';

class Header extends React.Component{
    render(){
        return(
            <div className="bg-dark text-center text-white p-3" id="header">
                 <img src={images} alt="Logo" className="img-fluid" style={{ width: "150px", height: "auto" }} />
                <h3>
                    Bienvenido a la página de contactos
                </h3>
            </div>
        );
    }
}
export default Header;