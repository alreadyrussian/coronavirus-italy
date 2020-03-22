import React from 'react';
import Region from './components/Region';
import Graph from './components/Graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdownbs from './components/Dropdownbs';
import Italy from './components/Italy';
import './App.css';
import  italia from './img/italia.png'



class App extends React.Component {
  constructor(){
    super();
    this.state = {
        
      }
    }

  render(){
    return(
      <div>
        <Dropdownbs />
        <div className="container-fluid mt-5 mb-5 master-container">
          <h1 className='mb-3' style={{textTransform: 'uppercase', textAlign: 'center'}}> CoronaVirus in Italia </h1>
          <h5 className='text-center mb-3 mt-2'>Una pagina che mostra le informazioni generali
              riguardante il Covid-19 regione per regione 
          </h5>
          <img style={{display:'block', margin:'0 auto'}} alt='italia' className='img-fluid' src={italia} />
          <Italy />
          <Graph displayText={false}/>
          <Region textDeceduti='Deceduti: ' 
                  textTamponi='Tamponi: ' 
                  textTotaliCasi='Casi totali: '
                  textTerapia='Terapia Intensiva: '
                  textPercentuale='Mortalità: '
                  textGuariti='Dimessi Guariti: '
                  />
          <footer>
              <p className="mt-5 text-center">
                Made with <span><i style={{color: '#d1686c'}} className="fas fa-praying-hands"></i> (Hope)</span> by <a href="mailto:g.giarrusso85@gmail.com">Gianluca Giarrusso</a>
                <br/>Editore/Autore del dataset:<span style={{textDecoration:'underline'}}> Dipartimento della Protezione Civile</span>  <br/>Licenza: CC-BY-4.0 
              </p>
              <p>
                
              </p>
          </footer>
        </div>
      </div>
    )
  }
}





export default App;
