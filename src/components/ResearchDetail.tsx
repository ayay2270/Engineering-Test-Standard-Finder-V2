import { BookOpen, FileText, Info } from 'lucide-react';
import type { Standard } from '../data/standards';

const statusLabel = {
  'verified-public': 'Verified public information',
  'partial-public': 'Partial public information',
  'requires-licensed-standard': 'Pending licensed-standard verification'
} as const;

export default function ResearchDetail({ standard }: { standard: Standard }) {
  const research = standard.research;
  if (!research) return null;
  const method = research.testMethod;
  return <>
    <section className="panel summary-panel researched-summary">
      <h3>{method ? 'Test Method Summary' : 'Test Sequence Summary'}</h3>
      <div className="research-summary-grid">
        <div><FileText size={21}/><span><small>Standard type</small><strong>{method ? 'Individual Test Method' : research.type === 'distribution-program' ? 'Distribution test program' : 'Test program / sequence'}</strong></span></div>
        <div><BookOpen size={21}/><span><small>Current revision</small><strong>{research.revision}</strong></span></div>
        <div><Info size={21}/><span><small>Verification</small><strong>{statusLabel[research.verificationStatus]}</strong></span></div>
      </div>
    </section>
    <section className="panel sequence-panel research-panel">
      <h3>{method ? `${standard.code} Test Method` : `${standard.code} Test Sequence`}</h3>
      {method ? <div className="method-fields">
        <div><b>Category</b><span className={`category-tag ${method.category.toLowerCase()}`}>{method.category}</span></div>
        <div><b>Test Type</b><span>{method.testType}</span></div>
        <div><b>Scope / Purpose</b><span>{method.scopePurpose}</span></div>
        <div><b>Test Level / Condition</b><span>{method.testLevelCondition || 'Pending licensed-standard verification — no universal value in the official public description.'}</span></div>
        <div><b>Application / Specimen</b><span>{method.application}</span></div>
        <div><b>Notes</b><span>{method.notes}</span></div>
      </div> : <>
        <div className="research-notice"><Info size={17}/><span>{research.type === 'distribution-program' ? 'No Distribution Cycle has been selected. ASTM D4169 does not have one universal sequence.' : 'The current official sequence is not available in a verified public source.'}</span></div>
        <div className="research-facts"><h4>Publicly verified information</h4><ul>{research.publicFacts.map(fact=><li key={fact}>{fact}</li>)}</ul></div>
      </>}
      <div className="licensed-note"><b>Detailed sequence / conditions:</b> {research.missingDetails}</div>
    </section>
    <section className="panel research-sources">
      <h3>Reference / Source</h3>
      <div className="source-meta">Verified {research.verificationDate} · {statusLabel[research.verificationStatus]}</div>
      {research.sources.map(item=><a key={item.sourceUrl} href={item.sourceUrl} target="_blank" rel="noreferrer">{item.sourceOrganization} — {item.sourceTitle} ↗</a>)}
    </section>
  </>;
}
