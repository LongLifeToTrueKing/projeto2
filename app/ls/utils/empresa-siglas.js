/**
 * Classe responsável por prover e realizar validações e exceções relativas as siglas dos layouts
 */
function EmpresaUtilsSigla() {}
/**
 * Retorna um array com a validações das siglas
 * @returns { Object } Objeto com as siglas
 */
EmpresaUtilsSigla.getValidations = () => ({
    codExt: ['SOL', 'MMQ', 'PHX', 'QSO', 'DFS', 'DOM', 'DO2', 'DO3', 'DO4', 'DO5', 'FTS', 'FT2', 'DF1', 'DF2',
        'WKR', 'VSC', 'PHU', 'FHM', 'DOC', 'CMT', 'CLM', 'PRS', 'JOB', 'DF3', 'YLU', 'QFR', 'QFP', 'ABD',
        'TRN', 'PTT', 'UFG', 'CSM', 'BWU', 'HXA', 'WUX', 'VLI', 'FOR', 'EUP', 'NDF', 'WUH', 'JQB', 'JWI',
        'KZH', 'GUG', 'LAN', 'PNX', 'HJK', 'MBH', 'III', 'YZX', 'BZJ', 'KNX', 'EAF', 'PTX', 'PQV', 'WTC',
        'RXN', 'CEH', 'YHL', 'LMM', 'GRE', 'ZNS', 'YSY', 'QDP', 'OIA', 'TTQ', 'MYN', 'UGB', 'NUH', 'KFI',
        'TMW', 'RUZ', 'IKN', 'CNC', 'UYL', 'MNR', 'TRT', 'RZY', 'WCB', 'ANB', 'GWL', 'ROD', 'VPI', 'NHS',
        'KRI', 'RCA', 'DQG', 'NSH', 'VYP', 'BQP', 'XEJ', 'VTY', 'HNT', 'RWM', 'WOC', 'GAT', 'NLO', 'ZAK',
        'UWT', 'KEO', 'JDG'
    ],
    codExtName: [{
            name: 'Cod Externo / Filial',
            layouts: ['MMQ', 'DF2', 'DF3', 'BWU', 'WUX', 'CEH'],
            placeholder: 'Ex: 9999/9999'
        },
        {
            name: 'Filial',
            layouts: ['WKR', 'YHL', 'UGB', 'CNC', 'XEJ', 'RWM']
        },
        {
            name: 'Empresa Destino',
            layouts: ['FHM', 'PRS'],
            placeholder: 'Ex: 999'
        },
        {
            name: 'Apelido',
            layouts: ['CMT', 'OIA', 'DQG']
        },
        {
            name: "CNPJ",
            layouts: ['CLM', 'WCB', 'OBG', 'ZAK']
        },
        {
            name: "Nome Empresa",
            layouts: ['JOB', 'JQB', 'WTC']
        },
        {
            name: "Filial",
            layouts: ['YLU']
        },
        {
            name: "CNPJ Empresa",
            layouts: ['QFR', 'QFP', 'HXA', 'NDF', 'JWI', 'GUG', 'LAN', 'PQV', 'TMW', 'VYP', 'VTY', 'JDG'],
            placeholder: 'Ex: 99.999.999/9999-99'
        },
        {
            name: "CPF/CNPJ Empresa",
            layouts: ['III', 'UYL'],
        },

        {
            name: "Código da Empresa",
            layouts: ['TRN', 'PTT', 'CSM', 'FOR', 'EUP', 'WUH', 'HJK', 'YZX', 'PTX', 'LMM', 'GRE', 'ZNS', 'QDP', 'MYN', 'KFI', 'TRT', 'RZY', 'KRI', 'BQP', 'NLO', 'UWT']
        },
        {
            name: "Código DFC",
            layouts: ['UFG']
        },
        {
            name: "Código do SCP da Empresa",
            layouts: ['VLI']
        },
        {
            name: "Cód Banco / Num Conta",
            layouts: ['KZH', 'MNR'],
            placeholder: 'Ex: 999/9999-99'
        },
        {
            name: "Empresa",
            layouts: ['PNX', 'HNT', 'GAT']
        },
        {
            name: "Empresa/Filial",
            layouts: ['MBH', 'NUH']
        },
        {
            name: 'Cod / Inscrição Empresa',
            layouts: ['KNX'],
            placeholder: 'Ex: 9999/99999999999999'
        },
        {
            name: 'Cód. | Nome ou Raz. Social da Empresa',
            layouts: ['EAF'],
            placeholder: 'Ex: 123|Empresa Exemplo'
        },
        {
            name: 'Cód. | Nome Empresa',
            layouts: ['RXN'],
            placeholder: 'Ex: 123|Empresa Exemplo'
        },
        {
            name: 'Cód. Matriz ou Filial',
            layouts: ['YSY'],
        },
        {
            name: 'Estabelecimento',
            layouts: ['TTQ'],
        },
        {
            name: 'CNPJ',
            layouts: ['RUZ'],
            placeholder: '99.999.999/9999-99'
        },
        {
            name: 'Cód. Empresa | Matriz',
            layouts: ['ANB'],
            placeholder: '999|999'
        },
        {
            name: 'Número Empresa (Filial)',
            layouts: ['ROD', 'VPI'],
            placeholder: '999'
        },
        {
            name: 'Número Empresa',
            layouts: ['NSH'],
            placeholder: '999'
        },
        {
            name: 'Cód. Empresa | Inscrição Empresa',
            layouts: ['WOC'],
            placeholder: '9999999|99999999000199'
        },
        {
            name: 'Código | Código Emit. Dest.',
            layouts: ['XMS'],
            placeholder: '999|999'
        },
        {
            name: 'Acumulador',
            layouts: ['KEO'],
            placeholder: '999'
        },
    ],
    fields: {
        //Deb/Cred/HP
        TpCont1: {
            disabled: [
                'PHX', 'QSO', 'SOL', 'MsI', 'NSJ', 'NS2', 'NS3', 'ANL', 'ANC', 'WFS',
                'WFD', 'MKR', 'PFOX', 'NCM', 'PB1', 'DOM', 'DO2', 'DO3', 'FTS', 'FT2',
                'DFS', 'SCI', 'DF1', 'DO6', 'PHU', 'DOC', 'ALC', 'QFR', 'QFP', 'RXN',
                'DKO', 'IOO', 'PBD', 'WUX', 'VLI', 'FCD', 'PKB', 'JWI', 'ZHW', 'GUG',
                'LAN', 'HJK', 'PNX', 'MBH', 'SFP', 'GFY', 'OXS', 'FMC', 'WDS', 'NMO',
                'EAF', 'PTX', 'MMM', 'PQV', 'QEK', 'AWP', 'CEH', 'FT4', 'UVR', 'WDP',
                'WXL', 'BNW', 'TTQ', 'XNZ', 'YOA', 'LTM', 'MTZ', 'XSP', 'IKN', 'RQS',
                'OZQ', 'OFG', 'WCB', 'RPN', 'NSH', 'KRI', 'YRX', 'LGW', 'VJI', 'VYP',
                'AKR', 'KEO', 'ODU', 'AWS', 'WOC', 'QMI', 'XMS', 'GZJ', 'JDG',
                'AKA'
            ],
            checked: [
                'DO5', 'WKR', 'DF2', 'FPG', 'VSC', 'SCF', 'FHM', 'SCD', 'CMT', 'MEM',
                'CLM', 'JOB', 'ZZQ', 'TKS', 'DF3', 'YLU', 'SCU', 'ABD', 'TRN', 'MSF',
                'PTT', 'ASY', 'UFG', 'CSM', 'BWU', 'KAY', 'HXA', 'UKH', 'HOG', 'FOR',
                'EUP', 'NDF', 'WUH', 'JQB', 'FQF', 'ROD', 'III', 'RIU', 'WRV', 'KOC',
                'YEV', 'BZJ', 'KNX', 'FDY', 'FMA', 'SCS', 'VXM', 'TKK', 'KJT', 'MCQ',
                'WTC', 'NS4', 'PRS', 'YHL', 'LMM', 'KBH', 'UTW', 'GRE', 'ZNS', 'YSY',
                'WXK', 'IJV', 'DOP', 'ZFV', 'OIA', 'RQJ', 'MYN', 'UGB', 'WTR', 'NUH',
                'KFI', 'TMW', 'TSD', 'CNC', 'UYL', 'RGV', 'UHS', 'TRT', 'POP', 'RCA',
                'RZY', 'KHP', 'KWZ', 'ANB', 'WAH', 'GWL', 'YNE', 'VPI', 'DQG', 'YJT',
                'XEJ', 'WCD', 'VTY', 'ZEU', 'HNT', 'RWM', 'TZP', 'VQT', 'SSQ', 'SWR',
                'NLO', 'RFR', 'UWT', 'KRS', 'OVW', 'SKY', 'MDH'
            ]
        },
        //LA
        TpCont2: {
            disabled: [
                'MMQ', 'PHX', 'QSO', 'SOL', 'MsI', 'NSJ', 'NS2', 'NS3', 'ANL', 'ANC',
                'WFS', 'WFD', 'MKR', 'PFOX', 'DOM', 'DO2', 'DO3', 'DO4', 'FTS', 'FT2',
                'DFS', 'DF1', 'DF2', 'WKR', 'FPG', 'VSC', 'PHU', 'SCF', 'FHM', 'SCD',
                'SCC', 'DOC', 'ALC', 'CMT', 'CLM', 'PRS', 'JOB', 'ZZQ', 'TKS', 'DF3',
                'YLU', 'SCU', 'TRN', 'MSF', 'DKO', 'PTT', 'ASY', 'UFG', 'IOO', 'PBD',
                'CSM', 'BWU', 'KAY', 'HXA', 'WUX', 'UKH', 'FCD', 'PKB', 'HOG', 'FOR',
                'EUP', 'NDF', 'WUH', 'JQB', 'FQF', 'JWI', 'ROD', 'WKV', 'ZHW', 'DOP',
                'HJK', 'PNX', 'GUG', 'LAN', 'FMA', 'MBH', 'III', 'SFP', 'GFY', 'PFE',
                'RIU', 'OXS', 'WRV', 'KOC', 'YEV', 'BZJ', 'KNX', 'EAF', 'FDY', 'NTY',
                'SCS', 'PTX', 'WDS', 'MMM', 'TKK', 'VXM', 'PQV', 'QEK', 'DO5', 'KJT',
                'MCQ', 'WTC', 'RXN', 'NS4', 'CEH', 'FT4', 'YHL', 'UVR', 'LMM', 'KBH',
                'WDP', 'UTW', 'GRE', 'ZNS', 'YSY', 'WXK', 'IJV', 'WXL', 'ZFV', 'BNW',
                'OIA', 'RQJ', 'TTQ', 'MYN', 'UGB', 'XNZ', 'WTR', 'YOA', 'NUH', 'KFI',
                'TMW', 'LTM', 'TSD', 'XSP', 'IKN', 'CNC', 'UYL', 'RGV', 'UHS', 'OFG',
                'TRT', 'POP', 'RZY', 'KHP', 'WCB', 'KWZ', 'ANB', 'WAH', 'GWL', 'YNE',
                'VPI', 'RPN', 'NSH', 'KRI', 'YRX', 'RCA', 'DQG', 'VJI', 'YJT', 'VYP',
                'AKR', 'XEJ', 'WCD', 'KEO', 'VTY', 'ZEU', 'AWS', 'HNT', 'RWM', 'TZP',
                'VQT', 'SC2', 'GAT', 'SSQ', 'SWR', 'NLO', 'QMI', 'XMS', 'GZJ', 'UWT',
                'RFR', 'JDG', 'WRM', 'KRS', 'OVW', 'SKY', 'MDH', 'PRK'
            ],
            checked: [
                'NCM', 'PB1', 'SCI', 'MEM', 'QFR', 'QFP', 'VLI', 'FMC', 'AWP', 'NMO',
                'MTZ', 'RQS', 'OZQ', 'LGW', 'ODU', 'WOC', "OBG", 'AKA'
            ]
        },
        //Deb/Cred
        TpCont3: {
            disabled: [
                'NCM', 'PB1', 'DFS', 'SCI', 'WKR', 'DF2', 'FPG', 'VSC', 'DO6', 'SCF',
                'SCD', 'DF3', 'SCU', 'QFR', 'QFP', 'VLI', 'FOR', 'EUP', 'WUH', 'FMC',
                'BZJ', 'KNX', 'SCS', 'MCQ', 'AWP', 'GRE', 'ZNS', 'NMO', 'RQJ', 'NUH',
                'LTM', 'IKN', 'RQS', 'OFG', 'WCB', 'KRI', 'YRX', 'ODU', 'HNT', 'RWM',
                'WOC', 'VQT', 'SWR', 'NLO', 'UWT', 'RFR', 'OVW', 'MDH', 'AKA'
            ],
            checked: [
                'MMQ', 'PHX', 'QSO', 'SOL', 'MsI', 'NSJ', 'NS2', 'NS3', 'ANL', 'ANC',
                'WFS', 'WFD', 'MKR', 'PFOX', 'DOM', 'DO2', 'DO3', 'DO4', 'FTS', 'FT2',
                'DF1', 'PHU', 'ALC', 'DOC', 'PRS', 'DKO', 'IOO', 'PBD', 'WUX', 'FCD',
                'PKB', 'JWI', 'WKV', 'ZHW', 'DOP', 'HJK', 'PNX', 'GUG', 'LAN', 'VXM',
                'MBH', 'III', 'SFP', 'GFY', 'PFE', 'OXS', 'EAF', 'PTX', 'WDS', 'MMM',
                'TKK', 'TRN', 'PQV', 'QEK', 'RXN', 'NS4', 'CEH', 'FT4', 'YHL', 'UVR',
                'LMM', 'KBH', 'ASY', 'WDP', 'UTW', 'YSY', 'WXK', 'WXL', 'ZFV', 'BNW',
                'TTQ', 'XNZ', 'WTR', 'YOA', 'TMW', 'TSD', 'KFI', 'MTZ', 'XSP', 'CNC',
                'UYL', 'RGV', 'UHS', 'TRT', 'POP', 'RZY', 'KHP', 'ANB', 'WAH', 'GWL',
                'YNE', 'RPN', 'NSH', 'LGW', 'RCA', 'VJI', 'YJT', 'VYP', 'AKR', 'XEJ',
                'KEO', 'ZEU', 'AWS', 'GAT', 'QMI', 'XMS', 'GZJ', 'JDG', 'SKY', 'PRK'
            ]
        }
    }
})

