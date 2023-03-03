// Exceptional   99.5 - 100
// Very Rare     98.5 - 99.4
// Rare          96.5 - 98.4
// Fairly Rare   92.5 - 96.4
// Uncommon      84.5 - 92.4
// Fairly Common 68.5 - 84.4
// Common        36.5 - 68.4
// Very Common   0    - 36.4

export const getCoinRarity = (
  index: number
):
  | 'common'
  | 'exceptional'
  | 'fairly-common'
  | 'fairly-rare'
  | 'rare'
  | 'uncommon'
  | 'very-common'
  | 'very-rare' => {
  if (index >= 99.5) {
    return 'exceptional';
  } else if (index >= 98.5) {
    return 'very-rare';
  } else if (index >= 96.5) {
    return 'rare';
  } else if (index >= 92.5) {
    return 'fairly-rare';
  } else if (index >= 84.5) {
    return 'uncommon';
  } else if (index >= 68.5) {
    return 'fairly-common';
  } else if (index >= 36.5) {
    return 'common';
  } else if (index >= 0) {
    return 'very-common';
  }
  return 'very-common';
};

// URS-1 = 1 known, unique
// URS-2 = 2 known
// URS-3 = 3 or 4
// URS-4 = 5 to 8
// URS-5 = 9 to 16
// URS-6 = 17 to 32
// URS-7 = 33 to 64
// URS-8 = 65 to 124
// URS-9 = 125 to 249
// URS-10 = 250 to 499
// URS-11 = 500 to 999
// URS-12 = 1,000 to 1,999
// URS-13 = 2,000 to 3,999
// URS-14 = 4,000 to 7,999
// URS-15 = 8,000 to 15,999
// URS-16 = 16,000 to 31,999
// URS-17 = 32,000 to 64,999
// URS-18 = 65,000 to 124,999
// URS-19 = 125,000 to 249,999

// // Double the previous number
// URS-20 = 250,000 to 499,999
// URS-21 = 500,000 to 999,999
// URS-22 = 1,000,000 to 1,999,999
// URS-23 = 2,000,000 to 3,999,999
// URS-24 = 4,000,000 to 7,999,999
// URS-25 = 8,000,000 to 15,999,999
// URS-26> = same progression

export const getURS = (minted: number): string => {
  if (minted === 0) {
    return 'No known copies';
  } else if (minted === 1) {
    return 'URS-1';
  } else if (minted === 2) {
    return 'URS-2';
  } else if (minted >= 3 && minted <= 4) {
    return 'URS-3';
  } else if (minted >= 5 && minted <= 8) {
    return 'URS-4';
  } else if (minted >= 9 && minted <= 16) {
    return 'URS-5';
  } else if (minted >= 17 && minted <= 32) {
    return 'URS-6';
  } else if (minted >= 33 && minted <= 64) {
    return 'URS-7';
  } else if (minted >= 65 && minted <= 124) {
    return 'URS-8';
  } else if (minted >= 125 && minted <= 249) {
    return 'URS-9';
  } else if (minted >= 250 && minted <= 499) {
    return 'URS-10';
  } else if (minted >= 500 && minted <= 999) {
    return 'URS-11';
  } else if (minted >= 1000 && minted <= 1999) {
    return 'URS-12';
  } else if (minted >= 2000 && minted <= 3999) {
    return 'URS-13';
  } else if (minted >= 4000 && minted <= 7999) {
    return 'URS-14';
  } else if (minted >= 8000 && minted <= 15999) {
    return 'URS-15';
  } else if (minted >= 16000 && minted <= 31999) {
    return 'URS-16';
  } else if (minted >= 32000 && minted <= 64999) {
    return 'URS-17';
  } else if (minted >= 65000 && minted <= 124999) {
    return 'URS-18';
  } else if (minted >= 125000 && minted <= 249999) {
    return 'URS-19';
  }

  let min = 250000;
  let max = 499999;

  for (let i = 20; i < 100; i++) {
    if (minted >= min && minted <= max) {
      return `URS-${i}`;
    }
    min *= 2;
    max = min * 2 - 1;
  }

  return 'URS-0';
};
