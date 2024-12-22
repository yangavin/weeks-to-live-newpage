// Assuming the .env file is hosted on the same server
async function loadEnv() {
  const response = await fetch(".env");
  const envData = await response.text();
  const envLines = envData.split("\n");
  const envVariables = {};

  envLines.forEach((line) => {
    // Ignore comments and empty lines
    if (line && !line.startsWith("#")) {
      const [key, value] = line.split("=");
      if (key && value) {
        envVariables[key.trim()] = value.trim();
      }
    }
  });

  return envVariables;
}

async function getWeeksLeft() {
  // Your birthday
  const env = await loadEnv();
  const birthYear = env["BIRTHYEAR"];
  const birthMonth = Number(env["BIRTHMONTH"]) - 1;
  const birthDay = env["BIRTHDAY"];
  const birthDate = new Date(birthYear, birthMonth, birthDay);

  // Expected lifespan in years
  const lifespan = 90;

  // Current date
  const currentDate = new Date();

  // Calculate the date of your 90th birthday
  const endOfLifeDate = new Date(birthDate);
  endOfLifeDate.setFullYear(birthDate.getFullYear() + lifespan);

  // Calculate the difference in time (in milliseconds)
  const timeLeft = endOfLifeDate - currentDate;

  // Convert milliseconds to weeks (1 week = 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const weeksLeft = Math.floor(timeLeft / (7 * 24 * 60 * 60 * 1000));

  return String(weeksLeft);
}

const container = document.querySelector(".container");
getWeeksLeft().then((text) => {
  container.textContent = text;
});