/**
 * Retorna uma descrição personalizada ou padrão, de um tipo de relacionamento
 * @param { string } layoutExp Layout de exportação EX: [ ALT ]
 * @param { string } tpRelac Tipo de relacionamento EX: [ LA ]
 * @param { boolean } isLabels Indica se a descrição será um rótulo. É uma descrição mais enxuta que normalmente é usada nas telas
 * de resultados
 * @returns { string } Descrição
 */
EmpresaUtilsSigla.getExceptionByTpRelac = (layoutExp, tpRelac, isLabels = false) => {
    const exceptions = [{
            type: 'LA',
            exceptions: [{
                    name: 'CNPJ',
                    label: 'CNPJ',
                    layouts: ['SCI', 'QFR', 'QFP', 'VLI', 'NMO', 'ODU', 'AKA', 'RQS']
                },
                {
                    name: 'Conta Caixa ou Banco',
                    layouts: ['DO6']
                },
                {
                    name: 'ID Conta',
                    label: 'ID Conta',
                    layouts: ['OZQ'],
                },
                {
                    name: 'Inscrição do Cliente',
                    layouts: ['WOC'],
                },

            ]
        },
        {
            type: 'D/C',
            exceptions: [{
                    name: 'CNPJ / Lançamento Automático',
                    label: 'CNPJ/Lanç Aut',
                    layouts: ['WFS', 'WFD', 'WDS'],
                },
                {
                    name: 'CNPJ / Conta Reduzida',
                    layouts: ['MKR', 'VYP'],
                },
                {
                    name: 'Conta Reduzida / CNPJ',
                    layouts: ['JWI', 'JDG'],
                },
                {
                    name: 'Lançamento Automático / Centro de Custo',
                    layouts: ['PFOX']
                },
                {
                    name: 'Ct Débito | Terc Déb / Ct Crédito | Terc Cré',
                    layouts: ['PRS', 'PTX']
                },
                {
                    name: 'Déb Reduzido|Completo / Cré Reduzido|Completo',
                    layouts: ['MSF']
                },
                {
                    name: 'LA / Conta Cliente ou Fornecedor',
                    layouts: ['HJK']
                },
                {
                    name: 'CNPJ / Código da Tabela Contábil',
                    layouts: ['GUG', 'LAN']
                },
                {
                    name: 'Déb / Cré',
                    layouts: ['FMA']
                },
                {
                    name: 'Ct Débito | SubConta / Ct Crédito | SubConta',
                    layouts: ['BWU']
                },
                {
                    name: 'Ct Débito | Filial / Ct Crédito | Filial',
                    label: 'Déb|Filial/Cré|Filial',
                    layouts: ['MEM', 'VXM'],
                },
                {
                    name: 'Ct Débito | Participante / Ct Crédito | Participante',
                    label: 'Déb|Part/Cré|Part',
                    layouts: ['TKK'],
                },
                {
                    name: 'Ct Débito | CPF/CNPJ / Ct Crédito | CPF/CNPJ',
                    label: 'Déb|CPF/CNPJ/Cré|CPF/CNPJ',
                    layouts: ['WUX'],
                },
                {
                    name: 'Evento / Funcionário',
                    label: 'Evento/Funcionário',
                    layouts: ['WDP', 'GAT'],
                },
                {
                    name: 'Código de Integração / Centro de Custo',
                    label: 'Cód. Integração/C. Custo',
                    layouts: ['TTQ'],
                },
                {
                    name: 'Ct Débito | HP Débito / Ct Crédito | HP Crédito',
                    label: 'Déb|HPDéb/Cré|HPCré',
                    layouts: ['WTR'],
                },
                {
                    name: 'Ct Débito | Resultado Débito / Ct Crédito | Resultado Crédito',
                    label: 'Déb|Result Déb/Cré|Result Cré',
                    layouts: ['KFI'],
                },
                {
                    name: 'ID Conta Débito / ID Conta Crédito',
                    label: 'ID Conta Déb / ID Conta Créd',
                    layouts: ['OZQ'],
                },
                {
                    name: 'CST PIS / CST COFINS',
                    label: 'CST PIS / CST COFINS',
                    layouts: ['RPN'],
                },
                {
                    name: 'CNPJ / Tabela banco',
                    label: 'CNPJ/Tabela banco',
                    layouts: ['NSH'],
                },
                {
                    name: 'CNPJ / Acumulador',
                    label: 'CNPJ/Acumulador',
                    layouts: ['KEO', 'SKY'],
                },
                {
                    name: 'CNPJ / Origem|Cód. Movimento',
                    label: 'CNPJ/Origem|Cód. Mov.',
                    layouts: ['QMI'],
                },
                {
                    name: 'Série Documento / Código Espécie Documento',
                    label: 'Série Doc./Cód. Espécie Doc.',
                    layouts: ['XMS'],
                }

            ]
        },
        {
            type: 'D/C/HP',
            exceptions: [{
                    name: 'HP-Filial/Déb/Cré',
                    layouts: ["DO5"]
                },
                {
                    name: 'C.Custo Déb / C.Custo Cré / Débito / Crédito',
                    layouts: ['FPG']
                },
                {
                    name: 'CNPJ|HP / Débito / Crédito',
                    label: 'CNPJ|HP/Déb/Cré',
                    layouts: ['SCF', 'SCD', 'ZZQ', 'SCC', 'SCS', 'SC2']
                },
                {
                    name: 'HP / Déb Reduz|Completo / Cré Reduz|Completo',
                    layouts: ['MSF']
                },
                {
                    name: 'Contrapartida / Débito / Crédito',
                    label: 'Contrapartida/Déb/Cré',
                    layouts: ['UFG']
                },
                {
                    name: 'CNPJ Filial / Débito / Crédito',
                    label: 'CNPJ/Déb/Cré',
                    layouts: ['III']
                },
                {
                    name: 'HP|Cód. Empresa Fato Gerador / Débito / Crédito',
                    label: 'HP|Fato Gerador/Déb/Cré',
                    layouts: ['EUP']
                },
                {
                    name: 'Estabelecimento Déb|Cré / Déb|Resultado Déb / Cré|Resultado Cré',
                    label: 'Estab Déb|Cré / Déb|Res Déb / Cré|Res Cré',
                    layouts: ['RIU']
                },
                {
                    name: 'HP | Filial / Débito / Crédito',
                    label: 'HP|Filial/Déb/Cré',
                    layouts: ['WRV', 'LMM', 'RQJ', 'UHS', 'KWZ', 'YNE']
                },
                {
                    name: 'HP/ Ct Débito | SubConta / Ct Crédito | SubConta',
                    layouts: ['BWU']
                },
                {
                    name: 'HP / Ct Débito | Filial / Ct Crédito | Filial',
                    label: 'HP/Déb|Filial/Cré|Filial',
                    layouts: ['MEM', 'VXM'],
                },
                {
                    name: 'CNPJ | Filial / Ct Débito / Ct Crédito',
                    label: 'CNPJ|Filial/Déb/Cré',
                    layouts: ['KNX'],
                },
                {
                    name: 'HP | Part / Déb / Cré',
                    layouts: ['FMA']
                },
                {
                    name: 'HP / Ct Débito | Participante / Ct Crédito | Participante',
                    label: 'HP/Déb|Part/Cré|Part',
                    layouts: ['TKK'],
                },
                {
                    name: 'Participante / Ct Débito / Ct Crédito',
                    label: 'Participante/Déb/Cré',
                    layouts: ['NS4'],
                },
                {
                    name: 'HP / Ct Débito | Terc Déb / Ct Crédito | Terc Cré',
                    layouts: ['PRS']
                },
                {
                    name: 'HP Deb | HP Cre / Débito / Crédito',
                    layouts: ['CSM']
                },
                {
                    name: 'CNPJ / Débito / Crédito',
                    layouts: ['GRE', 'ZNS']
                },
                {
                    name: 'Código Matriz ou Filial / Débito / Crédito',
                    label: 'Matriz ou Filial / Débito / Crédito',
                    layouts: ['MYN']
                },
                {
                    name: 'HP / Ct Débito | HP Débito / Ct Crédito | HP Crédito',
                    label: 'HP/Déb|HPDéb/Cré|HPCré',
                    layouts: ['WTR']
                },
                {
                    name: 'HP-Filial | Ct Débito | Resultado Débito / Ct Crédito | Resultado Crédito',
                    label: 'HP-Filial/Déb|Result Déb/Cré|Result Cré',
                    layouts: ['KFI']
                },
                {
                    name: 'HP / Ct Débito | CNPJ Débito / Ct Crédito | CNPJ Crédito',
                    label: 'HP/Déb|CNPJ/Cré|CNPJ',
                    layouts: ['SCU'],
                },
                {
                    name: 'HP|Filial / Ct Débito / Ct Crédito',
                    label: 'HP|Filial/Déb/Cré',
                    layouts: ['KHP'],
                },
                {
                    name: 'HP|Local|Centro de Custo / Débito / Crédito',
                    label: 'HP|Local|C.Custo / Déb / Cré',
                    layouts: ['SWR'],
                },
                {
                    name: 'Sem contabilização',
                    label: 'Sem contabilização',
                    layouts: ['VQT', 'NLO', 'RFR', 'UWT', 'OVW', 'MDH'],
                },
                {
                    name: 'Tipo de Processo / Evento / Funcionário',
                    label: 'Tipo Processo/Evento/Funcionário',
                    layouts: ['GAT'],
                }
            ]
        }
    ]

    const exceptionType = exceptions.find(({
        type
    }) => type === tpRelac)
    const exceptionValue = exceptionType ? .exceptions.find(exception => exception.layouts.includes(layoutExp))
    if (!exceptionType || !exceptionValue)
        return EmpresaUtilsSigla.getDefaultExceptions(tpRelac, isLabels)

    return (isLabels && exceptionValue ? .label) || exceptionValue.name
}

