import { Button, ContainerState, HRow, Signal, Text, VRow } from "oxiui-lib";

type STAGES = "start" | "playing" | "end";
type CATEGORIES = ("HTML" | "CSS" | "JavaScript") | "";
type GAME = {
  gameStage: STAGES;
  category: CATEGORIES;
  questions: [];
  currentQuestion: number;
  score: number;
  answerSelected: string;
  isAnswerSelected: boolean;
};

export const GameState = new Signal<GAME>({
  gameStage: "start",
  category: "",
  questions: [],
  currentQuestion: 0,
  score: 0,
  answerSelected: "",
  isAnswerSelected: false,
});

export function setGameState(state: GAME) {
  GameState.value = {
    ...GameState.value,
    ...state,
  };
}

export function startGame(category: CATEGORIES) {
  setGameState({
    gameStage: "playing",
    category,
    questions: [],
    currentQuestion: 0,
    score: 0,
    answerSelected: "",
    isAnswerSelected: false,
  });
}

export class Application extends ContainerState {
  onTopicClick = (category: CATEGORIES) => {
    startGame(category);
  };

  override view = () => {
    new Text(`At ${GameState.value}`)
      .asTitle()
      .withStyle({ position: "absolute", left: "20px" });

    new VRow()
      .withProps({ id: "vrow frame" })
      .horizontalAlignment("center")
      .verticalAlignment("center")
      .body(() => {
        new Text("Hey! Welcome to the Quizapp :D").asTitle();
        new Text("Let's start test your web knowledge....").asH3();
        new HRow()
          .horizontalAlignment("center")
          .verticalAlignment("center")
          .withStyle({ gap: "1rem", flex: 0 })
          .body(() => {
            new Button("Start HTML").onClick(() => this.onTopicClick("HTML"));
            new Button("Start CSS").onClick(() => this.onTopicClick("CSS"));
            new Button("Start JavaScript").onClick(() =>
              this.onTopicClick("JavaScript"),
            );
          });
      });
  };
}
