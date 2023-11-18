import './ExploreContainer.css';
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { IonButton, IonToast } from '@ionic/react';
import html2canvas from 'html2canvas';



const ExploreContainer = () => {
  const [url, setUrl] = useState('');
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [showToast, setShowToast] = useState(false);
  const qrCodeContainerRef = useRef<HTMLDivElement | null>(null);

  const generateQRCode = () => {
    if (url) {
      setQRCodeValue(url);
    }
  };

  const resetInput = () => {
    setUrl('');
    setQRCodeValue('');
  }; 

  const copyQRCodeToClipboard = () => {
    if (qrCodeValue && qrCodeContainerRef.current) {
      const qrCodeContainer = qrCodeContainerRef.current;
      
      html2canvas(qrCodeContainer).then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const item = new ClipboardItem({ "image/png": blob });
              navigator.clipboard.write([item]).then(() => {
                setShowToast(true);
              });
              
            }
          });
        });
    }
  };

  return (
    <div className='qr-code-container'>
      <div ref={qrCodeContainerRef}>     

        <QRCode value={qrCodeValue} size={228} level={'H'} style={{marginTop: '70px', marginBottom: '30px'}} />
      </div>
      
      <input type='text' placeholder='Enter URL' value={url} onChange={(e) => setUrl(e.target.value)} className='url-input' />
      <IonButton onClick={generateQRCode}>Generate</IonButton>
      <IonButton onClick={copyQRCodeToClipboard}>Copy QR Code</IonButton>
      <IonButton color="medium" onClick={resetInput}>Clear</IonButton>
      <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="QR code copied to clipboard" duration={2000} />
    </div>
  );
};

export default ExploreContainer;