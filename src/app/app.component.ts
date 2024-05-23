import { Component } from '@angular/core';
import Speech from 'speak-tts';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  text = '';
  speech: any;
  speechData: any;

  constructor() {
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log('speech synthesis supported');
      this.speech
        .init({
          volume: 1,
          lang: 'en-GB',
          rate: 1,
          pitch: 1,
          voice: 'Google UK English Male',
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log('Event voiceschanged', voices);
            },
          },
        })
        .then((data) => {
          // The "data" object contains the list of available voices and the voice synthesis params
          console.log('Speech is ready, voices are available', data);
          this.speechData = data;
          data.voices.forEach((voice) => {
            console.log(voice.name + ' ' + voice.lang);
          });
        })
        .catch((e) => {
          console.error('An error occured while initializing : ', e);
        });
    }
  }

  start() {
    console.log('start');
    this.speech
      .speak({
        text: this.text,
      })
      .then(() => {
        console.log('Success !');
      })
      .catch((e) => {
        console.error('An error occurred :', e);
      });
  }
  pause() {
    this.speech.pause();
    console.log('pause');
  }
  resume() {
    this.speech.resume();
    console.log('resume');
  }

  setLanguage(i) {
    console.log(i);
    console.log(
      this.speechData.voices[i].lang + this.speechData.voices[i].name
    );
    this.speech.setLanguage(this.speechData.voices[i].lang);
    this.speech.setVoice(this.speechData.voices[i].name);
  }
}
