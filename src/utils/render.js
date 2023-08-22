import green_card from '../assets/green_card.png';
import no_border from '../assets/no_border.png';
import work from '../assets/work.png';
import usa from '../assets/usa.png';

export const getColorByType = {
  'Box Truck': '#fa473a',
  'Large Straight': '#32CD32',
  'Sprinter': '#00b4d8',
  '': '#fa473a',
};

export const getIconByStatus = {
  'No Border': no_border,
  'Green Card': green_card,
  'US Citizen': usa,
  'Work authorisation': work,
};

export const metersToMiles = (distance) => {
  return (distance / 1609.344).toFixed(2);
};
