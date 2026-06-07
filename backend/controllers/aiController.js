// Simple AI: maps symptom keywords to specialist categories
// No external API needed — just keyword matching

const symptomMap = {
  Cardiologist: [
    "chest pain", "heart", "palpitation", "shortness of breath",
    "irregular heartbeat", "high blood pressure", "hypertension",
    "heart attack", "chest tightness", "fatigue", "dizziness",
  ],
  Dermatologist: [
    "rash", "skin", "acne", "itching", "eczema", "psoriasis",
    "hair loss", "nail", "allergy", "hives", "blisters", "fungal",
    "dry skin", "oily skin", "dandruff",
  ],
  Neurologist: [
    "headache", "migraine", "seizure", "numbness", "tingling",
    "memory loss", "tremor", "stroke", "dizziness", "fainting",
    "brain", "nerve", "epilepsy", "confusion",
  ],
  Orthopedist: [
    "bone", "joint", "knee", "back pain", "fracture", "sprain",
    "muscle pain", "arthritis", "shoulder", "hip", "ankle",
    "wrist", "neck pain", "spine", "ligament",
  ],
  Gastroenterologist: [
    "stomach", "vomiting", "nausea", "diarrhea", "constipation",
    "bloating", "acid reflux", "heartburn", "abdominal pain",
    "liver", "ulcer", "indigestion", "gas", "bowel",
  ],
  Psychiatrist: [
    "anxiety", "depression", "stress", "insomnia", "sleep",
    "panic attack", "mood", "mental", "phobia", "obsession",
    "hallucination", "bipolar", "schizophrenia", "eating disorder",
  ],
  Pediatrician: [
    "child", "baby", "infant", "toddler", "fever in child",
    "vaccination", "growth", "pediatric", "newborn", "kids",
  ],
  ENT: [
    "ear", "nose", "throat", "cold", "sinus", "tonsil",
    "hearing loss", "runny nose", "sneezing", "sore throat",
    "blocked nose", "earache", "voice", "hoarseness",
  ],
  Ophthalmologist: [
    "eye", "vision", "blurry", "cataract", "glaucoma",
    "red eye", "eye pain", "watery eyes", "blind", "squint",
  ],
  GeneralPhysician: [
    "fever", "cold", "flu", "fatigue", "weakness",
    "general checkup", "cough", "body pain", "weight loss",
    "weight gain", "tiredness", "loss of appetite",
  ],
};

const analyzeSymptoms = (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || symptoms.trim() === "") {
    return res.status(400).json({ message: "Please describe your symptoms." });
  }

  const lowerSymptoms = symptoms.toLowerCase();
  let bestMatch = "General Physician"; // default fallback
  let highestScore = 0;

  // Count how many keywords from each specialist match the user's input
  for (const [specialist, keywords] of Object.entries(symptomMap)) {
    let score = 0;
    for (const keyword of keywords) {
      if (lowerSymptoms.includes(keyword)) {
        score++;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = specialist;
    }
  }

  res.json({
    specialist: bestMatch,
    message: `Based on your symptoms, we recommend a ${bestMatch}.`,
  });
};

module.exports = { analyzeSymptoms };
