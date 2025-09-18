/**
 * Generate an FFmpeg command for creating audio tones with different waveforms.
 *
 * Supported waveforms: sine, square, triangle, sawtooth.
 *
 * @param {string} wave - The waveform type ("sine", "square", "triangle", "sawtooth").
 * @param {number} freq - Frequency in Hz (20–20000).
 * @param {number} duration - Duration in seconds (> 0).
 * @param {number} duty - Duty cycle percentage (only for square wave, 1–99).
 * @param {number} amplitude - Amplitude factor (0.05–1.0).
 * @param {number} sampleRate - Sampling rate in Hz (8000–192000).
 * @param {string} outputFile - Output file name (e.g., "tone.wav" or "tone.mp3").
 * @returns {string} FFmpeg command string or an error message.
 */
function generateFFmpegAudioTone(wave, freq, duration, duty, amplitude, sampleRate, outputFile) {
  // --- Input validation ---
  if (!wave) return "Error: select a waveform type";

  if (isNaN(freq) || freq < 20 || freq > 20000)
    return "Error: frequency must be between 20 and 20000 Hz";

  if (isNaN(duration) || duration <= 0)
    return "Error: duration must be greater than 0 s";

  if (wave === 'square') {
    if (isNaN(duty) || duty < 1 || duty > 99)
      return "Error: Duty Cycle must be between 1% and 99% for square wave";
  }

  if (isNaN(amplitude) || amplitude < 0.05 || amplitude > 1)
    return "Error: amplitude must be between 0.05 and 1.0";

  if (isNaN(sampleRate))
    return "Error: invalid sample rate";
  if (sampleRate < 8000 || sampleRate > 192000)
    return "Error: sample rate must be between 8000 and 192000 Hz";

  if (!outputFile)
    return "Error: missing output file name";

  // --- Constants and helper variables ---
  const dutyRatio = duty / 100;           // Duty cycle as fraction (0.0–1.0)
  const pi = '3.14159265';                // Use string form to embed into FFmpeg expression
  const t = 't';                          // FFmpeg time variable
  const period = 1 / freq;                // Period of one cycle (seconds)
  const highPart = period * dutyRatio;    // Time duration of the "high" state for square wave

  // --- Waveform expressions (FFmpeg aevalsrc) ---
  const waveExprs = {
    sine:     `sin(2*${pi}*${freq}*${t})*${amplitude}`,
    square:   `if(lt(mod(${t}\\,${period.toFixed(6)})\\,${highPart.toFixed(6)})\\,${amplitude}\\,-${amplitude})`,
    triangle: `(2*abs(2*mod(${freq}*${t}\\,1)-1)-1)*${amplitude}`,
    sawtooth: `(2*mod(${freq}*${t}\\,1)-1)*${amplitude}`
  };

  // --- Build FFmpeg command ---
  return `ffmpeg -f lavfi -i "aevalsrc=${waveExprs[wave]}:s=${sampleRate}:d=${duration}" -c:a pcm_s16le ${outputFile}`;
}
