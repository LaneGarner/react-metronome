import React, { Component } from 'react';
import './Metronome.css';
import click1 from '../click1.flac';
import click2 from '../click2.wav';
import * as Tone from 'tone'

class Metronome extends Component {
    constructor(props) {
    super(props);

    this.state = {
        playing: false,
        count: 0,
        bpm: 120,
        beatsPerMeasure: 7,
        position: '0:0:0',
    };
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    }

    // handleBpmChange = event => {
    //     const bpm = event.target.value;
    //     this.setState({ bpm });
    // }

    // timerWorker = new Worker("./metronomeworker.js");

    handleBpmChange = event => {
        const bpm = event.target.value;
        
        if(this.state.playing) {
            // Stop the old timer and start a new one
            Tone.Transport.cancel();
            // this.timer = setInterval(this.playClick);
            this.setState({
                bpm: bpm,
                // playing: true
                // Play a click "immediately" (after setState finishes)
            }, this.playClick)
        } else {
            // Otherwise just update the BPM
            this.setState({ bpm });
        }
        }

    // startStop = () => {
    //     this.click1.play();
    // }

    // startStop = () => {
    //     if(this.state.playing) {
    //     // Stop the timer
    //     clearInterval(this.timer);
    //     this.setState({
    //         playing: false
    //     });
    //     } else {
    //     // Start a timer with the current BPM
    //     this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
    //     this.setState({
    //         count: 0,
    //         playing: true
    //         // Play a click "immediately" (after setState finishes)
    //     }, this.playClick);
    //     }
    // }

    startStop = () => {
        const { count, beatsPerMeasure } = this.state;
        console.log(this.osc)


        if(!this.state.playing) {
            this.setState({
                count: 0,
                playing: true
                // Play a click "immediately" (after setState finishes)
            }, this.playClick)
            // Stop the timer
            
        } else {
            



            Tone.Transport.cancel();
            Tone.Transport.stop();

            this.setState({
                playing: false
            });

        }
    }

    playClick = () => {
        const bpmNum = parseInt(this.state.bpm);
        const { playing, count, beatsPerMeasure } = this.state;
        // var filt = new Tone.Filter().toMaster();
        const osc = new Tone.Oscillator().toDestination();
            
        
        
        Tone.Transport.bpm.value = bpmNum;
        
        var loop = new Tone.Loop((time) => {
            //triggered every eighth note. 
            osc.start(time).stop(time + 0.1);
            console.log(Tone.Transport.position);
            this.setState({
                position: Tone.Transport.position
                });
            
        }, "4n").start(0);
        Tone.Transport.start();
        
        
        
        
        
        
            // Tone.Transport.timeSignature = 5;
            // Tone.Transport.scheduleRepeat((time) => {
            //     // use the callback time to schedule events
            //     osc.start(time).stop(time + 0.1);
            // }, "4n");
            // // transport must be started before it starts invoking events
            // Tone.Transport.start();






            // Tone.Transport.stop()
    
        // The first beat will have a different sound than the others
        // if(count % beatsPerMeasure === 0) {
        // this.click2.play();
        // } else {
        // this.click1.play();
        // }
    
        // Keep track of which beat we're on
        // this.setState(state => ({
        // count: (state.count + 1) % state.beatsPerMeasure
        // }));
    }

    render() {
    const { position, playing, bpm } = this.state;
    const newPosition = parseInt(position.split(':')[1])

    return (
        <div className="metronome">
        <div className="bpm-slider">
            <div>{bpm} BPM</div>
            <input
            className="Slider"
            type="range"
            min="01"
            max="500"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>
            {playing ? 'Stop' : 'Start'}
        </button>
        <button>Tap</button>
        {playing ? <h3 style={{"font-size": "5em"}}>{newPosition + 1}</h3> : <div></div>}
        
        </div>
    );
    }
}

export default Metronome;