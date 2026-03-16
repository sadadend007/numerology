const scoreMap = {
  "ㄱ": 1, "ㅊ": 1, "ㅏ": 1, "ㅣ": 1,
  "ㄴ": 2, "ㅋ": 2, "ㅑ": 2,
  "ㄷ": 3, "ㅌ": 3, "ㅓ": 3,
  "ㄹ": 4, "ㅍ": 4, "ㅕ": 4,
  "ㅁ": 5, "ㅎ": 5, "ㅗ": 5,
  "ㅂ": 6, "ㅛ": 6,
  "ㅅ": 7, "ㅜ": 7,
  "ㅇ": 8, "ㅠ": 8,
  "ㅈ": 9, "ㅡ": 9,
  "ㅐ": 2, "ㅒ": 3, "ㅔ": 4, "ㅖ": 5, "ㅘ": 6, "ㅙ": 7, "ㅚ": 6,
  "ㅝ": 10, "ㅞ": 11, "ㅟ": 8, "ㅢ": 10,
  "ㄲ": 2, "ㄸ": 6, "ㅃ": 12, "ㅆ": 14, "ㅉ": 18,
  "ㄳ": 8, "ㄵ": 11, "ㄶ": 7, "ㄺ": 5, "ㄻ": 9, "ㄼ": 10,
  "ㄽ": 11, "ㄾ": 7, "ㄿ": 8, "ㅀ": 9
};

const chosungList = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

const jungsungList = [
  "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",
  "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"
];

