import React from 'react';
import axios from 'axios';
import Loading from './Loading';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class Graph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            labels: [], 
            loading: true,
            dataContagi: [],
            dataMorti: [],
            dataGuariti: [],
            dataTerapia: []
        }
    }

    componentDidMount(){
        axios.get(`https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`)
        .then((res) => {
                //console.log(res.data)
                const dataObj = res.data;
                // serve per spezzare la data
                function dataSlice(date) { 
                    return date.slice(0, 2) + '-'  + date.slice(10,12) ;
                }
                var arrayLabels = [];
                var dataC = [];
                var dataM = [];
                var dataG = [];
                var dataI = [];
                // eslint-disable-next-line array-callback-return
                dataObj.map((item)=>{ 
                   arrayLabels.push(dataSlice((String(item.data).split('-').reverse().join('').replace(/\s/g,''))))
                   dataC.push(item.totale_casi);
                   dataM.push(item.deceduti);
                   dataG.push(item.dimessi_guariti);
                   dataI.push(item.terapia_intensiva)
                })
                this.setState({
                    loading: false,
                    labels: arrayLabels,
                    dataContagi: dataC,
                    dataMorti: dataM,
                    dataGuariti: dataG,
                    dataTerapia: dataI
                })
        });
    }

    static standardValue = {
        displayText: true
    }

    render(){
        const data = {
            labels: this.state.labels,
            datasets: [
              {
                label: 'Contagi Totali Italia',
                backgroundColor: 'rgba(228, 228, 228, 0.6)',
                borderColor: 'rgb(30, 37, 56)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(228, 228, 228, 0.274)',
                hoverBorderColor: 'rgba(228, 228, 228, 1)',
                data: this.state.dataContagi
              },
              {
                label: 'Morti Totali Italia',
                backgroundColor: 'rgb(219, 64, 64, 1)',
                borderColor: 'rgb(30, 37, 56)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: this.state.dataMorti
              },
              {
                label: 'Guariti Totali Italia',
                backgroundColor: 'rgb(72, 183, 72, 1)',
                borderColor: 'rgb(30, 37, 56)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(72, 183, 72, 0.4)',
                hoverBorderColor: 'rgb(72, 183, 72, 1)',
                data: this.state.dataGuariti
              }
            ]
          };
        // Loading spinner check if data is loaded
        if(this.state.loading){
            return(
                <Loading />
            )
        }  
        return (
            <div style={{margin:'50px 0'}}>
                <Line
                data={data}
                width={100}
                height={700}
                options={{ 
                    title:{
                    display: this.props.displayText,
                    text: 'Contagi dal 24 Febbraio 2020',
                    fontSize: 20
                },
                    maintainAspectRatio: false 
                }}
                />
            </div>
        )
    }
} 