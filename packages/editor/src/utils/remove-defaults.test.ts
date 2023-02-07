import { DEFAULT_DATA } from '@axonivy/inscription-protocol';
import { removeDefaults } from './remove-defaults';

describe('remove defaults', () => {
  test('remove', () => {
    expect(removeDefaults({}, {})).toEqual({});

    expect(removeDefaults({ a: '' }, {})).toEqual({ a: '' });
    expect(removeDefaults({ a: '' }, { a: '' })).toEqual({});
    expect(removeDefaults({ a: '' }, { b: '' })).toEqual({ a: '' });

    expect(removeDefaults({ a: { c: 'hi' }, b: true }, { a: { c: 'hello' }, b: false })).toEqual({ a: { c: 'hi' }, b: true });
    expect(removeDefaults({ a: { c: 'hi' }, b: true }, { a: { c: 'hello' }, b: true })).toEqual({ a: { c: 'hi' } });
    expect(removeDefaults({ a: { c: 'hi' }, b: true }, { a: { c: 'hi' }, b: true })).toEqual({});

    expect(removeDefaults({ a: [] }, { a: [] })).toEqual({});
    expect(removeDefaults({ a: ['hi'] }, { a: [] })).toEqual({ a: ['hi'] });
  });

  test('script data', () => {
    expect(
      removeDefaults(
        {
          name: 'script',
          description: '',
          docs: [],
          tags: [],
          config: {
            dialog: '',
            call: {
              map: [],
              code: ''
            },
            output: {
              map: [
                {
                  key: 'out.test',
                  value: '"test"'
                }
              ],
              code: ''
            },
            sudo: false,
            task: {
              id: '',
              name: '',
              description: '',
              category: '',
              responsible: {
                type: 'ROLE',
                activator: 'Everybody'
              },
              priority: {
                level: 'NORMAL',
                script: ''
              },
              skipTasklist: false,
              delay: '',
              expiry: {
                timeout: '',
                error: '',
                responsible: {
                  type: 'ROLE',
                  activator: 'Everybody'
                },
                priority: {
                  level: 'NORMAL',
                  script: ''
                }
              },
              customFields: [],
              code: ''
            },
            tasks: [],
            persist: false,
            case: {
              name: '',
              description: '',
              category: '',
              customFields: []
            }
          }
        },
        DEFAULT_DATA
      )
    ).toEqual({
      name: 'script',
      config: {
        output: {
          map: [
            {
              key: 'out.test',
              value: '"test"'
            }
          ]
        }
      }
    });
  });
});
