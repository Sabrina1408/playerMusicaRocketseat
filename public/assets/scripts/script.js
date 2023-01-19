const player = {
    audio: document.createElement("audio"),
    play: document.querySelector(".play"),
    back: document.querySelector(".back"),
    next: document.querySelector(".next"),
    rangeMusic: document.querySelector(".rangeMusic"),
    currentTime: document.querySelector(".currentTime"),
    totalDuration: document.querySelector(".totalDuration"),
    playPauseImage: document.querySelector(".playPauseImage"),
    h1Player: document.querySelectorAll(".h1Player"),
    h2Player: document.querySelectorAll(".h2Player"),
    imgPlayer: document.querySelectorAll(".imgPlayer"),
    list: [
        {
            nameSong: "Acorda Devinho",
            artist: "Banda Rocketseat",
            img: "public/assets/img/acordapedrinho.png",
            song: "public/assets/audio/acorda-pedrinho.mp3"
        },
        {
            nameSong: "Universo de coisas que eu desconheço",
            artist: "Lagum e Anavitória",
            img: "public/assets/img/universo.jpg",
            song: "public/assets/audio/universo-de-coisas-que-eu-desconheço.mp3"
        },
        {
            nameSong: "MAMA.CITA (hasta la vista)",
            artist: "Luísa Sonza, Xamã",
            img: "public/assets/img/mamacita.jpg",
            song: "public/assets/audio/mama-cita-hasta-la-vista.mp3"
        }
    ],
    start() {
        let i = 0;
        let timerUpdate;
        resetRange();

        function musicInformation() {
            player.h1Player.forEach(element => {
                element.innerHTML = player.list[i].nameSong;
            });
            player.h2Player.forEach(element => {
                element.innerHTML = player.list[i].artist;
            });
            player.imgPlayer.forEach(element => {
                element.src = player.list[i].img;
            });
            rangeUpdate = setInterval(() => {
                let position = 0;
                if(!isNaN(player.audio.duration)) {
                    position = player.audio.currentTime * (100/player.audio.duration);
                    player.rangeMusic.value = position;
                }
            }, 1000);
            clearInterval(timerUpdate);
        }

        window.addEventListener("load", () => {
            console.log("page is fully loaded");
            musicInformation();
        });

        function resetRange() {
            player.currentTime.textContent = "00:00";
            player.totalDuration.textContent = "00:00";
            player.rangeMusic.value = 0;
        }

        player.audio.addEventListener("timeupdate", () => {
            if(player.audio.duration){
                let curMins = Math.floor(player.audio.currentTime/60);
                let curSecs = Math.floor(player.audio.currentTime - curMins*60);
                let durMins = Math.floor(player.audio.duration/60);
                let durSecs = Math.floor(player.audio.duration - durMins*60);
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
                player.currentTime.innerHTML = `${curMins}:${curSecs}`;
                player.totalDuration.innerHTML = `${durMins}:${durSecs}`;
            } else {
                /* player.currentTime.innerHTML = "00:00";
                player.totalDuration.innerHTML = "00:00"; */
            }
        });

        this.play.addEventListener("click", () => {
            if(this.audio.paused == true) {
                console.log("play: "+i);
                this.audio.src = this.list[i].song;
                this.audio.play();
                musicInformation();
                this.playPauseImage.src = "public/assets/img/pause.svg";
                timerUpdate = setInterval(() => {
                    presentTime = Math.floor(this.audio.currentTime);
                    totalDuration = (this.audio.duration/60).toFixed(2)
                }, 1000);
            } else {
                this.audio.pause();
                this.playPauseImage.src = "public/assets/img/play.svg";
            }
        });

        this.audio.addEventListener("ended", () => {
            if(i < this.list.length-1){
                i+=1;
                this.audio.src = player.list[i].song;
                this.audio.play();
                musicInformation();
            } else {
                i=0;
                this.audio.src = player.list[i].song;
                this.audio.play();
                musicInformation();
            }
        });
        this.rangeMusic.addEventListener("change", () => {
            let positionRange = this.audio.duration * (player.rangeMusic.value/100);
            this.audio.currentTime = positionRange;
        });
    
        this.back.addEventListener("click", () => {
            console.log("back: "+i);
            i--;
            if(i<=this.list.length){
                i=0;
            }
            if(this.audio.paused == true){
                this.playPauseImage.src = "public/assets/img/pause.svg";
            }
            musicInformation();
            this.audio.src = this.list[i].song;
            this.audio.play();
        });

        this.next.addEventListener("click", () => {
            console.log("next: "+i);
            i++;
            if(i>=this.list.length){
                i=0;
            }
            if(this.audio.paused == true){
                this.playPauseImage.src = "public/assets/img/pause.svg";
            }
            musicInformation();
            this.audio.src = this.list[i].song;
            this.audio.play();
        });
    }
}
player.start();

// back e next estão com i errado
// Pegar todos os elementos
// Não está funcionando no Opera, mas funciona no Edge e Chrome
// Pause vai mais reinicia a musica