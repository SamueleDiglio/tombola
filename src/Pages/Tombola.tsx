import { useState } from "react";
import "./Tombola.css";

const Tombola = () => {
  const numeriIniziali = Array.from({ length: 90 }, (_, i) => i + 1);
  const [numeri, setNumeri] = useState(numeriIniziali);
  const [numero, setNumero] = useState<number | null>(null);

  const onClick = () => {
    const numeriShufflati = [...numeri];
    const randomIndex = Math.floor(Math.random() * numeriShufflati.length);
    const nuovoNumero = numeriShufflati.splice(randomIndex, 1)[0];

    setNumero(nuovoNumero);
    setNumeri(numeriShufflati);
  };

  const ultimoNumero =
    numeri.length === 0
      ? "Numeri finiti"
      : numero !== null
      ? `Estratto: ${numero}`
      : "Premi per estrarre";

  return (
    <>
      <section>
        <div className="tombola-container">
          <div className="tombola-container-content">
            <h1>{ultimoNumero}</h1>
            <h2>Numeri rimanenti: {numeri.length}</h2>
            <button
              onClick={onClick}
              disabled={numeri.length === 0}
              className="btn"
            >
              <h1>Estrai numero</h1>
            </button>
          </div>
        </div>

        <div className="elenco-numeri">
          {numeriIniziali.map((element) => (
            <div
              key={element}
              className={
                numeri.includes(element)
                  ? "casella numero-disponibile"
                  : "casella numero-estratto"
              }
            >
              <h1>{element}</h1>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Tombola;
