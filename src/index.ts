import { HTMLRenderer, initScheduler } from "oxiui-lib";
import type { IComponent } from "oxiui-lib/dist/core/types/component";
import type { IntrinsicElements } from "oxiui-lib/dist/core/types/html";
import { Application } from "./app";

function Logger(
  stateId: string,
  i: Set<string>,
  root: IComponent<keyof IntrinsicElements>,
) {
  console.log(
    JSON.stringify(
      root,
      (key, value) => {
        if (key === "up") return undefined;
        return value;
      },
      2,
    ),
  );
}

const renderer = new HTMLRenderer("app");
initScheduler(Application, (number, readers, root) => {
  Logger(number, readers, root);
  renderer.render(number, readers, root);
});
