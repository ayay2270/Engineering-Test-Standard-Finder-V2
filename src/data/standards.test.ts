import { describe, expect, it } from 'vitest';
import { ista3bSequence, matchesStandard, sequenceSummary, standards } from './standards';
describe('verified standard data',()=>{
  it('preserves all 13 ISTA 3B steps and conditional requirement',()=>{expect(ista3bSequence).toHaveLength(13);expect(ista3bSequence[6].certificationRequirement).toBe('Required only for Non-Rigid containers');expect(ista3bSequence.map(x=>x.sequenceNumber)).toEqual(Array.from({length:13},(_,i)=>i+1));});
  it('keeps other sequences empty',()=>expect(standards.slice(1).every(s=>s.testSequence.length===0)).toBe(true));
  it('calculates counts and searches sequence terms',()=>{expect(sequenceSummary(ista3bSequence)).toMatchObject({total:13,required:11,optional:2,shock:6,vibration:1,handling:4});expect(matchesStandard(standards[0],'Fork Lift Handling')).toBe(true);});
  it('classifies research without inventing a sequence for test methods',()=>{
    expect(standards.find(s=>s.id==='ista-3e')?.research?.type).toBe('test-program');
    expect(standards.find(s=>s.id==='astm-d4169')?.research?.type).toBe('distribution-program');
    for(const standard of standards.slice(3)){
      expect(standard.research?.type).toBe('test-method');
      expect(standard.research?.testMethod?.testType).toBeTruthy();
      expect(standard.testSequence).toEqual([]);
      expect(standard.research?.sources.length).toBeGreaterThan(0);
    }
    expect(standards.find(s=>s.id==='astm-d4169')?.research?.distributionCycles).toEqual([]);
  });
  it('makes researched test-method terms searchable',()=>{
    expect(matchesStandard(standards.find(s=>s.id==='iec-60068-2-64')!,'broadband random')).toBe(true);
    expect(matchesStandard(standards.find(s=>s.id==='astm-d5276')!,'free-fall drop')).toBe(true);
  });
});
