import {createSlice } from '@reduxjs/toolkit';
import { bankOne, bankTwo } from './audioBank';

const initialState = {
    keycode: 0,
    power: true,
    status: 'idle',
    bankDisplay: 'Heater Kit', //display a space intially
    clipDisplay: String.fromCharCode(160), //display a space intially
    volumeDisplay: 'VOLUME: 30', //display a space intially
    currentPadBank: bankOne,
    currentPadBankId: 'Heater Kit',
    sliderVal: 0.3,
    powerFloat: {float: 'right'},
    bankFloat: {float: 'left'}
};

export const beatSlice = createSlice({
    name: 'beat',
    initialState,
    reducers: {
        displayClipName: (state, action) => {
            if (state.power){
                state.clipDisplay = action.payload;
            } else {
                state.clipDisplay = String.fromCharCode(160);
            }
        },
        toggleBank: (state) => {
            if (state.power){
                if (state.currentPadBankId === 'Heater Kit') {
                    state.currentPadBank = bankTwo;
                    state.bankDisplay = 'Smooth Piano Kit';
                    state.currentPadBankId = 'Smooth Piano Kit';
                    state.bankFloat = {float: 'right'};
                } else {
                    state.currentPadBank = bankOne;
                    state.bankDisplay = 'Heater Kit';
                    state.currentPadBankId = 'Heater Kit';
                    state.bankFloat = {float: 'left'};
                }
            } else {
                if (state.currentPadBankId === 'Heater Kit') {
                    state.currentPadBank = bankTwo;
                    state.bankDisplay = String.fromCharCode(160);
                    state.currentPadBankId = 'Smooth Piano Kit';
                    state.bankFloat = {float: 'right'};
                } else {
                    state.currentPadBank = bankOne;
                    state.bankDisplay = String.fromCharCode(160);
                    state.currentPadBankId = 'Heater Kit';
                    state.bankFloat = {float: 'left'};
                }
            }
        },
        bankSlider: (state) => {
            if (state.currentPadBank === bankOne) {
                state.powerFloat = 'float: left';
            } else {
                state.powerFloat = 'float: right';
            }
        },
        powerControl: (state) => {
            state.power = !state.power;
            if (state.power) {
                state.powerFloat = {float: 'right'};
                state.bankDisplay = state.currentPadBankId;
                state.clipDisplay = String.fromCharCode(160);
            } else {
                state.powerFloat = {float: 'left'};
                state.bankDisplay = String.fromCharCode(160);
                state.clipDisplay = String.fromCharCode(160);
            }
        },
        powerSlider: (state) => {
            if (state.power) {
                state.powerFloat = {float: 'right'};
            } else {
                state.powerFloat = {float: 'left'};
            }
        },
        adjustVolume: (state, action) => {
            if (state.power) {
                state.sliderVal = action.payload;
                state.volumeDisplay = 'VOLUME: ' + Math.round(action.payload * 100);
            }
        },
        clearDisplay: (state) => {
            state.bankDisplay = String.fromCharCode(160);
            state.soundDisplay = String.fromCharCode(160);
        }
    }
});

export const { 
    displayClipName,
    toggleBank, 
    powerControl,
    adjustVolume,
    clearDisplay,
    powerSlider,
    bankSlider,
    activatePad
} = beatSlice.actions;

export const selectCount = (state) => state.beat.value;
export const selectPower = (state) => state.beat.power;
export const selectStatus = (state) => state.beat.status;
export const selectDisplayBankName = (state) => state.beat.bankDisplay;
export const selectDisplayClipName = (state) => state.beat.clipDisplay;
export const selectDisplayVolumeName = (state) => state.beat.volumeDisplay;
export const selectCurrentPadBank = (state) => state.beat.currentPadBank;
export const selectCurrentPadBankId = (state) => state.beat.currentPadBankId;
export const selectSliderVal = (state) => state.beat.sliderVal;
export const selectPadStyle = (state) => state.beat.padStyle;
export const selectPowerFloat = (state) => state.beat.powerFloat;
export const selectBankFloat = (state) => state.beat.bankFloat;

export default beatSlice.reducer;
