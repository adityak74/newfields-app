export default ({
  firstName,
  countryOfBirth = null,
  nationality,
  alternateNationality = null,
  dateOfBirth,
}, relationType) => ({
  firstName,
  countryOfBirth,
  nationality,
  alternateNationality,
  dateOfBirth,
  relationType,
});
