import { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import { Section } from '../../pageobjects/Section';
import { Select } from '../../pageobjects/Select';
import { Table } from '../../pageobjects/Table';
import { ScriptInput } from '../../pageobjects/CodeEditor';
import { Combobox } from '../../pageobjects/Combobox';

class RestRequest extends PartObject {
  client: Select;
  resource: Combobox;
  method: Select;
  path: ScriptInput;
  parametersSection: Section;
  parameters: Table;
  headersSection: Section;
  acceptHeader: Combobox;
  headers: Table;
  propertiesSection: Section;
  properties: Table;

  constructor(part: Part) {
    super(part);
    this.client = part.select('Client');
    this.resource = part.combobox('Resource');
    this.method = new Select(part.page, part.currentLocator(), { nth: 1 });
    this.path = part.scriptInput('Resource');
    this.parametersSection = part.section('Parameters');
    this.parameters = this.parametersSection.table(['select', 'text', 'label', 'expression']);
    this.headersSection = part.section('Headers');
    this.acceptHeader = this.headersSection.combobox('Accept');
    this.headers = this.headersSection.table(['combobox', 'expression']);
    this.propertiesSection = part.section('Properties');
    this.properties = this.propertiesSection.table(['combobox', 'expression']);
  }

  async fill() {
    await this.client.choose('stock');
    await this.method.choose('POST');
    await this.path.fill('path');

    await this.parametersSection.toggle();
    const paramRow = await this.parameters.addRow();
    await paramRow.fill(['Path', 'myParam', '123']);

    await this.headersSection.toggle();
    await this.acceptHeader.choose('application/json');
    const headerRow = await this.headers.addRow();
    await headerRow.fill(['Allow', 'abc']);

    await this.propertiesSection.toggle();
    const propRow = await this.properties.addRow();
    await propRow.fill(['username', 'hans']);
  }

  async assertFill() {
    await this.client.expectValue('stock');
    await this.method.expectValue('POST');
    await this.path.expectValue('path');

    await this.parametersSection.expectIsOpen();
    await this.parameters.row(0).expectValues(['Path', 'myParam', '123']);

    await this.headersSection.expectIsOpen();
    await this.acceptHeader.expectValue('application/json');
    await this.headers.row(0).expectValues(['Allow', 'abc']);

    await this.propertiesSection.expectIsOpen();
    await this.properties.row(0).expectValues(['username', 'hans']);
  }

  async clear() {
    await this.method.choose('GET');
    await this.path.clear();

    await this.parameters.clear();

    await this.acceptHeader.fill('*/*');
    await this.headers.clear();

    await this.properties.clear();
  }

  async assertClear() {
    await this.method.expectValue('GET');
    await this.path.expectEmpty();

    await this.parametersSection.expectIsClosed();

    await this.headersSection.expectIsClosed();

    await this.propertiesSection.expectIsClosed();
  }
}

class RestRequestOpenApi extends RestRequest {
  async fill() {
    await this.client.choose('pet');
    await this.resource.choose('DELETE');

    await this.parameters.row(0).column(3).fill('123');

    await this.headersSection.toggle();
    const headerRow = await this.headers.addRow();
    await headerRow.fill(['api_key', 'abc']);
  }

  async assertFill() {
    await this.client.expectValue('pet');
    await this.resource.expectValue('DELETE:/pet/{petId}');

    await this.parameters.row(0).expectValues(['Path', 'petId', '123']);

    await this.headers.row(0).expectValues(['api_key', 'abc']);
  }

  async clear() {
    await this.part.currentLocator().getByRole('button', { name: 'Toggle OpenApi' }).click();
    await this.path.fill('/pet');

    await this.parameters.clear();
  }

  async assertClear() {
    await this.client.expectValue('pet');
    await this.resource.expectValue('DELETE:/pet');

    await this.parametersSection.expectIsClosed();
  }
}

export const RestRequestTest = new NewPartTest('Request', (part: Part) => new RestRequest(part));
export const RestRequestOpenApiTest = new NewPartTest('Request', (part: Part) => new RestRequestOpenApi(part));
