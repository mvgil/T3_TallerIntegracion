import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
import Chart from "react-google-charts";
import { useEffect, useState } from 'react';
import {Button} from './components/Button';
import * as _ from 'underscore';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

ReactDOM.render(
  <React.StrictMode>
  /<App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Funciones auxiliares
// fuente: https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
function getMinV(data){
  return data.reduce((min, b) => Math.min(min, b.value), data[0].value);
};

function getMaxV(data){
  return data.reduce((max, b) => Math.max(max, b.value), data[0].value);
};

function getMaxTime(data){
  // ultimo valor recibido
  return data.reduce((max, b) => Math.max(max, b.time), data[0].value);
};

function filter_max_tiempo(data, time){
  return data.filter(data_ => data_.time == time).map(filteredPerson => (filteredPerson.value))[0];

};

// funcion para calcular el volumen total de una accion



// socket
const socket = io("wss://le-18262636.bitzonte.com",{path: '/stocks'}, {transports: 'websocket'});
socket.disconnect();




const Websocket = ({}) => {

/* Read

https://css-tricks.com/use-button-element/
*/

  // eventos recibidos por el servidor:
  // fuente : https://github.com/codyseibert/youtube/tree/master/realtime-chart-websockets
  const [data_exchanges, setData_exchanges] = useState([]);
  const [data_stocks, setData_stocks] = useState([]);
  // eventos emitidos por el servidor
  const [data_update, setData_update] = useState([]);
  const [data_buy, setData_buy] = useState([]);
  const [data_sell, setData_sell] = useState([]);


  // 1. listen for an event and update the state
  useEffect(() => {
    socket.emit('EXCHANGES');
    socket.on('EXCHANGES', exchanges => {
      setData_exchanges(currentData_exchanges => [...currentData_exchanges, exchanges]);
    });
    socket.emit('STOCKS');
    socket.on('STOCKS', stocks => {
      setData_stocks(currentData_stocks => [...currentData_stocks, stocks]);
    });
    // eventos emitidos por el servidor
    socket.on('UPDATE', update => {
      setData_update(currentData_update => [...currentData_update, update]);
    });

    socket.on('BUY', buy => {
      setData_buy(currentData_buy => [...currentData_buy, buy]);
    });

    socket.on('SELL', sell => {
      setData_sell(currentData_sell => [...currentData_sell, sell]);
    });

  }, []);

  /// cambiar
  function vol_transado_1(nombre_ticker){
    var grouped_data_buy = _.mapObject(_.groupBy(data_buy, 'ticker'),
                            );
    var grouped_data_sell = _.mapObject(_.groupBy(data_sell, 'ticker'),
                                                    );
    const data_ticker_sell = grouped_data_sell[nombre_ticker];
    const data_ticker_buy = grouped_data_buy[nombre_ticker] ;

    //const total = data_ticker_sell.reduce((prev,next) => prev + next.volume,0);
    //return data_ticker_sell;
    //var tot = 0;
    //data_ticker_sell.map(se => tot += se.value);




    //return data_ticker_sell;
    //return grouped_data_buy;
    //return grouped_data_buy.filter(data_ => data_.time == time).map(filteredPerson => (filteredPerson.value))[0];
  };

  // cambiar



  //updates
  //var keys_updates = Object.keys(data_update);
  const [buttonText, setButtonText] = useState("Conectarse");
  const holi = <h1> {data_update.map(data_va => <div>{data_va.value}</div>)}</h1>
  const [conexionText, setconexionText] = useState("Estás desconectado!");
  const con = <h2> {conexionText} </h2>
  // fuente: https://www.it-swarm.dev/es/javascript/como-agrupar-una-matriz-de-objetos-por-clave./829087301/
  const aux = "";
  var grouped_data_update = _.mapObject(_.groupBy(data_update, 'ticker'),
                          );

  var grouped_data_buy = _.mapObject(_.groupBy(data_buy, 'ticker'),);

  var grouped_data_sell = _.mapObject(_.groupBy(data_sell, 'ticker'),);


  // ocnstante de prueba
  const sell_2 = Object.entries(grouped_data_sell).map(([key,value])=>{
                          return (
                              <div>{key} : {value.map(data_ => <h1> {data_.ticker} </h1>) }</div>
                          );
                        });
// prueba
  const petList_2 = Object.entries(grouped_data_buy).map(([key,value])=>{
                          return (
                              <div>{key} : {value.map(data_ => <h1> {data_.ticker} </h1>) }</div>
                          );
                        });

  // prueba
  const petList = Object.entries(grouped_data_update).map(([key,value])=>{
                          return (
                              <div>{key} : {value.map(data_ => <h1> {data_.ticker} </h1>) }</div>
                          );
                        });


  if (socket.connected){
    return (
      <div>
      {con}
        <Button onClick={() =>
          //alert("Conectar al socket");
          {alert("Desconectarse"); socket.disconnect();setButtonText("Conectarse");setconexionText("Estás desconectado!")}
        }> {buttonText} </Button>

        <h1> Tarea 3 Websocket </h1>
        {Object.entries(grouped_data_update).map(([key,value])=>{
          const holaa = "hhh";
          const sell_volume = Object.entries(grouped_data_sell).map(([key_sell,value_sell])=>{
                                  if (key_sell == key){
                                  return (value_sell.reduce((prev,next) => prev + next.volume,0));
                                  }
                                });
          const buy_volume = Object.entries(grouped_data_buy).map(([key_buy,value_buy])=>{
                                  if (key_buy == key){
                                  return (value_buy.reduce((prev,next) => prev + next.volume,0));
                                                        }
                                                      });
          //const total_volumen = buy_volume + sell_volume;
          //const [total_volume, setData_total_volume] = useState(buy_volume+sell_volume);

          //const data_ticker_sell = grouped_data_sell[key];
          //const sell_total = data_ticker_sell.reduce((prev,next) => prev + next.volume,0);
          //setData_total_volume(buy_volume,sell_volume);


                                return (

                                    <div>
                                      <h2> Acción: {key} </h2>
                                      <h3> Volumen Total BUY: {buy_volume}</h3>
                                      <h3> Volumen Total SELL: {sell_volume}</h3>
                                      <h3> Alto Histórico: {getMaxV(value)}</h3>
                                      <h3> Bajo Histórico: {getMinV(value)}</h3>
                                      <h3> Último precio: {filter_max_tiempo(value, getMaxTime(value))} </h3>
                                      <h3> Variación Porcentual: </h3>
                                      <LineChart width={600} height={300} data={value}>
                                        <XAxis dataKey="time" tick={aux} />
                                        <YAxis />
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line dataKey="value" stroke="#E446B6" />
                                        <Tooltip/>
                                        <Legend />
                                      </LineChart>


                                    </div>
                                );
                              })}

      </div>
    );
  }
  else{
    return (
      <div>
      {con}
        <Button onClick={() =>
          //alert("Conectar al socket");
          {alert("Conectarse"); socket.connect(); setButtonText("Desconectarse");setconexionText("Estás conectado!")}
        }> {buttonText}</Button>
        <h1>Tarea 3 Websocket </h1>
        {Object.entries(grouped_data_update).map(([key,value])=>{
                                return (
                                    <div>
                                      <h2> Acción: {key} </h2>
                                      <h3> Volumen Total Transado: </h3>
                                      <h3> Alto Histórico: {getMaxV(value)}</h3>
                                      <h3> Bajo Histórico: {getMinV(value)}</h3>
                                      <h3> Último precio: {filter_max_tiempo(value, getMaxTime(value))} </h3>
                                      <h3> Variación Porcentual: </h3>
                                      <LineChart width={600} height={300} data={value}>
                                        <XAxis dataKey="time" tick={aux} />
                                        <YAxis />
                                        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                        <Line dataKey="value" />
                                        <Tooltip/>
                                      </LineChart>


                                    </div>
                                );
                              })}


      </div>

  );


  }

};


ReactDOM.render(<Websocket/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
