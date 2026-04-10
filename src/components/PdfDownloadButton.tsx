'use client';

import { useState } from 'react';

interface PdfDownloadButtonProps {
  pdfSlug: string;
}

export default function PdfDownloadButton({ pdfSlug }: PdfDownloadButtonProps) {
  const [showModal, setShowModal] = useState(false);

  function handleDownload(lang: 'es' | 'ru') {
    const url =
      lang === 'es'
        ? `/pdf/es/${pdfSlug}.pdf`
        : `/pdf/ru/ru-${pdfSlug}.pdf`;

    window.open(url, '_blank');
    setShowModal(false);
  }

  return (
    <>
      {/* PDF Banner */}
      <div className="pdf-banner">
        <span className="pdf-banner-text">
          Este documento esta disponible para descarga en PDF
        </span>
        <button
          onClick={() => setShowModal(true)}
          className="pdf-banner-btn"
        >
          Descargar PDF
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="
              bg-neo-dark-2 border border-neo-dark-3 rounded-xl
              p-6 w-full max-w-sm mx-4
              shadow-2xl shadow-black/50
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-neo-text mb-1">
              Selecciona el idioma
            </h3>
            <p className="text-sm text-neo-text-muted mb-5">
              Elige en que idioma deseas descargar el documento.
            </p>

            <div className="flex flex-col gap-3">
              {/* Spanish button */}
              <button
                onClick={() => handleDownload('es')}
                className="
                  flex items-center justify-center gap-3
                  w-full py-3 px-4 rounded-lg
                  bg-neo-primary text-neo-dark
                  font-semibold text-sm
                  hover:bg-neo-primary-dark
                  transition-colors duration-200
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
                Espanol
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
                Ruso
              </button>
            </div>

            {/* Cancel */}
            <button
              onClick={() => setShowModal(false)}
              className="
                w-full mt-3 py-2.5 text-sm
                text-neo-text-muted hover:text-neo-text-secondary
                transition-colors duration-200
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
