import { useNavigate } from "react-router-dom";

export default function cancelAction() {
    const navigate = useNavigate();
    navigate("/notefy");
  }