import { useLionsPen } from "@/context/LionsPenContext";
import StudentLogin from "./StudentLogin";
import LockScreen from "./LockScreen";
import BreathingPage from "./BreathingPage";
import ScribeOath from "./ScribeOath";
import QuestionPage from "./QuestionPage";
import CelestialMessage from "./CelestialMessage";

const Index = () => {
  const { step } = useLionsPen();

  switch (step) {
    case "login":
      return <StudentLogin />;
    case "lock":
      return <LockScreen />;
    case "breathing":
      return <BreathingPage />;
    case "oath":
      return <ScribeOath />;
    case "academic":
      return <QuestionPage type="academic" />;
    case "emotion":
      return <QuestionPage type="emotion" />;
    case "character":
      return <QuestionPage type="character" />;
    case "celestial":
      return <CelestialMessage />;
    default:
      return <StudentLogin />;
  }
};

export default Index;
