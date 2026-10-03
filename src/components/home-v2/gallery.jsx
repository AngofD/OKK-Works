import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import AccordionGallery from './AccordionGallery';
import './gallery.css';

const items = JSON.parse(document.getElementById('portfolio-gallery').dataset.items);
function openProject(item, trigger) {
  document.dispatchEvent(new CustomEvent('okk:open-case', { detail: { key: item.id, trigger } }));
}
function Portfolio() {
  const [active, setActive] = useState(2);
  const [mobile, setMobile] = useState(() => matchMedia('(max-width: 620px)').matches);
  useEffect(() => {
    const query = matchMedia('(max-width: 620px)');
    const update = () => setMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const current = items[active];
  return <>
    <div className="gallery-caption"><span>03 проєкти / демо-концепти</span><span>{mobile ? 'Торкніться, щоб розгорнути' : 'Наведіть, щоб розгорнути'} <span aria-hidden="true">↔</span></span></div>
    <AccordionGallery items={items} defaultIndex={2} expandRatio={0.52} trigger="hover"
      height={mobile ? 460 : 550} orientation={mobile ? 'vertical' : 'horizontal'}
      accentColor="#e4d5ef" overlayColor="#080b20" textColor="#f3eef7" radius={22}
      gap={mobile ? 10 : 16} tilt={4} grayscale={false} className="project-gallery"
      onActiveChange={setActive} onItemClick={openProject} />
    <div className="gallery-details">
      <div className="gallery-counter" aria-hidden="true">0{active + 1}<span> / 03</span></div>
      <div className="gallery-description" aria-live="polite" aria-atomic="true"><p className="gallery-category">{current.category}</p><h3>{current.label}</h3><p>{current.description}</p></div>
      <button className="button button-outline gallery-open" type="button" data-case={current.id}>Детальніше <span aria-hidden="true">↗</span></button>
    </div>
  </>;
}
createRoot(document.getElementById('portfolio-gallery')).render(<Portfolio />);
