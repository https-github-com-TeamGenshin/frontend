const NameValidation = (name: string | undefined) => {
  const regex = /^[A-Za-z]+$/;
  if (name) return regex.test(name);
};

const AgeValidation = (age: string | undefined) => {
  if (age) return Number(age) > 0 && Number(age) < 100;
};

export const Page1Validation = (
  name: string | undefined,
  age: string | undefined,
  location: string | undefined,
  gender: string | undefined
) => {
  if (!NameValidation(name)) return "Name is Invalid";
  if (!AgeValidation(age)) return "Age is Invalid";
  if (location === "") return "Location is Invalid";
  if (gender === "") return "Gender is Invalid";
  else return "Valid";
};
