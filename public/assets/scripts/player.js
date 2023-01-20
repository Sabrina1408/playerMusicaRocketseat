import data from "./data.js";
export default {
    audio: document.createElement("audio"),
    playPause: document.querySelector(".playPause"),
    back: document.querySelector(".back"),
    next: document.querySelector(".next"),
    rangeMusic: document.querySelector(".rangeMusic"),
    currentTime: document.querySelector(".currentTime"),
    totalDuration: document.querySelector(".totalDuration"),
    playPauseImage: document.querySelector(".playPauseImage"),
    h1Player: document.querySelectorAll(".h1Player"),
    h2Player: document.querySelectorAll(".h2Player"),
    imgPlayer: document.querySelectorAll(".imgPlayer"),
    dataAudios: data,
    i: 0,
    start() {
        this.resetRange();
        this.musicInformation();
        this.audio.onended = () => this.ended();
        this.audio.ontimeupdate = () => this.timeUpdate();
        this.playPause.onclick = () => this.togglePlayPause();
        this.next.onclick = () => this.nextAudio();
        this.back.onclick = () => this.previousAudio();
        this.rangeMusic.onchange = () => this.rangeMusicChange();
    },
    resetRange() {
        this.currentTime.textContent = "00:00";
        this.totalDuration.textContent = "00:00";
        this.rangeMusic.value = 0;
    },
    musicInformation() {
        this.h1Player.forEach(element => {
            element.innerHTML = this.dataAudios[this.i].nameSong;
        });
        this.h2Player.forEach(element => {
            element.innerHTML = this.dataAudios[this.i].artist;
        });
        this.imgPlayer.forEach(element => {
            element.src = this.dataAudios[this.i].img;
        });
        let rangeUpdate;
        rangeUpdate = setInterval(() => {
            let position = 0;
            if(!isNaN(this.audio.duration)) {
                position = this.audio.currentTime * (100/this.audio.duration);
                this.rangeMusic.value = position;
            }
        }, 1000);
        clearInterval(timerUpdate);
    },
    ended() {
        if(this.i < this.dataAudios.length-1){
            this.i++;
            this.audio.src = this.dataAudios[this.i].song;
            this.audio.play();
            this.musicInformation();
        } else {
            this.i=0;
            this.audio.src = this.dataAudios[this.i].song;
            this.audio.play();
            this.musicInformation();
        }
    },
    togglePlayPause() {
        if(this.audio.paused == true) {
            this.audio.src = this.dataAudios[this.i].song; /* Toda vez que da play procura de novo */
            this.audio.play();
            this.musicInformation();
            this.playPauseImage.src = "public/assets/img/pause.svg";
            timerUpdate = setInterval(() => {
                let presentTime;
                let totalDuration;
                presentTime = Math.floor(this.audio.currentTime);
                totalDuration = (this.audio.duration/60).toFixed(2)
            }, 1000);
        } else {
            this.audio.pause();
            this.playPauseImage.src = "public/assets/img/play.svg";
        }
    },
    nextAudio() {
        this.i++;
        if(this.i >= this.dataAudios.length){
            this.i = 0;
        }
        if(this.audio.paused == true){
            this.playPauseImage.src = "public/assets/img/pause.svg";
        }
        this.musicInformation();
        this.audio.src = this.dataAudios[this.i].song;
        this.audio.play();
        },
    previousAudio() {
        this.i--;
        if(this.i<0){
            this.i = 0;
        }
        if(this.audio.paused == true){
            this.playPauseImage.src = "public/assets/img/pause.svg";
        }
        this.musicInformation();
        this.audio.src = this.dataAudios[this.i].song;
        this.audio.play();
    },
    timeUpdate() {
        if(this.audio.duration){
            let curMins = Math.floor(this.audio.currentTime/60);
            let curSecs = Math.floor(this.audio.currentTime - curMins*60);
            let durMins = Math.floor(this.audio.duration/60);
            let durSecs = Math.floor(this.audio.duration - durMins*60);
            if(durSecs<10){
                durSecs = "0"+durSecs;
            }
            if(durMins<10){
                durMins = "0"+durMins;
            }
            if(curMins<10){
                curMins = "0"+curMins;
            }
            if(curSecs<10){
                curSecs = "0"+curSecs;
            }
            this.currentTime.innerHTML = `${curMins}:${curSecs}`;
            this.totalDuration.innerHTML = `${durMins}:${durSecs}`;
        } else {
            this.currentTime.innerHTML = "00:00";
            this.totalDuration.innerHTML = "00:00";
        }
    },
    rangeMusicChange() {
        let positionRange = this.audio.duration * (this.rangeMusic.value/100);
        this.audio.currentTime = positionRange;
    }

}
let timerUpdate;
// timerUpdate pra dentro do objeto
// Pegar todos os elementos
// Não está funcionando no Opera, mas funciona no Edge e Chrome
// Pause vai mais reinicia a musica