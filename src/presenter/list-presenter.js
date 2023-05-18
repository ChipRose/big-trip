import { ListView, EditPointView, PointView } from '../view';
import { render } from '../render';

export default class ListPresenter {
  listComponent = new ListView();

  init = (listContainer, pointsModel) => {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
    this.listPoints = [...this.pointsModel.getPoint()];

    render(this.listComponent, this.listContainer);
    render(new EditPointView(this.listPoints[0]), this.listComponent.getElement());

    for (let i = 1; i < this.listPoints.length; i++) {
      render(new PointView(this.listPoints[i]), this.listComponent.getElement());
    }
  }
}