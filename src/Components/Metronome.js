import { Component } from 'react';
import './Metronome.css';
import * as Tone from 'tone'
import { TimeSigSelect } from "./TimeSigSelect";
import { Accent } from "./Accent"
import click1 from '../click1.flac';
import click2 from '../click2.wav';
import click3 from '../click3.wav';
// import StartAudioContext from 'startaudiocontext'


class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            bpm: 120,
            timeSig: 4,
            subdivision: "",
            // tick: true,
            position: "0:0:0",
            accent: false,
    };
    this.click1 = new Tone.Player(click1).toDestination()
    this.click2 = new Tone.Player(click2).toDestination()
    this.click3 = new Tone.Player(click3).toDestination()
    }

    // handleBpmChange = event => {
    //     const bpm = event.target.value;
    //     this.setState({ bpm });
    // }

    // timerWorker = new Worker("./metronomeworker.js");

    handleBpmChange = event => {
        const bpm = event.target.value;
        // Tone.Transport.stop();
        Tone.Transport.cancel();
        Tone.Transport.position = "0:0:0"
        
        if(this.state.playing) {
            // Stop the old timer and start a new one
            // Tone.Transport.cancel();
            // this.timer = setInterval(this.playClick);
            this.setState({
                bpm
                // position: "0:0:0",
                // playing: true
                // Play a click "immediately" (after setState finishes)
            }, this.playClick)
        } else {
            // Otherwise just update the BPM
            this.setState({ bpm });
        }
    }

    handleTimeSigChange = e => {
        const newTimeSig = e.target.value;
        const { bpm, playing } = this.state
        
        
        if(playing) {
            Tone.Transport.cancel();
            Tone.Transport.position = "0:0:0"
            // Tone.Transport.cancel();
            // Tone.Transport.position = 0
            // Stop the old timer and start a new one
            // Tone.Transport.cancel();
            // this.timer = setInterval(this.playClick);
            this.setState({
                timeSig: newTimeSig,
                // position: "0:0:0",
                // playing: true
                // Play a click "immediately" (after setState finishes)
            }, this.playClick)
        } else {
            // Otherwise just update the BPM
            this.setState({ timeSig: newTimeSig });
        }
    }

    handleAccentChange = (e) => {
        const accent = e.target.value
        Tone.Transport.cancel();
        Tone.Transport.position = 0


        if(this.state.playing) {
            this.setState({accent: !this.state.accent}, this.playClick)
        } else {
            this.setState({accent: !this.state.accent})
        }

        // console.log(e.target.value)
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
        // StartAudioContext(Tone.context, "#startStopBtn")

        const { count, time } = this.state;
        // console.log(this.osc)


        if(!this.state.playing) {
            this.setState({
                // count: 0,
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
        // Tone.Transport.start();

        const bpmNum = parseInt(this.state.bpm);
        const { position, playing, count, timeSig, time } = this.state;
        // var filt = new Tone.Filter().toMaster();
        const osc = new Tone.Oscillator().toDestination();
        // const player = new Tone.Player(click1).toDestination();
            
        // const shift = new Tone.FrequencyShifter(420).toDestination();
        
        Tone.Transport.bpm.value = bpmNum;
        Tone.Transport.timeSignature = timeSig;

        
        // const loop = new Tone.Loop((time) => {

        //     // this.click3.autostart = true;
        //         // this.click3.loop = true;
        //         // this.click3.loopStart = "0:0:0";
        //         // this.click3.loopEnd = "4:0:0";            
        //         this.click3.start()

            // osc.start(time).stop(time + 0.1);
        //     // player.autostart = true;
        //     // osc.type = "sine2"
        //     // this.click3.start();
        //     console.log(Tone.Transport.position.split(':')[1]);
        //     // {parseInt(Tone.Transport.position.split(':')[1]) === 0 ? osc.connect(shift) : osc.disconnect(shift)}
        //     this.setState({
        //         position: Tone.Transport.position
        //     });
            
        // }, "4n").start(0);
        // Tone.Transport.start();
        
        // {parseInt(position.split(':')[1]) == 3 ? osc.connect(shift) : osc.disconnect(shift)}
        
        
        
        
        // osc.type = "sawtooth"
        // osc.frequency = "220hz"
        
        Tone.Transport.scheduleRepeat((time) => {
            // use the callback time to schedule events
            // osc.start(time).stop(time + 0.1);
            // this.click3.play().start(time).stop(time + 0.1);

            // this.click3.autostart = false;
            // this.click3.loop = true;
            this.setState({
                position: Tone.Transport.position
            });
            this.click3.start(time)
        }, "4n");
        // transport must be started before it starts invoking events
        
        // Tone.Transport.start();

        this.state.accent && (
        Tone.Transport.scheduleRepeat((time) => {
            this.click1.start(time)
        }, "1m")
        )
        
        Tone.Transport.start();



        // Tone.Transport.stop()
    
        // The first beat will have a different sound than the others
        // if(count % time === 0) {
        // this.click2.play();
        // } else {
        // this.click1.play();
        // }
    
        // Keep track of which beat we're on
        // this.setState(state => ({
        // count: (state.count + 1) % state.time
        // }));
    }

    render() {
        const { position, playing, bpm } = this.state;
        const newPosition = parseInt(Tone.Transport.position.split(':')[1])

        return (
            <div className="metronome">
            <Accent handleAccentChange={this.handleAccentChange}/>
            <TimeSigSelect handleTimeSigChange={this.handleTimeSigChange} />
            <div className="bpm-slider">
                <label htmlFor="bpmSlider">Tempo</label>
                <div>{bpm} BPM</div>
                <input
                id="bpmSlider"
                className="Slider"
                type="range"
                min="01"
                max="500"
                value={bpm}
                onChange={this.handleBpmChange} />
            </div>
            <button id="startStopBtn" onClick={this.startStop}>
                {playing ? 'Stop' : 'Start'}
            </button>
            <button>Tap</button>
            {playing ? <h3 style={{"fontSize": "6em", "color":"#333"}}>{newPosition + 1}</h3> : <div></div>}
            
            </div>
        );
    }
}

export default Metronome;