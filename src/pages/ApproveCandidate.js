import { styled } from "styled-components";
import CandidateCard from "../components/CandidateCard";
import { useEffect, useState } from "react";
import axios from "axios";
import URL_BASE_API from "../constants/UrlBaseApi";

export default function ApproveCandidate() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [reload, setReload] = useState({});

  useEffect(() => {
    axios
      .get(URL_BASE_API)
      .then((res) => setCandidates(res.data))
      .catch((err) => alert(err.response.data.message));
  }, [reload]);

  async function approveCandidate() {
    if (!selectedCandidateId) {
      return alert("Você deve selecionar um candidato.");
    }

    try {
      await axios.post(`${URL_BASE_API}/approve`, {
        codCandidato: selectedCandidateId,
      });
      setSelectedCandidateId(null);
      setReload({});
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  }

  if (candidates.length === 0) return <div>loading</div>;

  return (
    <main>
      <Title>
        Escolha qual candidato você deseja aprovar:
      </Title>

      <button onClick={approveCandidate}>Aprovar candidato</button>

      <List>
        {candidates.map((candidates) => {
          if (candidates.status === "QUALIFICADO") {
            return (
              <CandidateCard
                name={candidates.nome}
                id={candidates.id}
                key={candidates.id}
                setSelectedCandidateId={setSelectedCandidateId}
                selectedCandidateId={selectedCandidateId}
              />
            );
          }
        })}
      </List>
    </main>
  );
}

const Title = styled.h1`
  margin-bottom: 30px;
`;

const List = styled.ul`
  background-color: blueviolet;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;
