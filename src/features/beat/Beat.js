import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    displayClipName, 
    toggleBank, 
    powerControl,
    adjustVolume,
    selectPower,
    selectDisplayBankName,
    selectDisplayClipName,
    selectDisplayVolumeName,
    selectCurrentPadBank,
    selectSliderVal,
    selectPowerFloat,
    selectBankFloat,
} from './beatSlice';
import styles from './Beat.module.scss';
import { inactiveStyle, activeStyle } from './padStyles';

export function Bapp() {
    const sliderVal = useSelector(selectSliderVal);
    const bankDisplay = useSelector(selectDisplayBankName);
    const clipDisplay = useSelector(selectDisplayClipName);
    const volumeDisplay = useSelector(selectDisplayVolumeName);
    const powerFloat = useSelector(selectPowerFloat);
    const bankFloat = useSelector(selectBankFloat);
    const power = useSelector(selectPower);

    const dispatch = useDispatch();
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
        sound.volume = sliderVal;
    });
    return (
        <div className={styles.container} id='drum-machine' >
            
            <div className={styles.logo}>
                <i class="fa-solid fa-2x fa-drum"></i>
            </div>

            <div className={styles.controlsContainer}>
                <div className={styles.control} id={styles.powerButton}>
                    <div className={styles.select} onClick={() => dispatch(powerControl())}>
                        <div 
                            className={styles.inner}
                            style={powerFloat}
                            >
                        </div>
                    </div>
                    <p>POWER</p>
                </div>
                <p id='bank-display' className={styles.display}>{bankDisplay}</p>
                <div className={styles.control}>
                    <div className={styles.select} onClick={() => dispatch(toggleBank())}>
                        <div className={styles.inner} style={bankFloat} />
                    </div>
                    <p>BANK</p>
                </div>
                <p id='display' className={styles.display}>{clipDisplay}</p>
                <p id='volume-display' className={styles.display}>{ power ? volumeDisplay : ' '}</p>
                <div className={styles.volumeSlider}>
                    <input
                        max='1'
                        min='0'
                        onChange={(e) => dispatch(adjustVolume(e.target.value))}
                        step='0.01'
                        type='range'
                        value={sliderVal}
                    />
                </div>
               
            </div>
            <PadBank />
        </div>
    );
}

function PadBank(props) {
        let padBank;
        const power = useSelector(selectPower);
        const currentPadBank = useSelector(selectCurrentPadBank);

        if (power) {
            padBank = currentPadBank.map((drumObj, i, padBankArr) => {
                return (
                    <DrumPad
                        clip={padBankArr[i].url}
                        clipId={padBankArr[i].id}
                        keyCode={padBankArr[i].keyCode}
                        keyTrigger={padBankArr[i].keyTrigger}
                        power={power}
                        updateDisplay={currentPadBank}
                    />
                );
            });
        } else {
            padBank = currentPadBank.map((drumObj, i, padBankArr) => {
                return (
                    <DrumPad
                        clip='#'
                        clipId={padBankArr[i].id}
                        keyCode={padBankArr[i].keyCode}
                        keyTrigger={padBankArr[i].keyTrigger}
                        power={power}
                        updateDisplay={currentPadBank}
                    />
                );
            });
        }
        return <div className={styles.padBank}>{padBank}</div>;
}

function DrumPad(props) {
    const [padStyle, setPadStyle] = useState(inactiveStyle);
    const power = useSelector(selectPower);
    const dispatch = useDispatch();

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyPress);
        };
    });
    const handleKeyPress = (e) => {
        if (e.keyCode === props.keyCode) {
            playSound();
        }
    };
 
    const playSound = () => {
        const sound = document.getElementById(props.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        activatePad();
        dispatch(displayClipName(props.clipId.replace(/-/g, ' ')));
    };
    function activatePad() {
        if (power) {
            setPadStyle(activeStyle);
            setTimeout(() => setPadStyle(inactiveStyle), 100);
        } else {
            setPadStyle(inactiveStyle);
        }
    }
    return (
        <div className={styles.padButtonContiner} >
        <div
            className={styles.drumPad + ' drum-pad'}
            id={props.clipId}
            onClick={playSound}
            style={padStyle}
        >
            <audio
                className='clip'
                id={props.keyTrigger}
                src={props.clip}
            />
            {props.keyTrigger}
        </div>
        </div>
    );
}