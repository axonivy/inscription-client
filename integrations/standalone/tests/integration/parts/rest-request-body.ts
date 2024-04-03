import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { Table } from '../../pageobjects/Table';
import type { MacroEditor, ScriptArea } from '../../pageobjects/CodeEditor';
import type { Combobox } from '../../pageobjects/Combobox';
import type { RadioGroup } from '../../pageobjects/RadioGroup';
import type { InputType } from '@axonivy/inscription-protocol';
import { expect } from '@playwright/test';

class EntityPart extends PartObject {
  bodyType: RadioGroup;
  entityType: Combobox;
  mappingSection: Section;
  mapping: Table;
  code: ScriptArea;

  constructor(part: Part, body: Section, readonly openApiMode = false) {
    super(part);
    this.bodyType = body.radioGroup();
    this.entityType = body.combobox('Entity-Type');
    this.mappingSection = body.section('Mapping');
    this.mapping = this.mappingSection.table(['label', 'expression']);
    this.code = body.scriptArea();
  }

  async fill() {
    await this.bodyType.expectSelected('Entity');
    await this.entityType.fill('ch.ivyteam.test.Person');
    await this.mappingSection.open();
    await expect(this.mapping.row(0).locator).toHaveText('param');
    await this.mapping.row(2).fill(['CH']);
    await this.code.fill('code');
  }
  async assertFill() {
    await this.entityType.expectValue('ch.ivyteam.test.Person');
    await this.mapping.row(2).expectValues(['CH']);
    await this.code.expectValue('code');
  }
  async clear() {
    await this.entityType.choose('');
    await this.mapping.row(1).fill(['']);
    await this.code.clear();
  }
  async assertClear() {}
}

class EntityOpenApiPart extends EntityPart {
  override async fill() {
    await this.bodyType.expectSelected('Entity');
    await this.mappingSection.open();
    await expect(this.mapping.row(0).locator).toHaveText('param');
    await this.mapping.row(2).fill(['CH']);
    await this.code.fill('code');
  }
  override async assertFill() {
    await this.mapping.row(2).expectValues(['CH']);
    await this.code.expectValue('code');
  }
  override async clear() {
    await this.mapping.row(1).fill(['']);
    await this.code.clear();
  }
  override async assertClear() {}
}

class FormPart extends PartObject {
  bodyType: RadioGroup;
  form: Table;

  constructor(part: Part, body: Section) {
    super(part);
    this.bodyType = body.radioGroup();
    this.form = body.table(['text', 'expression']);
  }

  async fill() {
    await this.bodyType.choose('Form');
    const row = await this.form.addRow();
    await row.fill(['test', 'bla']);
  }
  async assertFill() {
    await this.bodyType.expectSelected('Form');
    await this.form.row(0).expectValues(['test', 'bla']);
  }
  async clear() {
    await this.form.clear();
    await this.bodyType.choose('Entity');
  }
  async assertClear() {}
}

class RawPart extends PartObject {
  bodyType: RadioGroup;
  raw: MacroEditor;

  constructor(part: Part, body: Section) {
    super(part);
    this.bodyType = body.radioGroup();
    this.raw = body.macroArea();
  }

  async fill() {
    await this.bodyType.choose('Raw');
    await this.raw.fill('raw');
  }
  async assertFill() {
    await this.bodyType.expectSelected('Raw');
    await this.raw.expectValue('raw');
  }
  async clear() {
    await this.raw.clear();
    await this.bodyType.choose('Entity');
  }
  async assertClear() {}
}

class RestRequestBody extends PartObject {
  serviceSection: Section;
  client: Select;
  resource: Combobox;
  method: Select;
  jaxRs: ScriptArea;
  bodySection: Section;
  entityPart: EntityPart;
  formPart: FormPart;
  rawPart: RawPart;
  contentType: Combobox;

  constructor(part: Part, readonly type: InputType = 'ENTITY') {
    super(part);
    this.serviceSection = part.section('Rest Service');
    this.client = this.serviceSection.select({ label: 'Client' });
    this.resource = this.serviceSection.combobox('Resource');
    this.method = this.serviceSection.select({ nth: 1 });
    this.jaxRs = part.scriptArea();
    this.bodySection = part.section('Body');
    this.entityPart = new EntityPart(part, this.bodySection);
    this.formPart = new FormPart(part, this.bodySection);
    this.rawPart = new RawPart(part, this.bodySection);
    this.contentType = this.bodySection.combobox('Content-Type');
  }

  typePart() {
    switch (this.type) {
      case 'ENTITY':
        return this.entityPart;
      case 'FORM':
        return this.formPart;
      case 'RAW':
        return this.rawPart;
    }
  }

  async fill() {
    await this.serviceSection.open();
    await this.client.choose('stock');
    await this.method.choose('POST');

    await this.bodySection.toggle();
    await this.typePart().fill();
    await this.contentType.choose('application/xml');
  }

  async assertFill() {
    await this.client.expectValue('stock');
    await this.method.expectValue('POST');

    await this.bodySection.expectIsOpen();
    await this.typePart().assertFill();
    await this.contentType.expectValue('application/xml');
  }

  async clear() {
    await this.typePart().clear();
    await this.contentType.choose('json');
  }

  async assertClear() {
    await this.bodySection.expectIsClosed();
  }
}

class RestRequestBodyJaxRs extends RestRequestBody {
  override async fill() {
    await this.serviceSection.open();
    await this.client.choose('stock');
    await this.method.choose('JAX_RS');
    await this.jaxRs.fill('jax');
  }

  override async assertFill() {
    await this.client.expectValue('stock');
    await this.method.expectValue('JAX_RS');
    await this.jaxRs.expectValue('jax');
  }

  override async clear() {
    await this.jaxRs.clear();
  }

  override async assertClear() {
    await this.jaxRs.expectEmpty();
  }
}

class RestRequestBodyOpenApi extends RestRequestBody {
  constructor(part: Part) {
    super(part);
    this.entityPart = new EntityOpenApiPart(part, this.bodySection);
  }

  override async fill() {
    await this.serviceSection.open();
    await this.client.choose('pet');
    await this.resource.choose('POST');
    await this.bodySection.expectIsOpen();
    await this.entityPart.fill();
  }

  override async assertFill() {
    await this.client.expectValue('pet');
    await this.resource.expectValue('POST:/pet');
    await this.bodySection.expectIsOpen();
    await this.entityPart.assertFill();
  }

  override async clear() {
    await this.entityPart.clear();
  }

  override async assertClear() {
    await this.bodySection.expectIsOpen();
  }
}

export const RestRequestBodyEntityTest = new NewPartTest('Request', (part: Part) => new RestRequestBody(part));
export const RestRequestBodyFormTest = new NewPartTest('Request', (part: Part) => new RestRequestBody(part, 'FORM'));
export const RestRequestBodyRawTest = new NewPartTest('Request', (part: Part) => new RestRequestBody(part, 'RAW'));
export const RestRequestBodyJaxRsTest = new NewPartTest('Request', (part: Part) => new RestRequestBodyJaxRs(part));
export const RestRequestBodyOpenApiTest = new NewPartTest('Request', (part: Part) => new RestRequestBodyOpenApi(part));
