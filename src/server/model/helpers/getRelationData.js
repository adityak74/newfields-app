export default ({
  firstName,
  countryOfBirth,
  nationality,
  alternateNationality = null,
  dateOfBirth,
}, relationType) => ({
  firstName,
  countryOfBirth,
  nationality,
  alternateNationality,
  dateOfBirth,
  relationType: relationType,
});
