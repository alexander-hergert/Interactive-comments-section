export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getPostingTime = (postingDate) => {
  const postingTimestamp = postingDate;
  const currentTime = new Date().getTime();
  const timePassed = currentTime - postingTimestamp;
  const seconds = Math.floor(timePassed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  let formattedTimePassed = "";
  if (years > 1) {
    formattedTimePassed = `${years} years ago`;
  } else if (years > 0) {
    formattedTimePassed = `${years} year ago`;
  } else if (months > 1) {
    formattedTimePassed = `${months} months ago`;
  } else if (months > 0) {
    formattedTimePassed = `${months} month ago`;
  } else if (weeks > 1) {
    formattedTimePassed = `${weeks} weeks ago`;
  } else if (weeks > 0) {
    formattedTimePassed = `${weeks} week ago`;
  } else if (days > 1) {
    formattedTimePassed = `${days} days ago`;
  } else if (days > 0) {
    formattedTimePassed = `${days} day ago`;
  } else if (hours > 1) {
    formattedTimePassed = `${hours} hours ago`;
  } else if (hours > 0) {
    formattedTimePassed = `${hours} hour ago`;
  } else if (minutes > 1) {
    formattedTimePassed = `${minutes} minutes ago`;
  } else if (minutes > 0) {
    formattedTimePassed = `${minutes} minute ago`;
  } else {
    formattedTimePassed = `few seconds ago`;
  }
  return formattedTimePassed;
};

export const saveLocalData = (data) => {
  const serializedData = JSON.stringify(data);
  localStorage.setItem("localData", serializedData);
};

export const readLocalData = () => {
  const serializedData = localStorage.getItem("localData");
  if (serializedData) {
    return JSON.parse(serializedData);
  }
  return null;
};