const jongsungList = [
  null, "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
  "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
  "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

const resultDefinitions = [
  { key: "lifeNumber", title: "인생수", description: "생년월일 기반" },
  { key: "destinyNumber", title: "운명수", description: "이름 전체" },
  { key: "soulNumber", title: "혼의수", description: "모음" },
  { key: "personalityNumber", title: "성격수", description: "자음" },
  { key: "completionNumber", title: "완성수", description: "인생수 + 운명수" },
  { key: "birthdayNumber", title: "생일수", description: "생일 일자" },
  { key: "yearNumber", title: "연도수", description: "출생 연도" }
];

const form = document.querySelector("#numerology-form");
const userNameInput = document.querySelector("#userName");
const birthDateInput = document.querySelector("#birthDate");
const targetYearInput = document.querySelector("#targetYear");
const errorMessage = document.querySelector("#errorMessage");
const resultSection = document.querySelector("#resultSection");
const resultGrid = document.querySelector("#resultGrid");
const resultRowTemplate = document.querySelector("#resultRowTemplate");

function reduceToSingleDigit(num) {
  let result = num;
  while (result >= 10) {
    result = Math.floor(result / 10) + (result % 10);
  }
  return result;
}

function decomposeHangul(char) {
  const code = char.codePointAt(0);
  const hangulStart = 0xac00;
  const hangulEnd = 0xd7a3;

  if (code === undefined || code < hangulStart || code > hangulEnd) {
    return { chosung: null, jungsung: null, jongsung: null };
  }

  const index = code - hangulStart;
  const chosungIndex = Math.floor(index / (21 * 28));
  const jungsungIndex = Math.floor((index % (21 * 28)) / 28);
  const jongsungIndex = index % 28;

  return {
    chosung: chosungList[chosungIndex],
    jungsung: jungsungList[jungsungIndex],
    jongsung: jongsungList[jongsungIndex]
  };
}

function calculateLifeNumber(birthDate) {
  const sum = birthDate.split("").reduce((acc, char) => acc + Number(char), 0);
  return reduceToSingleDigit(sum);
}

function calculateNameNumbers(name) {
  let sumTotal = 0;
  let sumConsonants = 0;
  let sumVowels = 0;

  for (const char of name) {
    const { chosung, jungsung, jongsung } = decomposeHangul(char);

    if (chosung) {
      const score = scoreMap[chosung] ?? 0;
      sumTotal += score;
      sumConsonants += score;
    }

    if (jungsung) {
      const score = scoreMap[jungsung] ?? 0;
      sumTotal += score;
      sumVowels += score;
    }

    if (jongsung) {
      const score = scoreMap[jongsung] ?? 0;
      sumTotal += score;
      sumConsonants += score;
    }
  }

  return {
    destiny: reduceToSingleDigit(sumTotal),
    personality: reduceToSingleDigit(sumConsonants),
    soul: reduceToSingleDigit(sumVowels)
  };
}

function calculateCompletionNumber(lifeNumber, destinyNumber) {
  return reduceToSingleDigit(lifeNumber + destinyNumber);
}

function calculateBirthdayNumber(birthDate) {
  if (birthDate.length !== 8) {
    return 0;
  }

  const day = birthDate.slice(-2);
  const sum = day.split("").reduce((acc, char) => acc + Number(char), 0);
  return reduceToSingleDigit(sum);
}

function calculateYearNumber(birthDate) {
  if (birthDate.length !== 8) {
    return 0;
  }

  const year = birthDate.slice(0, 4);
  const sum = year.split("").reduce((acc, char) => acc + Number(char), 0);
  return reduceToSingleDigit(sum);
}

function calculateFortuneNumber(birthDate, targetYear) {
  if (birthDate.length !== 8 || targetYear.length !== 4) {
    return null;
  }

  const combined = `${targetYear}${birthDate.slice(-4)}`;
  const sum = combined.split("").reduce((acc, char) => acc + Number(char), 0);
  return reduceToSingleDigit(sum);
}

function validateInputs(userName, birthDate, targetYear) {
  if (userName.length < 2 || userName.length > 6) {
    return "이름은 2~6자 사이로 입력해주세요.";
  }

  if (!/^\d{8}$/.test(birthDate)) {
    return "생년월일은 8자리 숫자로 입력해주세요.";
  }

  if (!/^\d{4}$/.test(targetYear)) {
    return "해운수 연도는 4자리 숫자로 입력해주세요.";
  }

  return null;
}

function renderResults(result, targetYear) {
  resultGrid.innerHTML = "";

  resultDefinitions.forEach((definition) => {
    const node = resultRowTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".result-title").textContent = definition.title;
    node.querySelector(".result-description").textContent = definition.description;
    node.querySelector(".result-value").textContent = result[definition.key];
    resultGrid.appendChild(node);
  });

  const node = resultRowTemplate.content.firstElementChild.cloneNode(true);
  node.querySelector(".result-title").textContent = "해운수";
  node.querySelector(".result-description").textContent = `${targetYear}년`;
  node.querySelector(".result-value").textContent = result.fortuneNumber;
  resultGrid.appendChild(node);

  resultSection.classList.remove("hidden");
}

function sanitizeDigits(input) {
  input.value = input.value.replace(/\D/g, "");
}

birthDateInput.addEventListener("input", () => sanitizeDigits(birthDateInput));
targetYearInput.addEventListener("input", () => sanitizeDigits(targetYearInput));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const userName = userNameInput.value.trim();
  const birthDate = birthDateInput.value.trim();
  const targetYear = targetYearInput.value.trim();

  errorMessage.textContent = "";
  resultSection.classList.add("hidden");

  const validationError = validateInputs(userName, birthDate, targetYear);
  if (validationError) {
    errorMessage.textContent = validationError;
    return;
  }

  const lifeNumber = calculateLifeNumber(birthDate);
  const { destiny, personality, soul } = calculateNameNumbers(userName);

  if (destiny <= 0) {
    errorMessage.textContent = "이름을 한글로 입력해주세요.";
    return;
  }

  const result = {
    lifeNumber,
    destinyNumber: destiny,
    soulNumber: soul,
    personalityNumber: personality,
    completionNumber: calculateCompletionNumber(lifeNumber, destiny),
    birthdayNumber: calculateBirthdayNumber(birthDate),
    yearNumber: calculateYearNumber(birthDate),
    fortuneNumber: calculateFortuneNumber(birthDate, targetYear)
  };

  renderResults(result, targetYear);
});
