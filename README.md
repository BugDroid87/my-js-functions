# my-js-functions
A collection of useful JavaScript functions that I have written for my personal blog.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT GUARANTEE THAT THE SOFTWARE WILL ALWAYS BE AVAILABLE OR FREE FROM ERRORS. WE RESERVE THE RIGHT TO MODIFY, SUSPEND, OR DISCONTINUE THE SOFTWARE AT ANY TIME, WITHOUT NOTICE. THE SOFTWARE IS INTENDED FOR PERSONAL USE ONLY. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, CONSEQUENTIAL OR INCIDENTAL DAMAGES OF ANY KIND, WHETHER IN CONTRACT, NEGLIGENCE OR OTHER TORT, ARISING OUT OF OR IN CONNECTION WITH THE INFORMATION, SOFTWARE, OR THE SERVICES PROVIDED BY THIS REPOSITORY.

----------------------------------------------------------------------------------
MakeNumbersCSV.js contains a simple and efficient JavaScript function designed to generate CSV files for numbering printed items, such as raffle tickets. It eliminates the need for spreadsheets by directly creating a CSV file from the script, making the process faster and more flexible.
This is particularly useful for integrating the Data Merge/Variable Print function in graphical software like Adobe InDesign.

You can try it out directly on my website: https://bugdroidtech.blogspot.com/2025/01/csv-numbering-tool-for-printing-items.html

Features:
- Automatically generates sequential numbers for printing.
- Outputs a CSV file easily imported into InDesign's Data Merge/Variable Print feature or similar software.
- Ideal for numbered items such as raffle tickets, invoices, or lots.
- Simple and efficient without requiring spreadsheets.
- The items quantity and sheets to print are adjusted based on items per sheet (numerators) and sheets per blocks. The function will inform you accordingly.

----------------------------------------------------------------------------------
generateEAN13.js provides a lightweight JavaScript function that generates an alphanumeric string compatible with the EAN13.TTF font by GrandZebu.net.  
Instead of rendering graphical barcodes, this function outputs a **text-based EAN-13 encoding** using character sets, designed to be displayed using the barcode font.
It follows the official EAN-13 structure and encoding rules, as described by GrandZebu:  
https://grandzebu.net/informatique/codbar-en/ean13.htm

You can try it out directly on my website: https://bugdroidtech.blogspot.com/2025/01/ean13-ttf-bulk-encoder.html

----------------------------------------------------------------------------------
A small JavaScript utility that generates FFmpeg commands for creating audio tones with different waveforms (sine, square, triangle, sawtooth).
It validates all parameters and outputs a ready-to-run ffmpeg command.

Features:
- Supports sine, square, triangle, and sawtooth waves
- Frequency range: 20–20000 Hz
- Sampling rate: 8000–192000 Hz
- Configurable amplitude (0.05–1.0)
- Square waves support duty cycle (1–99%)
- Outputs valid FFmpeg command for .wav, .mp3, .flac, etc.

 You can try it out directly on my website: https://bugdroidtech.blogspot.com/2025/09/ffmpeg-generate-audio.html


