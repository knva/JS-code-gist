 class MusicBox {
        constructor(options) {
            let defaults = {
                loop: false,
                musicText: '',
                autoplay: false,
                type: 'sine',
                duration: 2
            };
            this.arrFrequency = [262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319, 1397, 1568, 1760, 1967];
            this.arrNotes = ['·1', '·2', '·3', '·4', '·5', '·6', '·7', '1', '2', '3', '4', '5', '6', '7', '1·', '2·', '3·', '4·', '5·', '6·', '7·'];
            this.opts = Object.assign(defaults, options);
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.opts.autoplay && this.playMusic(this.opts.musicText, this.opts.autoplay)
        }
        createSound(freq) {
            let oscillator = this.audioCtx.createOscillator();
            let gainNode = this.audioCtx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(this.audioCtx.destination);
            oscillator.type = this.opts.type;
            oscillator.frequency.value = freq;
            gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01);
            oscillator.start(this.audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.opts.duration);
            oscillator.stop(this.audioCtx.currentTime + this.opts.duration)
        }
        createMusic(note) {
            let index = this.arrNotes.indexOf(note);
            if (index !== -1) {
                this.createSound(this.arrFrequency[index])
            }
        }
        pressBtn(i) {
            this.createSound(this.arrFrequency[i])
        }
        playMusic(musicText, speed = 2) {
            let i = 0,
                musicArr = musicText.split(' ');
            let timer = setInterval(() => {
                try {
                    let n = this.arrNotes.indexOf(musicArr[i]);
                    if (musicArr[i] !== '-' && musicArr[i] !== '0') {
                        this.pressBtn(n)
                    }
                    i++;
                    if (i >= musicArr.length) {
                        this.opts.loop ? i = 0 : clearInterval(timer)
                    }
                } catch (e) {
                    alert('请输入正确的乐谱！');
                    clearInterval(timer)
                }
            }, 1000 / speed);
            return timer
        }
    };
