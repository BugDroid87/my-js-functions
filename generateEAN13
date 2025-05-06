/**
 * generateEAN13
 * -------------
 * Generates a symbolic representation of an EAN-13 barcode using character sets.
 * Inspired by: https://grandzebu.net/informatique/codbar-en/ean13.htm
 *
 * @param {string} input - A string containing 12 or 13 digits.
 *                         If 13 digits are provided, the last is ignored and recalculated.
 * @returns {string} A character-based encoded string or an error message if input is invalid.
 */
function generateEAN13(input) {
  // Remove leading/trailing whitespace and validate with regex
  const digits = input.trim();
  if (!/^\d{12,13}$/.test(digits)) return "error: invalid input";

  // Use only the first 12 digits for encoding and checksum calculation
  const code = digits.slice(0, 12);

	// Calculate checksum using the EAN-13 algorithm
  // Multiply digits at even indexes (i % 2 !== 0) by 3, others by 1
  const checksum = (10 - [...code].reduce((sum, digit, i) =>
    sum + parseInt(digit) * (i % 2 === 0 ? 1 : 3), 0) % 10) % 10;

  // Character sets for symbolic representation:
  // Set A: left-side digits encoded with odd parity
  // Set B: left-side digits encoded with even parity
  // Set C: right-side digits
  const charSets = [
    'ABCDEFGHIJ', // Set A
    'KLMNOPQRST', // Set B
    'abcdefghij'  // Set C
  ];

  // Encoding patterns for the first six digits based on the first digit
  const patterns = [
    'AAAAAA', 'AABABB', 'AABBAB', 'AABBBA', 'ABAABB',
    'ABBAAB', 'ABBBAA', 'ABABAB', 'ABABBA', 'ABBABA'
  ];

  // Select the encoding pattern based on the first digit
  const pattern = patterns[parseInt(code[0])];

  // Build the encoded barcode representation
  const encoded = [
    code[0], // First digit (not encoded; used to select pattern)

    // Encode digits 2–7 (positions 1 to 6) using pattern A/B
    ...code.slice(1, 7).split('').map((digit, i) =>
      charSets[pattern[i] === 'A' ? 0 : 1][parseInt(digit)]
    ),

    '*', // Center guard (symbolic separator)

    // Encode digits 8–12 using Set C
    ...code.slice(7).split('').map(digit =>
      charSets[2][parseInt(digit)]
    ),

    // Encode checksum digit using Set C
    charSets[2][checksum],

    '+' // Final guard (symbolic separator)
  ].join('');

  return encoded;
}
