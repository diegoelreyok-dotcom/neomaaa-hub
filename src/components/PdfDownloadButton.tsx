'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Lang } from '@/lib/types';

interface PdfDownloadButtonProps {
  pdfSlug: string;
  lang?: Lang;
}

export default function PdfDownloadButton({ pdfSlug, lang = 'es' }: PdfDownloadButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => setShowModal(false), []);

  // Close modal on Escape key
  useEffect(() => {
    if (!showModal) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showModal, closeModal]);

  function handleDownload(dlLang: 'es' | 'ru') {
    const url =
      dlLang === 'es'
        ? `/pdf/es/${pdfSlug}.pdf`
        : `/pdf/ru/ru-${pdfSlug}.pdf`;

    window.open(url, '_blank');
    closeModal();
  }

  const t = {
    es: {
      bannerText: 'Este documento esta disponible para descarga en PDF',
      bannerBtn: 'Descargar PDF',
      modalTitle: 'Selecciona el idioma',
      modalDesc: 'Elige en que idioma deseas descargar el documento.',
      spanish: 'Espanol',
      russian: 'Ruso',
      cancel: 'Cancelar',
    },
    ru: {
      bannerText: 'Этот документ доступен для скачивания в PDF',
      bannerBtn: 'Скачать PDF',
      modalTitle: 'Выберите язык',
      modalDesc: 'Выберите язык для скачивания документа.',
      spanish: 'Испанский',
      russian: 'Русский',
      cancel: 'Отмена',
    },
  };

  const labels = t[lang];

  return (
    <>
      {/* PDF Banner */}
      <div className="pdf-banner">
        <div className="flex items-center gap-3 pdf-banner-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neo-primary flex-shrink-0">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>{labels.bannerText}</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="pdf-banner-btn"
        >
          {labels.bannerBtn}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={labels.modalTitle}
        >
          <div
            className="
              bg-neo-dark-2 border border-neo-dark-3 rounded-xl
              p-6 w-full max-w-sm mx-4
              shadow-2xl shadow-black/50
              animate-modal-content
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-neo-text mb-1">
              {labels.modalTitle}
            </h3>
            <p className="text-sm text-neo-text-muted mb-5">
              {labels.modalDesc}
            </p>

            <div className="flex flex-col gap-3">
              {/* Spanish button */}
              <button
                onClick={() => handleDownload('es')}
                autoFocus
                className="
                  flex items-center justify-center gap-3
                  w-full py-3 px-4 rounded-lg
                  bg-neo-primary text-white
                  font-semibold text-sm
                  hover:bg-neo-primary-dark
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-neo-primary/50 focus:ring-offset-2 focus:ring-offset-neo-dark-2
                "
              >
                <img
                  src="https://flagcdn.com/w20/es.png"
                  srcSet="https://flagcdn.com/w40/es.png 2x"
                  width="20"
                  height="15"
                  alt="ES"
                  className="rounded-sm"
                />
                {labels.spanish}
              </button>

              {/* Russian button */}
              <button
                onClick={() => handleDownload('ru')}
                className="
                  flex items-center justify-center gap-3
                  w-full py-3 px-4 rounded-lg
                  bg-neo-dark-3 text-neo-text
                  border border-neo-dark-4
                  font-semibold text-sm
                  hover:bg-neo-dark-4 hover:border-neo-dark-5
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-neo-primary/50 focus:ring-offset-2 focus:ring-offset-neo-dark-2
                "
              >
                <img
                  src="https://flagcdn.com/w20/ru.png"
                  srcSet="https://flagcdn.com/w40/ru.png 2x"
                  width="20"
                  height="15"
                  alt="RU"
                  className="rounded-sm"
                />
                {labels.russian}
              </button>
            </div>

            {/* Cancel */}
            <button
              onClick={closeModal}
              className="
                w-full mt-3 py-2.5 text-sm
                text-neo-text-muted hover:text-neo-text-secondary
                transition-colors duration-200
              "
            >
              {labels.cancel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
