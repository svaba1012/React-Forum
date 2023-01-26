const printDate = (dateStr) => {
  let date = new Date(dateStr);
  let curDate = new Date();
  let diff = (curDate.getTime() - date.getTime()) / 1000;

  if (diff < 3600) {
    let minutes = Math.ceil(diff / 60);
    if (minutes === 1) {
      return `${minutes} minute ago`;
    }
    return `${minutes} minutes ago`;
  } else if (diff < 24 * 3600) {
    let hours = Math.ceil(diff / 3600);
    if (hours === 1) {
      return `${hours} hour ago`;
    }
    return `${hours} hours ago`;
  } else {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedDate = "on " + dd + "/" + mm + "/" + yyyy;
    return formattedDate;
  }
};

const printPeriod = (dateStr) => {
  let date = new Date(dateStr);
  let curDate = new Date();
  let diff = (curDate.getTime() - date.getTime()) / 1000 / 3600 / 24;

  if (diff < 7) {
    let days = Math.ceil(diff);
    if (days === 1) {
      return `${days} day`;
    }
    return `${days} days`;
  } else if (diff < 30) {
    let weeks = Math.floor(diff / 7);
    if (weeks === 1) {
      return `${weeks} week`;
    }
    return `${weeks} weeks`;
  } else {
    let years = Math.floor(diff / 365);
    let mounths = Math.floor((diff % 365) / 30);
    let yearText = " year and ";
    let mounthText = " month ";
    if (years === 0) {
      years = "";
      yearText = "";
    } else if (years > 1) {
      yearText = " years and ";
    }
    if (mounths === 0) {
      mounths = "";
      mounthText = "";
    } else if (mounths > 1) {
      mounthText += " months";
    }
    return years + yearText + mounths + mounthText;
  }
};

export { printDate, printPeriod };
