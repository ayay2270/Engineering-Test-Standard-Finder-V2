export type Family = 'ISTA' | 'ASTM' | 'IEC' | 'ISO' | 'Internal';
export type Category = 'Conditioning' | 'Shock' | 'Vibration' | 'Handling' | 'Compression';
export type TestSequenceItem = { sequenceNumber: number; testBlock: string; category: Category; testType: string; testLevelCondition: string; certificationRequirement: string; };
export type VerificationStatus = 'verified-public' | 'partial-public' | 'requires-licensed-standard';
export type StandardType = 'test-program' | 'distribution-program' | 'test-method';
export type SourceReference = { sourceOrganization: string; sourceUrl: string; sourceTitle: string };
export type TestMethodInfo = { category: Category; testType: string; scopePurpose: string; testLevelCondition: string | null; application: string; notes: string };
export type ResearchInfo = { type: StandardType; revision: string; verificationDate: string; verificationStatus: VerificationStatus; sources: SourceReference[]; publicFacts: string[]; missingDetails: string; testMethod?: TestMethodInfo; distributionCycles?: { id: string; sequence: TestSequenceItem[] }[] };
export type Standard = { id: string; family: Family; code: string; title: string; description: string; metadata: { shipment?: string; package?: string; revision?: string }; tags: string[]; scenarios: string[]; testSequence: TestSequenceItem[]; keywords: string[]; research?: ResearchInfo };

const row = (sequenceNumber: number, testBlock: string, category: Category, testType: string, testLevelCondition: string, certificationRequirement: string): TestSequenceItem => ({sequenceNumber,testBlock,category,testType,testLevelCondition,certificationRequirement});
export const ista3bSequence: TestSequenceItem[] = [
  row(1,'TEST BLOCK 1','Conditioning','Temperature and Humidity','Ambient','Required'),
  row(2,'TEST BLOCK 1','Conditioning','Controlled Temperature and Humidity','Temperature and Humidity chosen from chart','Optional'),
  row(3,'TEST BLOCK 2','Shock','Tip/Tip Over','Use a 22 degree tip angle','Required'),
  row(4,'TEST BLOCK 5','Shock','Rotational Drop','Rotational edge and corner drops. Height varies with packaged-product weight','Required'),
  row(5,'TEST BLOCK 6','Shock','Incline or Horizontal Impact, optional Free-Fall Drop','48 in/sec (4 ft/sec) (1.2 m/sec) impacts or 3 in. (76 mm) drops','Required'),
  row(6,'TEST BLOCK 9','Vibration','Random With Top Load','Overall Grms level of 0.54','Required'),
  row(7,'TEST BLOCK 10','Shock','Concentrated Impact','Impact mass free-fall drop, guided drop, or pendulum, 15 in (380 mm)','Required only for Non-Rigid containers'),
  row(8,'TEST BLOCK 15','Handling','Fork Lift Handling','Flat Push and Rotate tests','Required'),
  row(9,'TEST BLOCK 15','Handling','Fork Lift Handling','Elevated Push and Pull tests','Required'),
  row(10,'TEST BLOCK 15','Handling','Fork Lift Handling','Elevated Rotate tests','Required'),
  row(11,'TEST BLOCK 15','Handling','Fork Lift Handling','Load Stability Test over a handling course','Required'),
  row(12,'TEST BLOCK 13','Shock','Rotational Drop','Rotational edge and corner drops. Height varies with packaged-product weight','Required'),
  row(13,'TEST BLOCK 14','Shock','Incline or Horizontal Impact, optional Free-Fall Drop','48 in/sec (4 ft/sec) (1.2 m/sec) impacts or 3 in. (76 mm) drops','Required')
];

const checkedOn = '2026-09-25';
const source = (sourceOrganization: string, sourceTitle: string, sourceUrl: string): SourceReference => ({ sourceOrganization, sourceTitle, sourceUrl });

