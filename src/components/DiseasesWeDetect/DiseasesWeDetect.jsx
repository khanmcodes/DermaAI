import "./DiseasesWeDetect.css";
import atopicDermatitis from "./Diseases/atopic_dermatitis.png";
import eczema from "./Diseases/eczema.png";
import seborrheicKeratosis from "./Diseases/seborrheic_keratosis.png";
import psoriasis from "./Diseases/psoriasis.png";
import lichenPlanus from "./Diseases/lichen_planus.png";
import ringworm from "./Diseases/ringworm.png";

const diseases = [
  {
    name: "Atopic Dermatitis",
    description:
      "A chronic inflammatory skin condition causing dry, itchy, and inflamed skin.",
    image: atopicDermatitis, 
  },
  {
    name: "Eczema",
    description:
      "Causes dry, scaly, and itchy skin, often triggered by allergens or stress.",
    image: eczema,
  },
  {
    name: "Seborrheic Keratosis",
    description:
      "A benign, wart-like skin growth that appears waxy, scaly, or slightly raised.",
    image: seborrheicKeratosis,
  },
  {
    name: "Psoriasis",
    description:
      "An autoimmune condition that causes thick, scaly plaques on the skin.",
    image: psoriasis,
  },
  {
    name: "Lichen Planus",
    description:
      "A rash of small, discolored bumps that may appear on the skin or inside the mouth.",
    image: lichenPlanus,
  },
  {
    name: "Tinea (Ringworm)",
    description:
      "A highly contagious fungal infection that forms red, circular, itchy rashes.",
    image: ringworm,
  },
];

const DiseasesWeDetect = () => {
  return (
    <section className="disease-section">
      <p>
        DermaAI analyzes your skin with AI-powered precision to detect and
        classify common skin conditions.
      </p>
      <div className="disease-grid">
        {diseases.map((disease, index) => (
          <div className="disease-card" key={index}>
            <img
              src={disease.image}
              alt={disease.name}
              className="disease-image"
            />
            <div>
              <h2>{disease.name}</h2>
              <p>{disease.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiseasesWeDetect;
