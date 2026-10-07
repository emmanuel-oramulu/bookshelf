'use strict';

export function capitalizeFirstLetter (str) {
  return str.length > 0 && str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}