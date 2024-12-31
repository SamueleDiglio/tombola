import { useState } from "react";
import "./cartella.css";

const Cartella = () => {
  const numeriIniziali = Array.from({ length: 90 }, (_, i) => i + 1); // Numeri da 1 a 90
  const [numeroCartelle, setNumeroCartelle] = useState<number | null>(null); // Numero di cartelle da generare
  const [cartelle, setCartelle] = useState<number[][][] | null>(null); // Stato delle cartelle
  const [celleCoperte, setCelleCoperte] = useState<Set<number>>(new Set()); // Celle coperte
  const [traguardiGlobali, setTraguardiGlobali] = useState<Set<string>>(
    new Set()
  );
  const [messaggioTraguardo, setMessaggioTraguardo] = useState<string | null>(
    null
  );
  const [tombolaAnnunciata, setTombolaAnnunciata] = useState(false);

  const generaCartelle = (numCartelle: number) => {
    const nuoveCartelle: number[][][] = [];
    for (let c = 0; c < numCartelle; c++) {
      const numeriDisponibili = [...numeriIniziali]; // Copia i numeri da numeriIniziali
      const colonne: number[][] = Array.from({ length: 9 }, (_, i) =>
        numeriDisponibili.filter((n) => Math.floor((n - 1) / 10) === i)
      ); // Dividi in colonne
      const righe: number[][] = Array.from({ length: 3 }, () =>
        Array(9).fill(null)
      ); // 3 righe, 9 colonne

      for (let r = 0; r < 3; r++) {
        const colonneScelte = Array.from({ length: 9 }, (_, i) => i)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5); // Scegli 5 colonne casuali
        colonneScelte.forEach((colonna) => {
          const numeroEstratto = colonne[colonna].splice(
            Math.floor(Math.random() * colonne[colonna].length),
            1
          )[0];
          righe[r][colonna] = numeroEstratto; // Posiziona il numero nella riga
        });
      }

      nuoveCartelle.push(righe);
    }

    setCartelle(nuoveCartelle); // Aggiorna lo stato con le nuove cartelle
    setCelleCoperte(new Set()); // Resetta le celle coperte
  };

  const verificaTraguardo = (celleCoperte: Set<number>) => {
    if (!cartelle) return;

    const nuoviTraguardiGlobali = new Set(traguardiGlobali);

    cartelle.forEach((cartella) => {
      const tuttiINumeriDellaCartella = cartella
        .flat()
        .filter((numero) => numero !== null);
      const numeriCopertiNellaCartella = tuttiINumeriDellaCartella.filter(
        (numero) => celleCoperte.has(numero)
      );

      // Controllo per la Tombola globale
      if (
        numeriCopertiNellaCartella.length ===
          tuttiINumeriDellaCartella.length &&
        !tombolaAnnunciata
      ) {
        mostraMessaggio(`TOMBOLA! 🎉`);
        setTombolaAnnunciata(true); // Annuncia la Tombola una sola volta
      }

      // Controllo per gli altri traguardi (Ambo, Terno, ecc.)
      cartella.forEach((riga) => {
        const numeriCopribili = riga.filter((numero) => numero !== null);
        const numeriCoperti = numeriCopribili.filter((numero) =>
          celleCoperte.has(numero)
        );

        const traguardo =
          numeriCoperti.length === 2
            ? "AMBO"
            : numeriCoperti.length === 3
            ? "TERNA"
            : numeriCoperti.length === 4
            ? "QUATERNA"
            : numeriCoperti.length === 5
            ? "CINQUINA"
            : null;

        if (traguardo && !nuoviTraguardiGlobali.has(traguardo)) {
          mostraMessaggio(`HAI FATTO ${traguardo}! 🎉`);
          nuoviTraguardiGlobali.add(traguardo);
        }
      });
    });

    setTraguardiGlobali(nuoviTraguardiGlobali);
  };

  const mostraMessaggio = (messaggio: string) => {
    setMessaggioTraguardo(messaggio);
    setTimeout(() => {
      setMessaggioTraguardo(null); // Rimuove il messaggio dopo 3 secondi
    }, 3000);
  };

  const handleCellaClick = (numero: number) => {
    setCelleCoperte((prev) => {
      const nuovoSet = new Set(prev);
      if (nuovoSet.has(numero)) {
        nuovoSet.delete(numero);
      } else {
        nuovoSet.add(numero);
      }
      verificaTraguardo(nuovoSet);
      return nuovoSet;
    });
  };

  // Mostra il menu iniziale per scegliere il numero di cartelle
  if (numeroCartelle === null) {
    return (
      <div className="menu-iniziale">
        <h1 className="menu-title">Quante cartelle vuoi generare?</h1>
        <div className="menu-opzioni">
          {[1, 2, 3, 4, 5].map((opzione) => (
            <button
              key={opzione}
              className="menu-button"
              onClick={() => {
                setNumeroCartelle(opzione);
                generaCartelle(opzione); // Chiama la funzione di generazione
              }}
            >
              <h2>
                {opzione} cartell{opzione > 1 ? "e" : "a"}
              </h2>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cartella-container">
      <h1 className="cartella-title">CARTELLE</h1>
      {messaggioTraguardo && (
        <div className="messaggio-traguardo">
          <h2>{messaggioTraguardo}</h2>
        </div>
      )}

      <div className="cartelle-griglia">
        {cartelle &&
          cartelle.map((cartella, cartellaIndex) => (
            <div
              key={cartellaIndex}
              className={`cartella-tabella cartella-${cartellaIndex + 1}`}
            >
              <h1 className="cartella-titolo">CARTELLA {cartellaIndex + 1}</h1>
              {cartella.map((riga, rigaIndex) => (
                <div
                  key={rigaIndex}
                  className={`cartella-riga cartella-riga-${rigaIndex + 1}`}
                >
                  {Array.from({ length: 9 }).map((_, i) => {
                    const numero =
                      riga.find((n) => Math.floor((n - 1) / 10) === i) || null;

                    return (
                      <div
                        key={i}
                        className={`cartella-cella cartella-colonna-${i + 1} ${
                          numero && celleCoperte.has(numero)
                            ? "cella-coperta"
                            : ""
                        }`}
                        onClick={() => numero && handleCellaClick(numero)}
                      >
                        {numero || ""}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cartella;
