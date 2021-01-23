import React from 'react'
import './Drone.css'
import * as Tone from 'tone'
import StartAudioContext from 'startaudiocontext'
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';


export const Drone = () => {


// const handleDrone = () => {
//     StartAudioContext(Tone.context)
//     const synth = new Tone.Synth();
//     const pDelay = new Tone.PingPongDelay();
//     synth.connect(pDelay);
//     pDelay.connect(Tone.Destination);
//     synth.triggerAttackRelease('C4', '2m')

//     console.log('hi')
// }

const handleDrone = () => {
    // const newValue = 
    StartAudioContext(Tone.context)
    const now = Tone.now()
    const synth = new Tone.PolySynth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 1.5,
            decay: 1,
            sustain: 1,
            release: 1.5,
        },
    });
    // const filter = new Tone.AutoFilter(4).start();
    const filter = new Tone.Filter(2000, "lowpass")
    const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5)
    const verb = new Tone.Reverb(1)
    const wide = new Tone.StereoWidener()
    synth.chain( filter, verb, wide, Tone.Destination)
    synth.volume.value = value -100
    synth.triggerAttack(["C3", "C4", "Eb4", "G4"], now)


}

const [value, setValue] = React.useState(100);

const handleVolChange = (event, newValue) => {
setValue(newValue);
};

    return (
        <div className="Drone">
            <button onClick={handleDrone}>Drone</button>
            <div style={{width: "15em"}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider value={value} onChange={handleVolChange} aria-labelledby="continuous-slider" />
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
