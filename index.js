const form = document.getElementById("form");
const search = document.getElementById("search");
const resultados = document.getElementById("resultados");
const botonesMasMenos = document.getElementById("masResultados");

// https://api.lyrics.ovh/suggest/cerati

const URL = "https://api.lyrics.ovh";

const getSongs = (valor)=> {
    fetch(`${URL}/suggest/${valor}`)
    .then((resultado)=> resultado.json())
    .then((data) => {
        pintarCanciones(data);
    });
}

const pintarCanciones = (arrayDeCanciones)=>{
   const codigoHtml = `
   <h1>Busquedas relacionadas a ${search.value}</h1>
   <ul>
       ${arrayDeCanciones.data
         .map(
             (valor)=>`
             <li>
             <p><strong>${valor.artist.name}</strong> - ${valor.title}</p>
             <audio controls>
                 <source src=${valor.preview} type="audio/mp3">
                 </audio>
             
             
             </li>
             `
         )
         .join("")}
         </ul>
        ` ;
        resultados.innerHTML = codigoHtml;
        
        if (arrayDeCanciones.next || arrayDeCanciones.prev) {
            botonesMasMenos.innerHTML = `
            ${
                arrayDeCanciones.prev
             ? `<button onclick="haceAlgo('${arrayDeCanciones.prev}')">Anterior</button>`
             :""
            }
            ${arrayDeCanciones.next 
            ? `<button onclick="haceAlgo('${arrayDeCanciones.next}')">Siguiente</button>`
            :""
         }
            `;
           }
          };

const haceAlgo = async (url) => {
    const urlParaFetchear = "https://cors-anywhere.herokuapp.com/" + url;
    const fetcheaAndo = await fetch(urlParaFetchear);
    const losResultados = await fetcheaAndo.json();

    pintarCanciones(losResultados);
};

const iniciar = () => {
    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        const loQueEscribo = search.value;

        if(!loQueEscribo) {
            return;
        }
        getSongs(loQueEscribo);
    });
};

iniciar();



