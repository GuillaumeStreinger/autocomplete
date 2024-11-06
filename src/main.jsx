import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Autocomplete from "./Component/Autocomplete";

const nameData = [
  "Gandalf",
  "Frodon",
  "Sam",
  "Merry",
  "Pippin",
  "Aragorn",
  "Gimli",
  "Legolas",
  "Boromir",
  "Sauron",
  "Saroumane",
  "Gollum",
  "Faramir",
  "Arwen",
  "Eowyn",
  "Balrog"
];

const productData = [
  "Anneau unique",
  "Baton",
  "Palantir",
  "Arc",
  "Epée",
  "Hache",
  "Dague",
  "Sceptre",
  "Orbe"
];

const combinedData = [...nameData, ...productData];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div style={{ padding: "20px" }}>
      <h2>1. Autocomplete user simple avec data en props</h2>
      <Autocomplete data={nameData} placeholder="Search for a user..." multiSelect={false} />

      <br /><br />

      <h2>2. Autocomplete User simple avec data en fonction</h2>
      <Autocomplete apiEndpoints={["http://localhost:3000/user/1"]} placeholder="Search for a user..." multiSelect={false} />

      <br /><br />

      <h2>3. Autocomplete User multiple avec data en fonction</h2>
      <Autocomplete apiEndpoints={["http://localhost:3000/user/1"]} placeholder="Search for a user..." multiSelect={true} />
      
      <br /><br />

      <h2>4. Autocomplete Product simple avec data en fonction</h2>
      <Autocomplete apiEndpoints={["http://localhost:3000/product/1"]} placeholder="Search for a product..." multiSelect={false} />

      <br /><br />

      <h2>5. Autocomplete Product multiple avec data en fonction</h2>
      <Autocomplete apiEndpoints={["http://localhost:3000/product/1"]} placeholder="Search for a product..." multiSelect={true} />
      
      <br /><br />

      <h2>6. Autocomplete Mix multiple avec data en fonction</h2>
      <Autocomplete apiEndpoints={["http://localhost:3000/user/1", "http://localhost:3000/product/1"]} placeholder="Search for users or products..." multiSelect={true} />

      <br /><br />

      <h2>7. Autocomplete Product multiple avec template et data en fonction</h2>
      <Autocomplete apiEndpoints={["http://localhost:3000/product/1"]} placeholder="Search for a product..." multiSelect={true} isProductTemplate={true} />

      <br /><br />

      <h2>Produits</h2>
      <Autocomplete data={productData} placeholder="Search for a product..."/>
    </div>
  </StrictMode>
);
