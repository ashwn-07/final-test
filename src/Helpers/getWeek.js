

export default function getWeek() {

    const d = new Date ();
    let yearStart = new Date(d.getFullYear(), 0, 1);
    let today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
    let dayOfYear = ((today - yearStart + 1) / 86400000); 
    let week = Math.ceil(dayOfYear / 7);
     
  return week;
}
