import React from 'react';

export default class Loading extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        console.log(this.props)
        return(
            <div className='lds-dual-ring'></div>
        )
    }

}