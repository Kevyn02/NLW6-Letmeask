import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import ilustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import "../styles/auth.scss";
import { database } from "../services/firebase";

export function NewRoom() {
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();
  const { user } = useAuthContext();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref("rooms");
    const firebeseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    history.push(`/rooms/${firebeseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={ilustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          {/* <h1>{user?.name}</h1> */}
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
