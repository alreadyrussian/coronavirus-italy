import React from 'react';
import axios from 'axios';

export default class Italy extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            dataYesterday: [],
            today: ''
        }
    }

    componentDidMount(){
        axios.get(`https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`)
        .then((res) => {
                const dataItaly = res.data[res.data.length-1];
                const dataItalyYesterday = res.data[res.data.length-2];
                const todayItaly = res.data[res.data.length-1].data
                console.log(res.data)
                this.setState({
                    data: dataItaly,
                    dataYesterday: dataItalyYesterday,
                    today: todayItaly
                })
        });
    }



    render(){

        // serve per spezzare la data
        function dataSlice(date) { 
            return date.slice(0, 2) + '-'  + date.slice(2, 4) + '-' + date.slice(4, 8);
        }

        // serve per avere due cifre decimali nell'incidenza dei morti
        function roundToTwo(num) {    
            return +(Math.round(num + "e+3")  + "e-3");
        }

        const differenzaTotalecasi = this.state.data.totale_casi - this.state.dataYesterday.totale_casi;
        const differenzaTamponi = this.state.data.tamponi - this.state.dataYesterday.tamponi;
        const differenzaTerapiaintensiva = this.state.data.terapia_intensiva - this.state.dataYesterday.terapia_intensiva;
        const differenzaDeceduti = this.state.data.deceduti - this.state.dataYesterday.deceduti;
        const percentualeDeceduti = roundToTwo(this.state.data.deceduti/this.state.data.totale_casi)* 100;
        const percentualeDecedutiYest = roundToTwo(this.state.dataYesterday.deceduti/this.state.dataYesterday.totale_casi)* 100;
        const diffPercentualeDeceduti = roundToTwo(percentualeDeceduti - percentualeDecedutiYest);
        const diffGuariti = this.state.data.dimessi_guariti - this.state.dataYesterday.dimessi_guariti;
        const todayItalyShort = this.state.today.substring(0, this.state.today.length - 8);
        
        return(
            <div className="row dati-italia">
                <h4 style={{width:'100%'}} className='text-center'>
                    Dati aggiornati al {dataSlice((String(todayItalyShort).split('-').reverse().join('').replace(/\s/g,'')))}
                </h4>   
                <div className="col-lg-12" >
                    <p>
                        Casi Totali: 
                        <span className="lista-italia">{this.state.data.totale_casi}</span>
                        <span className={differenzaTotalecasi > 0 ? 'red': 'green'}>
                            {differenzaTotalecasi}
                            {differenzaTotalecasi > 0 ? <i className="fas fa-arrow-up red-up"></i> : <i className="fas fa-arrow-down green-down"></i>}
                        </span> 
                    </p>
                    
                </div>
                <div className="col-lg-12">
                    <p>
                        Tamponi:
                        <span className="lista-italia">{this.state.data.tamponi}</span>
                        <span className={differenzaTamponi > 0 ? 'red': 'green'}>
                            {differenzaTamponi}
                            {differenzaTamponi > 0 ? <i className="fas fa-arrow-up red-up"></i> : <i className="fas fa-arrow-down green-down"></i>}
                        </span> 
                    </p>
                </div>
                <div className="col-lg-12">
                    <p>
                        Terapia Intensiva: 
                        <span className="lista-italia">{this.state.data.terapia_intensiva}</span>
                        <span className={differenzaTerapiaintensiva > 0 ? 'red': 'green'}>
                            {differenzaTerapiaintensiva}
                            {differenzaTerapiaintensiva > 0 ? <i className="fas fa-arrow-up red-up"></i> : <i className="fas fa-arrow-down green-down"></i>}
                        </span> 
                    </p>
                </div>
                <div className="col-lg-12">
                    <p>
                        Deceduti: 
                        <span className="lista-italia">{this.state.data.deceduti}</span> 
                        <span className={differenzaDeceduti > 0 ? 'red': 'green'}>
                            {differenzaDeceduti}
                            {differenzaDeceduti > 0 ? <i className="fas fa-arrow-up red-up"></i> : <i className="fas fa-arrow-down green-down"></i>}
                        </span>
                    </p>
                </div>
                <div className="col-lg-12">
                    <p>
                        Mortalità: 
                        <span className="lista-italia">{percentualeDeceduti}%</span> 
                        <span className={diffPercentualeDeceduti > 0 ? 'red': 'green'}>
                            {diffPercentualeDeceduti}%
                            {diffPercentualeDeceduti > 0 ? <i className="fas fa-arrow-up red-up"></i> : <i className="fas fa-arrow-down green-down"></i>}
                        </span>
                    </p>
                </div>
                <div className="col-lg-12">
                    <p>
                        Guariti: 
                        <span className="lista-italia">{this.state.data.dimessi_guariti}</span> 
                        <span className={diffGuariti > 0 ? 'green': 'red'}>
                            {diffGuariti}
                            {diffGuariti > 0 ? <i className="fas fa-arrow-up green-up"></i> : <i className="fas fa-arrow-down red-down"></i>}
                        </span>
                    </p>
                </div>
            </div>
        )
    }


}