export class UseToggle {
  value = $state<boolean>(false);
  //set initial state
  constructor(initialState: boolean) {
    this.value = initialState;
  }

  toggle = () => {
    this.value = !this.value;
  }

  setTrue = () => {
    this.value = true;
  }

  setFalse = () => {
    this.value = false;
  }
}