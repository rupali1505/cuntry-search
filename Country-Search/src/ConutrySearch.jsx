import { useEffect, useState } from "react";

const CountryCard = ({ name, flag }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        border: "2px solid grey",
        borderRadius: "10px",
        height: "200px",
        width: "200px",
        gap: "5px",
      }}
    >
      <img src={flag} alt={`flag of ${name}`} height={"50px"} width={"50px"} />
      <h2>{name}</h2>
    </div>
  );
};

export default function Countries() {
  const url =
    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);

  const cardsCount = searchData.length;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setSearchData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleInput = (value) => {
    setSearchValue(value);
    if (value.trim() === "") {
      setSearchData(data);
    } else {
      const filtered = data.filter((item) =>
        item.common.toLowerCase().includes(value.toLowerCase())
      );
      setSearchData(filtered);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <input
          type="text"
          style={{
            width: "50vw",
            height: "25px",
            marginBottom: "20px",
            marginTop: "10px",
          }}
          placeholder="search for countries"
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${
            cardsCount >= 6 ? 6 : cardsCount
          }, 200px)`,
          gap: "10px",
          width: "90vw",
          justifyItems: "center",
          justifyContent: cardsCount >= 6 ? "stretch" : "center",
          margin: "0 auto",
        }}
      >
        {searchData.map(({ png, common }, idx) => (
          <CountryCard key={idx} name={common} flag={png} />
        ))}
      </div>
    </div>
  );
}