export const standards: Standard[] = [
  {id:'ista-3b',family:'ISTA',code:'ISTA 3B',title:'General Simulated Transportation Test',description:'A general simulation test for packaged-products shipped through a parcel delivery system.',metadata:{shipment:'Single Unit',package:'Packaged-Product',revision:'Current'},tags:['Vibration','Shock','Drop'],scenarios:['Parcel','LTL','General Product'],testSequence:ista3bSequence,keywords:['random vibration','shock','drop','free fall','fork lift','conditioning']},
  {
    id:'ista-3e',family:'ISTA',code:'ISTA 3E',title:'Similar Packaged-Products in Unitized Loads for Truckload Shipment',
    description:'Procedure for similar packaged-products in unitized loads shipped through a Full Truckload (FTL) system.',
    metadata:{shipment:'Full Truckload (FTL)',package:'Unitized loads of similar packaged-products',revision:'26-26_ANS'},
    tags:['Vibration','Shock','Compression'],scenarios:['FTL'],testSequence:[],keywords:['unitized loads','truckload','compression','rotational impact'],
    research:{type:'test-program',revision:'26-26_ANS',verificationDate:checkedOn,verificationStatus:'requires-licensed-standard',
      sources:[
        source('ISTA','Procedure 3E listing','https://ista.org/test_procedures.php'),
        source('ISTA','Procedure 3E (26-26_ANS) store listing','https://mms.ista.org/members/store_product.php?orgcode=ISTA&pid=20943537'),
        source('ISTA','Procedure changes and development','https://ista.org/procedure_changes_developmen.php'),
        source('ISTA','Historical 3E overview (2016; not the current sequence)','https://ista.org/docs/3Eoverview.pdf')
      ],
      publicFacts:['For unitized loads of similar packaged-products in Full Truckload shipment.','ISTA publicly describes compression and rotational / incline / horizontal impacts in the 2026 updates.','A historical ISTA overview also identifies conditioning and random vibration; its seven-step order is not presented as the current procedure.'],
      missingDetails:'The current 26-26_ANS sequence, exact order, test levels, and certification requirements require the licensed procedure. The 2016 public overview predates 2026 technical changes.'}
  },
  {
    id:'astm-d4169',family:'ASTM',code:'ASTM D4169',title:'Standard Practice for Performance Testing of Shipping Containers and Systems',
    description:'A distribution performance test program assembled from anticipated hazards for a selected Distribution Cycle.',
    metadata:{shipment:'Distribution Cycle dependent',package:'Shipping units',revision:'D4169-23e1'},
    tags:[],scenarios:[],testSequence:[],keywords:['shipping container','distribution cycle','test schedule','assurance level','hazard'],
    research:{type:'distribution-program',revision:'D4169-23e1',verificationDate:checkedOn,verificationStatus:'requires-licensed-standard',
      sources:[
        source('ASTM International','ASTM D4169 active standard','https://store.astm.org/standards/d4169'),
        source('ASTM International','ASTM standards case study: D4169 distribution cycles','https://www.astm.org/v3/assets/blt5eb0a2cb04534832/bltffcfe1569da94222/67b2f711c4a32e2ceb970709/Final-125-Case-Study-Compilation.pdf')
      ],
      publicFacts:['A test plan uses a sequence of anticipated hazard elements for the selected Distribution Cycle.','ASTM describes 18 Distribution Cycles and assurance levels I, II, and III.','Tests are performed sequentially on the same shipping unit for performance evaluation.'],
      missingDetails:'Select a Distribution Cycle and consult the licensed ASTM D4169 standard for its test schedules, sequence order, assurance selection, and exact conditions.',
      distributionCycles:[]}
  },
  {
    id:'astm-d4728',family:'ASTM',code:'ASTM D4728',title:'Standard Test Method for Random Vibration Testing of Shipping Containers',
    description:'Random vibration method for evaluating filled shipping units and their contents.',
    metadata:{package:'Filled shipping units',revision:'D4728-17(2022)'},tags:['Vibration'],scenarios:['General Product'],testSequence:[],keywords:['random vibration','shipping container'],
    research:{type:'test-method',revision:'D4728-17(2022)',verificationDate:checkedOn,verificationStatus:'partial-public',
      sources:[source('ASTM International','ASTM D4728 active standard','https://store.astm.org/standards/d4728')],
      publicFacts:['Covers random vibration testing of filled shipping units.','Representative field data should guide the vibration test; the axis, orientation, and level may depend on the distribution environment.'],
      missingDetails:'No universal PSD, Grms, frequency range, duration, or orientation is supplied by the official public description. Consult the licensed method and relevant distribution specification.',
      testMethod:{category:'Vibration',testType:'Random Vibration',scopePurpose:'Assess the ruggedness of a filled shipping unit and the protection its container, packing, and closure provide during random vibration.',testLevelCondition:null,application:'Filled shipping units, including the container, interior packing, closure, and contents.',notes:'Use representative field data where possible; axis and level depend on the environment being simulated.'}}
  },
  {
    id:'astm-d5276',family:'ASTM',code:'ASTM D5276',title:'Standard Test Method for Drop Test of Loaded Containers by Free Fall',
    description:'Free-fall drop method for loaded shipping containers.',
    metadata:{package:'Loaded boxes, cylindrical containers, bags and sacks',revision:'D5276-19(2023)'},tags:['Shock','Drop'],scenarios:['General Product'],testSequence:[],keywords:['free fall','drop','loaded container'],
    research:{type:'test-method',revision:'D5276-19(2023)',verificationDate:checkedOn,verificationStatus:'partial-public',
      sources:[source('ASTM International','ASTM D5276 active standard','https://store.astm.org/standards/d5276')],
      publicFacts:['Covers free-fall drop testing of loaded boxes, cylindrical containers, bags, and sacks.','Used to evaluate container shock resistance and the protection of its contents; particularly suitable for containers handled manually.'],
      missingDetails:'Drop height, orientations, impact count, and acceptance criteria are not supplied by the official public description. Consult the licensed method and application specification.',
      testMethod:{category:'Shock',testType:'Free-Fall Drop',scopePurpose:'Evaluate sudden shock from a free-fall impact and the protection a loaded container provides its contents.',testLevelCondition:null,application:'Loaded boxes, cylindrical containers, bags, and sacks, especially those handled manually.',notes:'The official public description does not provide a universal drop height or impact count.'}}
  },
  {
    id:'iec-60068-2-27',family:'IEC',code:'IEC 60068-2-27',title:'Environmental testing — Part 2-27: Tests — Test Ea and guidance: Shock',
    description:'Mechanical shock test method for specified non-repetitive or repetitive shocks.',
    metadata:{package:'Primarily unpackaged specimens',revision:'IEC 60068-2-27:2008'},tags:['Shock'],scenarios:['General Product'],testSequence:[],keywords:['mechanical shock','shock pulse','Test Ea'],
    research:{type:'test-method',revision:'IEC 60068-2-27:2008',verificationDate:checkedOn,verificationStatus:'partial-public',
      sources:[source('IEC','IEC 60068-2-27:2008 Webstore listing','https://webstore.iec.ch/en/publication/514')],
      publicFacts:['Test Ea assesses ability to withstand specified severities of non-repetitive or repetitive shocks.','Primarily intended for unpackaged specimens, or an item in a transport case considered part of the specimen.'],
      missingDetails:'Pulse shape, shock severity, duration, number of shocks, and mounting details must be selected from the relevant specification and licensed method.',
      testMethod:{category:'Shock',testType:'Mechanical Shock',scopePurpose:'Reveal mechanical weakness, performance degradation, or accumulated damage from specified shocks.',testLevelCondition:null,application:'Primarily unpackaged specimens; a transport case may form part of the specimen. Packaged-product use may involve IEC 60068-2-47.',notes:'The official overview describes prescribed pulse shapes and application-specific severity rather than one universal shock level.'}}
  },
  {
    id:'iec-60068-2-64',family:'IEC',code:'IEC 60068-2-64',title:'Environmental testing — Part 2-64: Tests — Test Fh: Vibration, broadband random and guidance',
    description:'Broadband random vibration method for transport or operating environments.',
    metadata:{package:'Primarily unpackaged specimens',revision:'IEC 60068-2-64:2008+A1:2019'},tags:['Vibration'],scenarios:['General Product'],testSequence:[],keywords:['broadband random vibration','Test Fh','stochastic'],
    research:{type:'test-method',revision:'IEC 60068-2-64:2008+A1:2019',verificationDate:checkedOn,verificationStatus:'partial-public',
      sources:[source('IEC','IEC 60068-2-64:2008+AMD1:2019 consolidated version','https://webstore.iec.ch/en/publication/65892')],
      publicFacts:['Test Fh is a broadband random vibration method for specimens exposed to stochastic transport or operational vibration.','The consolidated edition combines the 2008 second edition with Amendment 1 (2019).'],
      missingDetails:'The official public overview does not supply one universal PSD, Grms, frequency range, duration, or orientation. Use the relevant specification and licensed method.',
      testMethod:{category:'Vibration',testType:'Broadband Random Vibration',scopePurpose:'Assess resistance to dynamic random vibration loads and identify mechanical weakness or performance degradation.',testLevelCondition:null,application:'Primarily unpackaged specimens, or an item in a transport container considered part of the specimen; packaged-product use may involve IEC 60068-2-47.',notes:'Test requirements are specified for the application; pure random vibration may not be sufficient for combined random and deterministic environments.'}}
  },
  {
    id:'iso-2248',family:'ISO',code:'ISO 2248',title:'Packaging — Complete, filled transport packages — Vertical impact test by dropping',
    description:'Vertical impact method in which a complete, filled transport package is released onto a rigid impact surface.',
    metadata:{package:'Complete, filled transport packages',revision:'ISO 2248:1985 (confirmed 2022)'},tags:['Shock','Drop'],scenarios:['General Product'],testSequence:[],keywords:['vertical impact','drop','free fall','filled transport package'],
    research:{type:'test-method',revision:'ISO 2248:1985',verificationDate:checkedOn,verificationStatus:'partial-public',
      sources:[source('ISO','ISO 2248:1985 current standard','https://www.iso.org/standard/7062.html')],
      publicFacts:['The 1985 edition was reviewed and confirmed in 2022 and remains current.','The method drops a complete, filled transport package onto a rigid impact surface.'],
      missingDetails:'The public abstract does not provide universal drop height, orientation, conditioning values, or impact count; these must be predetermined for the application and checked against the licensed standard.',
      testMethod:{category:'Shock',testType:'Vertical Impact by Dropping',scopePurpose:'Assess the effect of a vertical impact on a complete, filled transport package.',testLevelCondition:'Atmospheric conditions, drop height, and package attitude are predetermined for the test; no universal values are given in the public abstract.',application:'Complete, filled transport packages.',notes:'The package is raised and released to strike a rigid impact surface after free fall.'}}
  }
];
export const standardById = (id: string) => standards.find(s => s.id === id);
export const sequenceSummary = (items: TestSequenceItem[]) => ({ total:items.length, required:items.filter(x=>x.certificationRequirement === 'Required').length, optional:items.filter(x=>x.certificationRequirement !== 'Required').length, shock:items.filter(x=>x.category==='Shock').length, vibration:items.filter(x=>x.category==='Vibration').length, handling:items.filter(x=>x.category==='Handling').length });
export const matchesStandard = (s: Standard, query: string) => { const q=query.trim().toLowerCase(); return !q || [s.code,s.title,s.family,s.description,...s.tags,...s.scenarios,...s.keywords,...s.testSequence.flatMap(x=>[x.category,x.testType,x.testLevelCondition]),...(s.research?.publicFacts||[]),...(s.research?.testMethod?[s.research.testMethod.category,s.research.testMethod.testType,s.research.testMethod.scopePurpose]:[])].join(' ').toLowerCase().includes(q); };