EmpresaUtilsSigla.getDefaultExceptions = (tpRelac, isLabels) => {
    switch (tpRelac) {
        case 'LA':
            return isLabels ? 'Lanç Aut' : 'Lançamento Automático'
        case 'D/C':
            return isLabels ? 'Débito/Crédito' : 'Débito / Crédito'
        case 'D/C/HP':
            return isLabels ? 'HP/Déb/Cré' : 'Hist. Padrão / Débito / Crédito'
        default:
            return 'Conta'
    }
}

/**
 * Monta o array com os fields que serão exibidos para preenchimento dos relacionamentos
 * @param { string } layoutExp Layout de exportação
 * @returns { Array } Array com os campos que serão usados pros relacionamento EX: [ 'CpfCnpj', 'CtDeb', 'CtDeb']
 */
EmpresaUtilsSigla.getFieldsRelacBySigla = (layoutExp) => {
    const fields = ['HP', 'CtDeb', 'CtCre']
    const exceptions = [{
            sigla: ['SCF', 'SCD', 'ZZQ', 'SCC', 'SC2'],
            fields: {
                HP: 'CpfCnpj'
            }
        },
        {
            sigla: ['AWP'],
            fields: {
                HP: 'CPF/CNPJ do Fornecedor'
            }
        },
        {
            sigla: ['PRS'],
            fields: {
                CtDeb: 'Ct Débito | Terc Déb',
                CtCre: 'Ct Crédito | Terc Cré'
            }
        },
        {
            sigla: ['TRN'],
            fields: {
                HP: 'HP',
                CtDeb: 'Conta',
                CtCre: 'CNPJ'
            }
        },
        {
            layouts: ['RPN'],
            fields: {
                HP: 'HP',
                CtDeb: 'CST PIS',
                CtCre: 'CST COFINS'
            }
        }
    ]

    const exception = exceptions.find(({
        sigla
    }) => sigla.includes(layoutExp))
    if (!exception)
        return fields

    Object.entries(exception.fields).forEach(([field, newField]) => {
        const index = fields.indexOf(field)
        fields.splice(index, 1, newField)
    })

    return fields
}

/**
 * Retorna um array com os campos que não devem ser propagados para o relacionamento, ou seja, campos que não devem
 * afetar os outros registros
 * @param { string } layout Layout
 * @returns { Array } Array com as siglas
 */
EmpresaUtilsSigla.getFieldsMustntPropagate = (layout) => {
    return [{
        sigla: ['PaP_28'],
        fields: ['CpfCnpj']
    }].find(({
        sigla
    }) => sigla.includes(layout)) ? .fields || []
}