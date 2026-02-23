import { Animation, Button, ContainerState, Text, VRow } from "oxiui-lib";

export class Application extends ContainerState {
  $trans = 0;
  $number = 0;
  $redered = false;

  onClick = () => {
    if (this.$trans > 1) {
      this.$trans = 1;
    } else {
      this.$trans = 100;
    }
  };

  override view = () => {
    new VRow()
      .withProps({ id: "vrow frame" })
      .horizontalAlignment("center")
      .verticalAlignment("center")
      .body(() => {
        new Animation()
          .translate("horizontal", this.$trans)
          .skew(this.$trans)
          .transition(5, "ease-in-out")
          .body(() => {
            new Text(`Hello, world. ${this.$trans}`).asTitle();
            new Button("Go to 100px").onClick(this.onClick);
          })
          .onAppear(() => {
            if (!this.$redered) {
              this.onClick();
              this.$redered = true;
            }
            console.log("Effect");
          });
      });
  };
}
