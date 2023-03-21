export default function formatFormForAPI(formData) {
  // turn annualCO2 into KG (*1000) and remove controls

  const formatedData = JSON.parse(JSON.stringify(formData));
  delete formatedData.controls;
  formatedData.annualCO2 = formatedData.annualCO2 * 1000; // turn to kg
  return formatedData;
}
