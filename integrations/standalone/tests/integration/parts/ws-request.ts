import type { Part } from '../../pageobjects/Part';
import { NewPartTest, PartObject } from './part-tester';
import type { Section } from '../../pageobjects/Section';
import type { Select } from '../../pageobjects/Select';
import type { Table } from '../../pageobjects/Table';

class WsRequest extends PartObject {
  client: Select;
  port: Select;
  operation: Select;
  propertiesSection: Section;
  properties: Table;
  mapping: Table;

  constructor(part: Part) {
    super(part);
    this.client = part.select('Client');
    this.port = part.select('Port');
    this.operation = part.select('Operation');
    this.propertiesSection = part.section('Properties');
    this.properties = this.propertiesSection.table(['combobox', 'expression']);
    this.mapping = part.table(['label', 'label', 'expression']);
  }

  async fill() {
    await this.client.choose('GeoIpService');
    await this.port.choose('GeoIPServiceSoap');
    await this.operation.choose('GetGeoIP');

    await this.propertiesSection.toggle();
    const row = await this.properties.addRow();
    await row.fill(['endpoint.cache', '123']);
    await this.propertiesSection.toggle();

    await this.mapping.row(1).column(2).fill('"bla"');
  }

  async assertFill() {
    await this.client.expectValue('GeoIpService');
    await this.port.expectValue('GeoIPServiceSoap');
    await this.operation.expectValue('GetGeoIP');

    await this.propertiesSection.expectIsOpen();
    await this.properties.row(0).expectValues(['endpoint.cache', '123']);
    await this.propertiesSection.toggle();

    await this.mapping.expectRowCount(2);
    await this.mapping.row(1).column(2).expectValue('"bla"');
  }

  async clear() {
    await this.port.choose('GeoIPServiceSoap12');
    await this.operation.choose('GetGeoIPContext');

    await this.properties.clear();

    await this.mapping.row(1).column(2).fill('');
  }

  async assertClear() {
    await this.client.expectValue('GeoIpService');
    await this.port.expectValue('GeoIPServiceSoap12');
    await this.operation.expectValue('GetGeoIPContext');

    await this.propertiesSection.expectIsClosed();
    await this.mapping.expectRowCount(1);
  }
}

export const WsRequestTest = new NewPartTest('Request', (part: Part) => new WsRequest(part));
