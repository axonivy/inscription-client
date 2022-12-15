
export interface UserDialogData {
    nameData: NameData;
    callData: CallData;
}

export interface NameData {
    displayName: string;
    description: string;
    documents: Document[];
    tags: string[];
}

export type Document = {
    description: string;
    url: string;
};

export interface CallData {
    dialog: string;
    start: string;
    mappingData: MappingData;
}

export type MappingData = {
    mapping: Mapping[];
    code: string;
};

export interface Mapping extends TreeData<Mapping> {
    attribute: string;
    type: string;
    expression: string;
}

export interface TreeData<TData> {
    children: TData[];
}

export namespace TreeData {
    export function is<TData>(object: any): object is TreeData<TData> {
        return 'children' in object;
    }
}

export const DEFAULT_DATA: UserDialogData = {
    nameData: {
        displayName: 'test name',
        description: 'test desc',
        documents: [
            {
                description: 'Doc 1',
                url: 'axonivy.com'
            },
            {
                description: 'ivyTeam ❤️',
                url: 'ivyteam.ch'
            }
        ],
        tags: ['bla', 'zag']
    },
    callData: {
        dialog: '',
        start: '',
        mappingData: {
            mapping: [
                {
                    attribute: 'param',
                    type: '<ProcurementRequest>',
                    expression: '',
                    children: [
                        {
                            attribute: 'procurementRequest',
                            type: 'ProcurementRequest',
                            expression: 'in',
                            children: [
                                { attribute: 'accepted', type: 'Boolean', expression: '', children: [] },
                                { attribute: 'amount', type: 'Number', expression: '', children: [] }
                            ]
                        }
                    ]
                }
            ],
            code: 'ivy.log.info("Hello World")'
        }
    }
}