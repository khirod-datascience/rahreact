const departments = [
  'Allergy and Immunology',
  'Anatomy',
  'Anesthesiology',
  'Cancer Guideline Syntheses',
  'Cardiac Disease Critical Care Medicine',
  'Cardiology',
  'Cardiology Guidelines',
  'Clinical Procedures',
  'Critical Care',
  'Dental Oral Health',
  'Dermatology',
  'Developmental Behavioral',
  'Emergency Medicine',
  'Endocrinology',
  'Gastroenterology',
  'General Medicine',
  'General Surgery',
  'Genetics Metabolic Disease',
  'Genomic Medicine',
  'Hematology',
  'Infectious Diseases',
  'Laboratory Medicine',
  'Nephrology',
  'Neurology',
  'Neurosurgery',
  'Oncology',
  'Ophthalmology',
  'Orthopedic Surgery',
  'Otolaryngology and Facial Plastic Surgery',
  'Pathology',
  'Perioperative Care',
  'Physical Medicine Rehabilitation',
  'Plastic Surgery',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Rare Diseases',
  'Rheumatology',
  'Sports Medicine',
  'Surgery',
  'Thoracic Surgery',
  'Transplantation',
  'Trauma',
  'Urology',
  'Vascular Surgery',
];

// @route  GET: /api/hospital/departments/:disease
module.exports = async (req, res) => {
  try {
    res.status(200).send(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
