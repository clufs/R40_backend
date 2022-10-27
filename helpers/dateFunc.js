const fns = require('date-fns')
// const es = require('date-fns/locale')
// import {es} from 'date-fns/locale'

const getFormatDistanceToNow = (date) => {

  const fromNow = fns.formatDistanceToNow(date , {locale: es}); //esto de locale: es para cambiar el idioma

  return `hace ${fromNow}`
};


const setDateFormat = (date) => {

  const newDate = fns.format( date, 'MM/yyyy').toString();
  return newDate

}

module.exports = {getFormatDistanceToNow, setDateFormat}