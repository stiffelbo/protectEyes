import React from 'react';
import { render } from 'react-dom';

const Description = () => (
  <div>
    <h1>Protect your eyes</h1>
    <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
    <p>This app will help you track your time and inform you when it's time to rest.</p>
  </div>
);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "off",
      time: 0,
      timer: null,
    }
  }

  settings = {
    workTime: 1200,
    restTime: 20,
    interval: 1000,
  }
  
  formatTime = (seconds) => {  
    const minutes = Math.floor(seconds / 60);
    const scnds = (seconds - minutes * 60);
    const display = {
      mins: minutes < 10 ? `0${minutes}` : minutes,
      secs: scnds < 10 ? `0${scnds}` : scnds,
    }    
    return `${display.mins}:${display.secs}`;  
  }

  startTimer = ()=>{    
    this.setState({
      status: "work",
      time: this.settings.workTime,
      timer: setInterval(this.step, this.settings.interval),
    });
  }

  step = ()=>{
    const {time, status} = this.state;
    if(time > 0){
      this.setState({
        time: this.state.time - 1,
      });
    }else{
      if(status == 'work'){
        this.playBell();
        this.setState({
          time: this.settings.restTime,
          status: 'rest',
        });
      }else{
        this.playBell();
        this.setState({
          time: this.settings.workTime,
          status: 'work',
        });
      }
    }   
  }

  stopTimer = ()=>{
    this.setState({
      status: "off",
      time: 0,
      timer: clearInterval(this.state.timer),
    })
  }

  closeApp = ()=>{
    window.close();
  }

  playBell = ()=>{
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  render() {
    const {status, time} = this.state;
    return (
      <div>
        {status === "off" && <Description />}        
        {status === "work" && <img src="./images/work.png" />}        
        {status === "rest" && <img src="./images/rest.png" />}
        {status !== "off" && <div className="timer">
          {this.formatTime(time)}
        </div>}
        {status === "off" && <button className="btn" onClick={()=>{this.startTimer()}}>Start</button>}        
        {status !== "off" && <button className="btn" onClick={()=>{this.stopTimer()}}>Stop</button>}
        <button className="btn btn-close" onClick={()=>{this.closeApp()}}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
