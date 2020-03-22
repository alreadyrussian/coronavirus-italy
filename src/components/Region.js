import React from 'react'
import axios from 'axios';
import Loading from './Loading'


export default class Region extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            regions : [],
            today: '',
            loading: true
        }
    }

    componentDidMount(){
        var compare = ( a, b ) => {
            if ( a["totale_casi"] < b["totale_casi"] ){ return 1;}
            if ( a["totale_casi"] > b["totale_casi"] ){ return -1;}
            return 0;
        }
        
        axios.get('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json').then(res => {
            console.log(res.data.slice(Math.max(res.data.length - 21, 1)))
            const jsonRegion = res.data.slice(Math.max(res.data.length - 21, 1));
            const todayItaly = res.data[res.data.length-1].data
            this.setState({
                regions: jsonRegion.sort(compare),
                today: todayItaly,
                loading: false      
            })
        })
    }
    
    render(){
        var imgRegions = [
                'piemonte', 'lombardia', 'emiliaromagna', 'veneto', 
                'friuliveneziagiulia', 'marche', 'toscana','liguria',
                'lazio', 'campania', 'puglia', 'sicilia', 'calabria',
                'abruzzo', 'umbria', 'sardegna', "valled'aosta", 'molise',
                'basilicata', 'patrento', 'pabolzano'
        ];
        const newImgRegion = (item) => {
            var singleRegion;
            imgRegions.map((imgRegion) => {
                // minuscolo & toglie spazi bianchi e unisce & toglie punti e unisce
                var regionLowcase = item.denominazione_regione.toLowerCase().replace(/\s/g, '').split('.').join("");
                
                // item.region è bloccato, quello che fa il loop è imgRegions
                // duqnue quando tocca per esempio a item.region settato su Lombardia fa
                // un loop dentro a imgRegions e pesca Lombardia
                if(regionLowcase == imgRegion){
                    //console.log(imgRegion)
                    singleRegion = imgRegion;
                }
            })
            return singleRegion
        }
        // serve per spezzettare la data
        function dataSlice(date) { 
            return date.slice(0, 2) + '-'  + date.slice(2, 4) + '-' + date.slice(4, 8);
        }
        // serve per avere due cifre decimali nell'incidenza dei morti
        function roundToTwo(num) {
            return +(Math.round(num + "e+3")  + "e-3");
        }
        // data
        const todayItalyShort = this.state.today.substring(0, this.state.today.length - 8);
        
        const regioniItaliane = this.state.regions.map((item, index ) => {
            if((index)%2 == 0){
                return  <React.Fragment key={index}>
                            <div  style={{marginTop: "2rem"}} className="w-100"></div>
                            <section className='col-lg-6 setmargin' >
                                <div className='region'>
                                    <h3 style={{textAlign: 'center'}} className='mt-4'> 
                                        {item.denominazione_regione}
                                    </h3>
                                    <p style={{color:'rgb(131, 131, 131)'}} className='region-data'>Aggiornato al {dataSlice((String(todayItalyShort).split('-').reverse().join('').replace(/\s/g,'')))} </p>
                                    <img alt='regioni' className="region-img" src={process.env.PUBLIC_URL + '/' + newImgRegion(item) + '.png'} />
                                    <ul className='region-ul' style={{listStyle: 'none'}}>
                                        <li> <i className="fas fa-users"></i> {this.props.textTotaliCasi} {item.totale_casi}</li>
                                        <li> <i className="fas fa-microscope"></i> {this.props.textTamponi} {item.tamponi}</li>
                                        <li> <i className="fas fa-procedures"></i> {this.props.textTerapia}{item.terapia_intensiva}</li>
                                        <li> <i className="fa fa-cross"></i> {this.props.textDeceduti} {item.deceduti}</li>
                                        <li> <i className="far fa-chart-bar"></i> {this.props.textPercentuale} {roundToTwo(item.deceduti/item.totale_casi* 100)}%</li>
                                        <li> <i className="fas fa-thumbs-up"></i>  {this.props.textGuariti} {item.dimessi_guariti} </li>    
                                    </ul>
                                </div>
                            </section>
                        </React.Fragment>  
                }
                else{
                return <section className='col-lg-6 setmargin' key={index}>
                            <div className='region'>
                                <h3 style={{ textAlign: 'center' }} className='mt-4'>
                                    {item.denominazione_regione}
                                </h3>
                                <p  style={{color:'rgb(131, 131, 131)'}} className='region-data'>Aggiornato al {dataSlice((String(todayItalyShort).split('-').reverse().join('').replace(/\s/g,'')))} </p>
                                <img className="region-img" alt='regioni' src={process.env.PUBLIC_URL + '/' + newImgRegion(item) + '.png'} />
                                <ul className='region-ul' style={{ listStyle: 'none' }}>
                                    <li> <i className="fas fa-users"></i>{this.props.textTotaliCasi} {item.totale_casi}</li>
                                    <li> <i className="fas fa-microscope"></i>{this.props.textTamponi} {item.tamponi}</li>   
                                    <li> <i className="fas fa-procedures"></i>{this.props.textTerapia}{item.terapia_intensiva}</li>
                                    <li> <i className="fa fa-cross"></i>{this.props.textDeceduti} {item.deceduti}</li>
                                    <li> <i className="far fa-chart-bar"></i> {this.props.textPercentuale} {roundToTwo(item.deceduti/item.totale_casi * 100)}%</li>
                                    <li> <i className="fas fa-thumbs-up"></i> {this.props.textGuariti} {item.dimessi_guariti} </li>  
                                </ul>
                            </div>
                        </section>
                }
            })
        
            
            // Loading spinner check if data is loaded
            if(this.state.loading){
                return(
                    <Loading />
                )
            }  
            // RETURN RENDER
            return(
                <div className='row'>
                    {regioniItaliane}
                </div>
        )
    }
}