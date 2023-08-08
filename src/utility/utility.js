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

  let formattedTimePassed = "";
  if (days > 0) {
    formattedTimePassed = `${days} days ago`;
  } else if (hours > 0) {
    formattedTimePassed = `${hours} hours ago`;
  } else if (minutes > 0) {
    formattedTimePassed = `${minutes} minutes ago`;
  } else {
    formattedTimePassed = `${seconds} seconds ago`;
  }

  return formattedTimePassed;
};
