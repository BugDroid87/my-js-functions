# my-js-functions
A collection of useful JavaScript functions that I have written for my personal blog.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT GUARANTEE THAT THE SOFTWARE WILL ALWAYS BE AVAILABLE OR FREE FROM ERRORS. WE RESERVE THE RIGHT TO MODIFY, SUSPEND, OR DISCONTINUE THE SOFTWARE AT ANY TIME, WITHOUT NOTICE. THE SOFTWARE IS INTENDED FOR PERSONAL USE ONLY. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, CONSEQUENTIAL OR INCIDENTAL DAMAGES OF ANY KIND, WHETHER IN CONTRACT, NEGLIGENCE OR OTHER TORT, ARISING OUT OF OR IN CONNECTION WITH THE INFORMATION, SOFTWARE, OR THE SERVICES PROVIDED BY THIS REPOSITORY.

----------------------------------------------------------------------------------
generateFFmpegAudioTone.js is a small JavaScript function that generates FFmpeg commands for creating mono audio tones with different waveforms (sine, square, triangle, sawtooth).
It validates all parameters and outputs a ready-to-run ffmpeg command.

Features:
- Supports sine, square, triangle, and sawtooth waves
- Frequency range: 20–20000 Hz
- Sampling rate: 8000–192000 Hz
- Configurable amplitude (0.05–1.0)
- Square waves support duty cycle (1–99%)
- Outputs valid FFmpeg command for .wav, .flac

 You can try it out directly on my website: https://bugdroidtech.blogspot.com/2025/09/ffmpeg-generate-audio.html


