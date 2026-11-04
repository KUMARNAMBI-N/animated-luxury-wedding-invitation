import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { WeddingConfig } from '@/types/wedding';
import { hafizAishaConfig } from '@/config/hafizAisha';
import { anzarFathimaConfig } from '@/config/anzarFathima';

interface WeddingContextType {
  config: WeddingConfig;
  activeCoupleId: string;
  setCouple: (id: 'hafiz-aisha' | 'anzar-fathima') => void;
  availableCouples: Array<{ id: 'hafiz-aisha' | 'anzar-fathima'; name: string; brand: string }>;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial couple from URL params (?couple=hafiz-aisha or ?couple=anzar-fathima)
  // Default to the new couple: 'hafiz-aisha'
  const [activeCoupleId, setActiveCoupleId] = useState<'hafiz-aisha' | 'anzar-fathima'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const coupleParam = params.get('couple');
      if (coupleParam === 'anzar-fathima') return 'anzar-fathima';
      if (coupleParam === 'hafiz-aisha') return 'hafiz-aisha';

      // Check pathname (e.g. /anzar-fathima)
      const path = window.location.pathname.toLowerCase();
      if (path.includes('anzar')) return 'anzar-fathima';
    }
    return 'hafiz-aisha';
  });

  const config = useMemo(() => {
    return activeCoupleId === 'anzar-fathima' ? anzarFathimaConfig : hafizAishaConfig;
  }, [activeCoupleId]);

  // Sync document title and meta description
  useEffect(() => {
    document.title = config.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.metaDescription);
    }
  }, [config]);

  const setCouple = (id: 'hafiz-aisha' | 'anzar-fathima') => {
    setActiveCoupleId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('couple', id);
      window.history.pushState({}, '', url.toString());
    }
  };

  const availableCouples = [
    { id: 'hafiz-aisha' as const, name: 'A & A', brand: 'Beyond Cards' },
    { id: 'anzar-fathima' as const, name: 'Anzar & Fathima', brand: 'Beyond Cards' },
  ];

  return (
    <WeddingContext.Provider value={{ config, activeCoupleId, setCouple, availableCouples }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = (): WeddingContextType => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};

export default WeddingContext;

