/**
 * Generates an FFmpeg terminal command to synthesize a mono audio tone with different waveforms.
 * 
 * @param {string} wave - The waveform type ('sine', 'square', 'triangle', 'sawtooth').
 * @param {number} freq - The frequency in Hz (20 to 20000).
 * @param {number} duration - The duration of the tone in seconds.
 * @param {number} duty - The duty cycle percentage (1-99), used only for square waves.
 * @param {number} amplitude - The volume/amplitude level (0.05 to 1.0).
 * @param {number} sampleRate - The sample rate in Hz (e.g., 44100, 48000).
 * @param {string} outputFile - The destination filename, ending in .wav or .flac.
 * @returns {string} The formatted FFmpeg terminal command, or an error message if validation fails.
 */
function generateFFmpegAudioTone(wave, freq, duration, duty, amplitude, sampleRate, outputFile) {
  // --- Input Validation ---
  if (!wave) return "Error: missing waveform type";

  if (isNaN(freq) || freq < 20 || freq > 20000)
    return "Error: frequency must be between 20 and 20000 Hz";

  if (isNaN(duration) || duration <= 0)
    return "Error: duration must be greater than 0 s";

  if (wave === 'square') {
    if (isNaN(duty) || duty < 1 || duty > 99)
      return "Error: duty cycle must be between 1% and 99% for square wave";
  }

  if (isNaN(amplitude) || amplitude < 0.05 || amplitude > 1)
    return "Error: amplitude must be between 0.05 and 1.0";

  if (isNaN(sampleRate))
    return "Error: invalid sample rate";
    
  if (sampleRate < 8000 || sampleRate > 192000)
    return "Error: sample rate must be between 8000 and 192000 Hz";

  if (!outputFile)
    return "Error: missing output file name";

  // --- Extension Validation ---
  const validExtensions = ['.wav', '.flac'];
  const dotIndex = outputFile.lastIndexOf('.');
  
  if (dotIndex === -1 || dotIndex === 0) {
    return "Error: missing file extension in output filename (e.g., .wav, .flac)";
  }
  
  const extension = outputFile.substring(dotIndex).toLowerCase();
  if (!validExtensions.includes(extension)) {
    return `Error: unsupported extension '${extension}'. Please use .wav or .flac`;
  }

  // --- Constants and Helper Variables ---
  const dutyRatio = duty / 100;           // Duty cycle as a fraction (0.01 - 0.99)
  const pi = '3.14159265';                // String form to embed directly into the FFmpeg expression
  const t = 't';                          // FFmpeg internal time variable
  const period = 1 / freq;                // Period of one cycle (in seconds)
  const highPart = period * dutyRatio;    // Time duration of the "high" state (used for square waves)

  // --- Waveform Expressions (FFmpeg aevalsrc) ---
  // These mathematical expressions instruct FFmpeg on how to draw the waveform curve.
  const waveExprs = {
    sine:     `sin(2*${pi}*${freq}*${t})*${amplitude}`,
    square:   `if(lt(mod(${t}\\,${period.toFixed(6)})\\,${highPart.toFixed(6)})\\,${amplitude}\\,-${amplitude})`,
    triangle: `(2*abs(2*mod(${freq}*${t}\\,1)-1)-1)*${amplitude}`,
    sawtooth: `(2*mod(${freq}*${t}\\,1)-1)*${amplitude}`
  };

  // --- Dynamic Codec Configuration ---
  // The 'aevalsrc' filter natively outputs 64-bit float audio. 
  // If no 16-bit codec is specified for WAV, FFmpeg generates a 64-bit WAV file 
  // which lacks compatibility with many standard audio players.
  // We force 16-bit PCM for WAV files. FLAC automatically handles its own lossless encoding.
  const codecConfig = (extension === ".wav") ? " -c:a pcm_s16le" : "";

  // --- Build and Return FFmpeg Command ---
  return `ffmpeg -f lavfi -i "aevalsrc=${waveExprs[wave]}:s=${sampleRate}:d=${duration}"${codecConfig} ${outputFile}`;
}
