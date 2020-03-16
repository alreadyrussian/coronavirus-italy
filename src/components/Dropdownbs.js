import React from 'react';
import 'hamburgers/dist/hamburgers.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default class Dropdownbs extends React.Component {
    constructor(){
        super();
        this.state = {
            clicked: false,
            bodyClickEvent: true
        }
        this.handlerClick = this.handlerClick.bind(this)
        //this.bodyClick = this.bodyClick.bind(this)
        //this.stopPropag = this.stopPropag.bind(this)
    }


    /*componentDidMount() {
        document.body.addEventListener('click', this.bodyClick);
    }

     componentWillUnmount(){
        //document.body.removeEventListener('click', this.bodyClick);
    }  

    bodyClick(){
        if(this.state.clicked && this.state.bodyClickEvent){
        this.setState((prevState, props) => {
                return {
                        clicked: !prevState.clicked,
                    }
            })
        }
        console.log(this.state.bodyClickEvent)
        console.log('clicked ' + this.state.clicked)
    } */


    handlerClick(e){
       
        this.setState((prevState, props) => {
            return {clicked: !prevState.clicked}
        }) 
        console.log('handlerclick ' + this.state.clicked)
        
    }
    
    

    render(){
        var className = this.state.clicked ? 'is-active' : '';
        var classNameDrop = this.state.clicked ? 'show-custom' : '';
        return(
            <Dropdown  >
                <Dropdown.Toggle  id="dropdown-basic">
                    <div onClick={this.handlerClick} className={`hamburger hamburger--collapse ${className}`}  type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                    </div>  
                </Dropdown.Toggle>
                
                <Dropdown.Menu className={classNameDrop}>
                <Dropdown.Item onClick={this.handlerClick} target='_blank' href="http://www.salute.gov.it/portale/home.html">Ministero della Salute</Dropdown.Item>
                <Dropdown.Item onClick={this.handlerClick} target='_blanK' href="http://www.protezionecivile.gov.it/">Protezione Civile</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}