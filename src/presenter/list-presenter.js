import { ListView, EditPointView, PointView } from '../view';
import { render } from '../render';

export default class ListPresenter {
  listComponent = new ListView();

  init = (listContainer) => {
    this.listContainer = listContainer;

    render(this.listComponent, this.listContainer);
    render(new EditPointView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}