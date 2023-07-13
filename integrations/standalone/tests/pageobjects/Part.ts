import { Composite } from './Composite';
import { Section } from './Section';

export abstract class Part extends Composite {
  section(label: string) {
    return new Section(this.page, this.locator, label);
  }
}
